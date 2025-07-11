# CI/CD Workflow Documentation

## Overview
This repository uses an enhanced CI/CD workflow that automatically validates, fixes critical errors, and merges changes from `test-main` to `main`.

## Workflow Features

### 1. TypeScript Validation
- Runs `tsc --noEmit` to check for type errors
- Fails the build on any TypeScript compilation errors

### 2. ESLint Critical Errors Only
- Runs ESLint with `--quiet` flag (errors only, no warnings)
- Auto-fixes critical errors where possible
- Console statements are preserved for development
- Uses `--max-warnings 999` to ignore warnings

### 3. Dependency Version Check
- Checks for inexact versions (^, ~, *)
- Creates a report in GitHub Actions summary
- **Does NOT auto-fix** - only logs warnings
- Helps maintain version stability

### 4. Auto-merge
- Automatically merges `test-main` to `main` when all checks pass
- Requires GitHub Actions write permissions (already configured)

### 5. Git Hooks for Local Sync
- **post-merge**: Notifies when GitHub Actions fixes are merged
- **post-checkout**: Alerts when remote has new changes
- **post-commit**: Reminds to push to test-main for CI/CD

## Usage

### Basic Workflow
1. Make changes locally
2. Commit to `test-main` branch
3. Push to GitHub: `git push origin test-main`
4. CI/CD runs automatically
5. If all checks pass, changes auto-merge to `main`
6. Pull latest changes: `git pull origin test-main`

### Setup Git Hooks
Git hooks are automatically installed via npm postinstall:
```bash
npm install
```

Or manually:
```bash
npm run setup:hooks
```

### Performance
- 3-minute timeout for fast feedback
- Typical run time: ~30 seconds
- ESLint runs only on critical errors for speed

## Configuration Files

### `.github/workflows/validate-and-merge.yml`
Main workflow file with two jobs:
- `validate-and-fix`: Runs all checks and auto-fixes
- `auto-merge`: Merges test-main to main on success

### `scripts/setup-git-hooks.sh`
Installs local Git hooks for automatic sync notifications

## Troubleshooting

### ESLint Errors
- Check for `@typescript-eslint/ban-types` violations
- Look for unsafe type usage (e.g., `Function` type)
- Run locally: `npx eslint . --quiet`

### Dependency Warnings
- Review inexact versions in `package.json`
- Consider pinning to exact versions for production
- Warnings don't fail the build

### Auto-merge Issues
- Ensure GitHub Actions has write permissions
- Check for merge conflicts between branches
- Review workflow logs in GitHub Actions tab