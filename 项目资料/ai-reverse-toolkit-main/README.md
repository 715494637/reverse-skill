# ai-reverse-toolkit

AI-assisted skills, rules and prompts for reverse engineering.

Covers **Web/JS**, **Android/iOS App**, and more.

Works with Claude, GPT, Gemini and other LLMs.

## Structure

```
ai-reverse-toolkit/
├── skills/          # Task-oriented skills (find entry, algorithm restore, etc.)
├── rules/           # Background knowledge (obfuscation, tools, protocols, etc.)
└── prompts/         # Common prompt templates
```

## Usage

### For Claude Code

Copy to your project:

```bash
cp -r skills/* .claude/skills/
cp -r rules/* .claude/rules/
```

### For Other LLMs

Use the markdown files directly as system prompts or context.

## Skills

| Skill | Category | Description |
|-------|----------|-------------|
| `find-crypto-entry` | Web/JS | Locate encryption parameter generation entry point |

## Rules

| Rule | Category | Description |
|------|----------|-------------|
| `js-reverse.md` | Web/JS | JS reverse engineering guide and tool reference |

## Roadmap

- [ ] App reverse engineering skills (Frida, IDA, Ghidra)
- [ ] Protocol analysis rules
- [ ] More prompt templates

## Dependencies

- [js-reverse MCP](https://github.com/anthropics/anthropic-cookbook) - Browser debugging MCP tool (for Claude Code)

## License

MIT
