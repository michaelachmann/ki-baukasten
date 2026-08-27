- # AGENTS.md

  ## Project context

  This repository contains a web application for communicating rules on the use
  of generative AI in university courses.

  The application accompanies the AI guidelines of the Chair of Media Informatics
  and is intended to make course-specific rules easier to communicate, explore,
  and reuse.

  The underlying guidelines distinguish multiple application areas and four
  permission levels. Treat these distinctions as domain logic rather than merely
  presentation text. Do not change the meaning of the guidelines unless
  explicitly asked to make a content change.

  See the root `README.md` for further project documentation.

  ## Architecture and deployment

  The application is a client-side web application deployed through GitHub Pages.

  A build step, package manager, development dependencies, and JavaScript
  frameworks are allowed when they improve maintainability or support recurring
  application needs.

  The production output must remain a fully static site that requires no backend
  or server-side runtime.

  - GitHub Pages is the deployment target.
  - Production assets should be generated through the configured build process.
  - Deployment should happen automatically through GitHub Actions after changes
    are pushed or merged into the deployment branch.
  - Do not introduce backend services, server-side rendering, databases, or other
    runtime infrastructure unless explicitly requested.
  - Prefer well-established dependencies that solve recurring needs over
    dependencies introduced for a single minor feature.

  Follow the existing architecture and tooling unless a task explicitly calls for
  a migration or architectural change.

  ## Working in this codebase

  - Prefer small, targeted edits over broad refactors.
  - Preserve existing behavior outside the requested change.
  - Do not perform unrelated cleanup while implementing a feature or fix.
  - Preserve all supported visual/design variants.
  - When changing shared data or content, check whether it also affects exports
    or other generated representations.
  - Treat files under `vendor/`, if present, as third-party code and do not modify
    them unless explicitly required.
  - Update documentation when a change materially alters application behavior,
    architecture, setup, or deployment.

  Before changing shared logic, trace where the affected state, data, or content
  is consumed.

  ## Git workflow

  After implementing and verifying a coherent feature or fix, create a focused
  Git commit before starting unrelated work.

  - Commit only after the change has been verified.
  - Keep commits scoped to one coherent feature, fix, or refactor.
  - Do not include unrelated cleanup in the same commit.
  - Use concise commit messages that describe the implemented change.
  - Do not rewrite existing Git history unless explicitly requested.

  ## Verification and testing

  User-facing changes must be verified by running the application.

  At minimum:

  1. Exercise the changed interaction in a browser.
  2. Check the browser console for errors.
  3. Verify nearby functionality that depends on the same state, data, or markup.
  4. Check all relevant design variants when changing shared markup or styling.
  5. Verify exports when modifying data or logic used by them.
  6. Run the configured linting and automated tests before committing.

  Use automated tests where they provide clear value.

  Prefer:

  - linting for JavaScript and other maintained source files;
  - a small set of browser-level smoke tests for important application workflows;
  - regression tests for bugs that are likely to recur.

  Do not pursue test coverage as a goal in itself. Test important behavior rather
  than implementation details.

  A UI change is not considered verified solely because the code appears correct.

  ## Scope discipline

  Do not introduce major architectural changes as incidental parts of unrelated
  tasks.

  In particular, do not:

  - migrate to a different framework without a clear reason;
  - replace working dependencies merely for stylistic preference;
  - reorganize the entire project while implementing a small feature;
  - introduce backend infrastructure for functionality that can remain
    client-side;
  - change policy wording while implementing presentation or technical changes.

  Larger refactors are appropriate when explicitly requested or when they are
  necessary to implement the requested behavior safely.

  # RTK (Rust Token Killer)

  When running shell commands, prefix commands with `rtk` whenever practical to
  reduce command-output context.

  Examples:

  ```bash
  rtk git status
  rtk git diff
  rtk git log

  rtk ls <path>
  rtk read <file>
  rtk grep <pattern>
  rtk find <pattern>

  rtk pytest tests/
  rtk test <cmd>

  rtk lint
  rtk prettier --check
  rtk ruff check

  rtk gh pr view <n>
  rtk gh run list
  rtk gh issue list

  rtk npm run <script>
  rtk pnpm install
  ```

  For command chains, prefix each command separately:

  ```bash
  rtk git add . && rtk git commit -m "message"
  ```

  When debugging requires complete unfiltered output, use the raw command or:

  ```bash
  rtk proxy <cmd>
  ```
