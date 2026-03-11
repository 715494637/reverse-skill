# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-assisted skills, rules, and prompts for reverse engineering (Web/JS, Android/iOS App). This is a **prompt/knowledge repository**, not a runnable application — there are no build steps, tests, or dependencies to install.

## Repository Structure

- `skills/` — Task-oriented Claude Code skills (SKILL.md files with frontmatter). Each skill is a self-contained workflow for a specific reverse engineering task.
- `rules/` — Background knowledge documents providing reference guides, tool usage patterns, and domain expertise for reverse engineering.
- `prompts/` — Common prompt templates (planned, not yet populated).

## Key MCP Dependency

This toolkit is designed to work with the **js-reverse MCP server** for browser debugging. The MCP provides Chrome DevTools Protocol access: network inspection, breakpoints, script source retrieval, function hooking, and JS evaluation.

## Conventions

- Skills use `$ARGUMENTS` as placeholder for user-provided parameters
- Analysis progress is tracked in `PROGRESS.md` (created per-project, not in this repo)
- Deobfuscation scripts go in `scripts/deobfuscate_{target}.js`
- Deobfuscated output goes in `source/deobfuscated/{filename}_deobf.js`
- Python algorithm implementations go in `output/sign.py`
- Content is written in Chinese (Simplified)
- Use `uv` to run Python and manage Python projects

## Writing New Skills

Skills are defined as `SKILL.md` files with YAML frontmatter (`name`, `description`, `argument-hint`). Follow the pattern in `skills/find-crypto-entry/SKILL.md`: define clear step-by-step workflows with decision points and fallback paths between steps.

## Writing New Rules

Rules are standalone markdown files in `rules/`. They should provide structured reference material (identification tables, tool command references, common patterns) rather than step-by-step workflows.
