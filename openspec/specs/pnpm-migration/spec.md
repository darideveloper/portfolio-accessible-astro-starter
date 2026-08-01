# pnpm-migration Specification

## Purpose
TBD - created by archiving change pnpm-docker-portless-workflow. Update Purpose after archive.
## Requirements
### Requirement: pnpm as default package manager
The project SHALL use pnpm as its default package manager. npm SHALL NOT be used for dependency management.

#### Scenario: Install dependencies with pnpm
- **WHEN** a developer runs `pnpm install`
- **THEN** dependencies are installed and `pnpm-lock.yaml` is created/updated

#### Scenario: npm install is rejected
- **WHEN** a developer runs `npm install`
- **THEN** Corepack SHALL reject the command with an error message

### Requirement: Corepack enforcement
The `package.json` SHALL contain a `packageManager` field specifying `pnpm@10.18.3` to enable Corepack auto-detection.

#### Scenario: Corepack selects correct pnpm version
- **WHEN** Corepack is enabled and `pnpm` is invoked
- **THEN** it SHALL use pnpm version 10.18.3

### Requirement: pnpm configuration
The `.npmrc` SHALL contain `shamefully-hoist = true` to ensure Astro and its plugins can resolve dependencies from the root `node_modules`.

#### Scenario: Dependencies are hoisted
- **WHEN** `pnpm install` completes
- **THEN** packages required by Astro SHALL be resolvable from the root `node_modules`

### Requirement: Lockfile management
`pnpm-lock.yaml` SHALL be committed to version control. `package-lock.json` SHALL be deleted and not regenerated.

#### Scenario: Lockfile is tracked
- **WHEN** `git status` is run after `pnpm install`
- **THEN** `pnpm-lock.yaml` SHALL appear as a tracked file

#### Scenario: npm lockfile is absent
- **WHEN** `pnpm install` runs
- **THEN** `package-lock.json` SHALL NOT be created

### Requirement: Documentation reflects pnpm
All project documentation (README.md, AGENTS.md) SHALL use `pnpm` commands instead of `npm` commands.

#### Scenario: README shows pnpm commands
- **WHEN** a developer reads README.md
- **THEN** all command examples SHALL use `pnpm` (e.g., `pnpm install`, `pnpm dev`, `pnpm build`)

#### Scenario: AGENTS.md uses pnpm
- **WHEN** a developer reads AGENTS.md
- **THEN** setup, linking, troubleshooting, and PR instructions SHALL use `pnpm` commands

### Requirement: npx replaced with pnpm equivalents
All `npx` commands in documentation SHALL be replaced with `pnpm` equivalents (e.g., `npx prettier --write .` → `pnpm prettier --write .`).

#### Scenario: Format command uses pnpm
- **WHEN** a developer follows formatting instructions
- **THEN** the command SHALL be `pnpm prettier --write .`
