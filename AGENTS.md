# AGENTS.md

## ⚠️ Vibe-coded project

This prototype was built largely through "vibe coding" — iterative, conversational
prompting with an AI coding assistant, with a strong focus on getting a working
result quickly rather than on architectural rigor. Expect:

- Inconsistent structure and naming in places
- Logic and state handling concentrated in `app.js`
- Limited or no automated tests
- Comments and abstractions that reflect prompt-driven iteration, not a
  from-scratch design

None of that is accidental neglect — it's the tradeoff of this workflow. Treat
the code as a working prototype, not a hardened reference implementation.

## What this is

A build-free, static HTML/JS prototype for communicating rules on the use of
generative AI in university courses (see the root `README.md` for details).
There is no build step, package manager, or bundler — open `index.html`
directly, or serve the folder with any static file server.

## Working in this codebase

- Keep it build-free. Don't introduce a bundler, framework, or package.json
  unless explicitly asked to.
- `app.js` holds the application logic and `styles.css` holds the styling for
  both the neutral and CD/Lehrstuhl designs. `index.html` is the entry point.
- `vendor/pptxgen.bundle.js` is the checked-in dependency used for PPTX export.
- Prefer small, targeted edits over refactors unless a refactor is explicitly
  requested. Given the vibe-coded nature of the project, large sweeping
  changes are more likely to introduce regressions than to fix them.
- Verify changes by actually opening the app in a browser (or via the `run`
  workflow, if available) rather than relying on read-through alone — there
  is no test suite to catch regressions.


<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->
