# Methodology

This document explains how RiskAtlas selects feeds, labels coverage, tags provenance, and sources governance and TVL data. It mirrors the binding constraints in [PROJECT_CHARTER.md](PROJECT_CHARTER.md).

## What RiskAtlas does and does not do

RiskAtlas aggregates and displays material from independent DeFi risk feeds, side by side, with provenance. It does not compute its own score, rank, grade, or recommendation. It does not synthesize, average, or otherwise combine ratings across feeds. It does not hide, soften, or reconcile disagreement between feeds. Each rating is shown exactly as the source publishes it.

## Feed selection

RiskAtlas treats no single feed as canonical. Feeds are included when they meet all of the following:

- They publish risk assessments of DeFi protocols using a documented methodology.
- Their output is either machine-readable (preferred) or publicly retrievable for manual entry.
- Their inclusion does not create a conflict of interest with a maintainer or steward; any potential conflict is disclosed publicly in the repository before inclusion.

The feed registry is split into two groups:

- Baseline: the 14 feeds identified at project start as the initial coverage set.
- Added: additional feeds onboarded after start, tagged with `"added": true` in the registry so the audit trail is visible.

Inclusion and exclusion decisions are made in public pull requests against [data/feeds.registry.json](data/feeds.registry.json). Excluded feeds, and the reason for exclusion, are documented in the pull request thread that decided the matter.

## Coverage labels

Each cell of the protocol-by-feed matrix carries one label:

- `covered`: the feed publishes a current assessment of this protocol that RiskAtlas can display verbatim, with a working source link.
- `partial`: the feed publishes an assessment of a related entity (for example, a sibling version, a related vault, or a parent family) but not of this exact protocol; or the assessment is stale or incomplete.
- `not yet covered`: the feed does not currently publish an assessment of this protocol.

Labels are assigned per cell, not per feed or per protocol, and are revised through the correction workflow in [CONTRIBUTING.md](CONTRIBUTING.md).

## Provenance tags

Every data point displayed in RiskAtlas carries one provenance tag:

- `auto`: fetched from a machine-readable endpoint by a scheduled adapter. The source URL and the fetch timestamp are stored alongside the value.
- `manual`: entered by a named curator who recorded the source URL, the timestamp of entry, and their identity.
- `illustrative`: placeholder or example data used in seeds, fixtures, or documentation. Never displayed as a real rating in the user-facing application.

The tag is always visible in the user interface. Manual entries are never disguised as automated data.

## Governance data

Governance information is sourced from on-chain reads and verifiable public endpoints, never from self-reported claims by the protocol team:

- Snapshot: proposals and votes via the public GraphQL API.
- Tally: governor configuration and proposals via the public API.
- On-chain reads via viem: governor parameters, timelock delays, and similar parameters that can be read directly from contracts.

Each source is stored and displayed separately, with its own source link and timestamp. Records from different sources are not merged.

## TVL

Total value locked is sourced from DefiLlama using the public API. For protocols where TVL is not the appropriate measure (for example, swap aggregators), a volume-equivalent metric from DefiLlama or the protocol's documented endpoint is used in its place. The metric in use is labeled in the user interface so the reader can tell TVL from volume.

## Corrections

Anyone can submit a correction by opening a GitHub issue or pull request against the relevant file in `data/`. A maintainer reviews the source link and the provenance tag, and merges the change on the public main branch. The end-to-end correction path, from submission to merged change visible in the live data, is a tracked project milestone. The full workflow lives in [CONTRIBUTING.md](CONTRIBUTING.md).
