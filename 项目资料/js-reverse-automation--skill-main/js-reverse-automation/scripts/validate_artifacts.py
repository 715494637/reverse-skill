#!/usr/bin/env python3
"""Validate analysis_result.json and generated artifacts."""

from __future__ import annotations

import argparse
import ast
import json
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--analysis", required=True, help="Path to analysis_result.json.")
    parser.add_argument("--jsrpc", required=True, help="Path to generated JSRPC file.")
    parser.add_argument("--flask", required=True, help="Path to generated Flask file.")
    parser.add_argument("--burp", required=True, help="Path to generated Burp markdown.")
    parser.add_argument("--output", required=True, help="Path to validation report JSON.")
    return parser.parse_args()


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise ValueError(f"{path} must contain a JSON object")
    return data


def record(
    checks: list[dict],
    failures: list[dict],
    name: str,
    ok: bool,
    success_detail: str,
    failure_detail: str,
) -> None:
    detail = success_detail if ok else failure_detail
    checks.append({"check": name, "ok": ok, "detail": detail})
    if not ok:
        failures.append({"check": name, "detail": failure_detail})


def main() -> int:
    args = parse_args()
    analysis_path = Path(args.analysis)
    jsrpc_path = Path(args.jsrpc)
    flask_path = Path(args.flask)
    burp_path = Path(args.burp)
    report_path = Path(args.output)

    analysis = load_json(analysis_path)
    jsrpc_content = jsrpc_path.read_text(encoding="utf-8")
    flask_content = flask_path.read_text(encoding="utf-8")
    burp_content = burp_path.read_text(encoding="utf-8")

    checks: list[dict] = []
    failures: list[dict] = []
    warnings = list(analysis.get("diagnostics", {}).get("warnings", []))

    required_keys = [
        "skill",
        "input",
        "trace",
        "parameters",
        "jsrpc",
        "flask",
        "burp",
        "diagnostics",
        "validation_targets",
    ]
    for key in required_keys:
        record(
            checks,
            failures,
            f"analysis:{key}",
            key in analysis,
            f"top-level key present: {key}",
            f"missing top-level key: {key}",
        )

    requested_parameters = analysis.get("input", {}).get("parameters", [])
    parameters = analysis.get("parameters", {})
    for parameter in requested_parameters:
        record(
            checks,
            failures,
            f"analysis:parameter:{parameter}",
            parameter in parameters,
            f"parameter contract present: {parameter}",
            f"missing parameter contract for {parameter}",
        )
        if parameter in parameters:
            parameter_contract = parameters[parameter]
            record(
                checks,
                failures,
                f"analysis:parameter:{parameter}:entrypoint",
                isinstance(parameter_contract.get("entrypoint"), dict),
                f"entrypoint contract present for {parameter}",
                f"missing entrypoint contract for {parameter}",
            )
            record(
                checks,
                failures,
                f"analysis:parameter:{parameter}:call-signature",
                isinstance(parameter_contract.get("call_signature"), dict),
                f"call signature present for {parameter}",
                f"missing call signature for {parameter}",
            )
            record(
                checks,
                failures,
                f"analysis:parameter:{parameter}:runtime",
                isinstance(parameter_contract.get("runtime"), dict),
                f"runtime contract present for {parameter}",
                f"missing runtime contract for {parameter}",
            )

    diagnostics_status = analysis.get("diagnostics", {}).get("status")
    record(
        checks,
        failures,
        "analysis:diagnostics-status",
        diagnostics_status in {"ready", "partial", "failed"},
        f"diagnostics status is valid: {diagnostics_status}",
        "diagnostics.status must be one of ready, partial, failed",
    )

    action_name = analysis.get("jsrpc", {}).get("action_name", "")
    record(
        checks,
        failures,
        "jsrpc:action-name",
        bool(action_name and action_name in jsrpc_content),
        f"configured action name found: {action_name}",
        "generated JSRPC file does not contain the configured action name",
    )
    record(
        checks,
        failures,
        "jsrpc:resolver",
        "resolveEntrypoint" in jsrpc_content,
        "entrypoint resolution logic present",
        "generated JSRPC file is missing entrypoint resolution logic",
    )
    record(
        checks,
        failures,
        "jsrpc:raw-success",
        "resolve(result);" in jsrpc_content and "resolve(asyncResult);" in jsrpc_content,
        "raw success return handling present",
        "generated JSRPC file does not directly resolve raw results",
    )
    record(
        checks,
        failures,
        "jsrpc:string-error",
        "__JSRPC_ERROR__:" in jsrpc_content,
        "string error sentinel present",
        "generated JSRPC file is missing the string error sentinel",
    )

    try:
        ast.parse(flask_content)
        flask_parse_ok = True
        flask_parse_detail = "python syntax ok"
    except SyntaxError as exc:
        flask_parse_ok = False
        flask_parse_detail = f"python syntax error: {exc}"
    record(
        checks,
        failures,
        "flask:syntax",
        flask_parse_ok,
        flask_parse_detail,
        flask_parse_detail,
    )
    record(
        checks,
        failures,
        "flask:healthz",
        "@app.get(\"/healthz\")" in flask_content,
        "generated Flask file contains /healthz",
        "generated Flask file is missing /healthz",
    )
    record(
        checks,
        failures,
        "flask:encode-route",
        analysis.get("flask", {}).get("route", "") in flask_content,
        "generated Flask file contains the configured encode route",
        "generated Flask file is missing the configured encode route",
    )

    for required_text in ("dataBody", "dataHeaders", "Validation Steps", "Troubleshooting"):
        record(
            checks,
            failures,
            f"burp:{required_text}",
            required_text in burp_content,
            f"generated Burp document contains: {required_text}",
            f"generated Burp document is missing section or token: {required_text}",
        )

    status = "passed" if not failures else "failed"
    report = {
        "status": status,
        "checks": checks,
        "warnings": warnings,
        "failures": failures,
        "next_actions": [
            failure["detail"] for failure in failures
        ],
    }

    report_path.parent.mkdir(parents=True, exist_ok=True)
    with report_path.open("w", encoding="utf-8") as handle:
        json.dump(report, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    print(json.dumps({"status": status, "output": str(report_path)}, ensure_ascii=False))
    return 0 if not failures else 1


if __name__ == "__main__":
    raise SystemExit(main())
