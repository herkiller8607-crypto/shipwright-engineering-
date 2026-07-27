# Shipwright Engineering — Team Workflow

## Branching
- All work happens on **feature branches** named like `feature/short-description` or `fix/short-description`
- Branch names use lowercase, hyphen-separated words (e.g., `feature/add-contact-form`, `fix/mobile-header-overlap`)

## Pull Requests
- PRs are opened against the default branch (`main`)
- The **Technical Lead** reviews and merges PRs using `gh pr merge` with **squash**
- Always include a clear PR description summarizing what changed and why

## Clean Working Tree
- Members must finish each delegation by checking out `main` and cleaning the working tree
- No stray files, uncommitted changes, or lingering feature branches in the shared workspace

## Continuous Integration
- CI runs on every PR and every push to `main`
- CI steps: lint (prettier --check), type check (tsc --noEmit), build (bun run build)
- All CI steps must pass before a PR is eligible for merge

## Commit Messages
- Use concise, descriptive commit messages in present tense (e.g., "Add contact form route", "Fix header overflow on mobile")
- Squash-merged PRs should have a single clean message summarizing the change
