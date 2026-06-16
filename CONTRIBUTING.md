# Contributing to RiskAtlas

RiskAtlas is built in the open. This document describes how to propose changes and what every contribution must include. Before contributing, please read [PROJECT_CHARTER.md](PROJECT_CHARTER.md): the no-composite-scoring rule is binding on all contributions.

## What you can propose

- Corrections to an existing rating, label, link, or timestamp.
- Addition of a new protocol within the project's stated scope.
- Addition of a new independent risk feed provider.
- Source-link fixes (broken, redirected, or moved sources).
- Provenance fixes (mislabeled automatic versus manual entries, missing curator, missing timestamp).
- Coverage-label updates (covered, partial, not yet covered) when reality changes.

## Workflow

1. Open a GitHub issue describing the change, or open a pull request directly if the change is small and self-contained.
2. One logical change per pull request. Do not bundle a protocol addition with a feed addition with a correction.
3. Every data change must include:
   - A source link (the public URL the data is taken from, or the manual-entry rationale).
   - A provenance tag: `auto` for changes derived from a machine-readable feed, `manual` for changes entered by a curator.
4. For manual entries, name the curator in the pull request description.

## Hard constraint

Contributions must not introduce any composite score, ranking, grade, ordering by perceived risk, weighted aggregate, or editorial commentary on what a given feed's rating means. Surface the source as the source publishes it. If a change would require the project to take a position on which feed is right, the change is out of scope.

## Review

A maintainer reviews each contribution and verifies the source link, the provenance tag, and that no composite scoring or editorializing has been introduced. Merges land on the public main branch. Accepting at least one external correction end to end, from issue to merged change visible in the live data, is a tracked project milestone.

## Code style

Application code is not yet in the repository. When it lands, the expectations will be:

- TypeScript, strict mode.
- Lint and typecheck must pass before merge.
- Tests required for adapter logic and for any code path that writes to the data layer.

This section will be expanded once the application skeleton is added.

## Pull request checklist

Include this checklist in your pull request description and confirm each item.

- [ ] Source link included for every data change.
- [ ] Provenance tag set (`auto` or `manual`); curator named if `manual`.
- [ ] No composite score, ranking, or editorial commentary introduced.
- [ ] One logical change in this pull request.
- [ ] Build, lint, and typecheck pass (once application code exists).
