# RiskAtlas

A neutral, open-source aggregator that shows what independent DeFi risk feeds say about major Ethereum protocols, side by side, with provenance.

## What it is

RiskAtlas collects and displays risk assessments from independent DeFi risk feeds and presents them together for a single protocol. The premise is oracle diversity: no single feed is canonical, and the methodological disagreement between feeds is itself useful information. The aggregation, with full provenance and a link back to each source, is the value. Each rating is shown exactly as the source publishes it.

## What it is NOT

- It does not compute or display its own risk score.
- It does not rank or grade protocols.
- It does not issue recommendations, opinions, or warnings.
- It does not synthesize, average, or otherwise combine ratings across feeds.
- It does not hide, soften, or reconcile disagreement between feeds.

The binding form of this constraint lives in [PROJECT_CHARTER.md](PROJECT_CHARTER.md).

## Scope (v1)

- 20 seed Ethereum DeFi protocols.
- Protocol-by-feed coverage matrix with three labels per cell: covered, partial, not yet covered.
- Per-protocol detail pages showing each feed's rating verbatim, with source link, timestamp, and provenance tag.
- Methodology page describing how each feed is fetched and what its provenance means.
- Open data layer: full underlying data available as JSON and CSV, alongside schema documentation.

## Planned stack

The following stack is planned for the application layer. The repository currently contains only foundational documentation.

- Application: Next.js with TypeScript, Tailwind CSS, shadcn/ui, TanStack Table.
- Database: Postgres on Supabase, accessed via Drizzle ORM.
- Ingestion: n8n workflows for scheduled fetches and healthchecks.
- Deployment: Vercel.
- Data sources: DefiLlama (TVL), Snapshot and Tally and on-chain reads via viem (governance), plus per-feed adapters for each independent risk feed.

## Repository layout

```
riskatlas/
  README.md              this file
  LICENSE                AGPL-3.0, verbatim
  PROJECT_CHARTER.md     binding rules (no composite scoring, stewardship, amendments)
  CONTRIBUTING.md        how to propose corrections, additions, and fixes
  METHODOLOGY.md         feed selection, coverage labels, provenance tags, sources
  DATA_SCHEMA.md         data model, entities, fields, provenance invariants
  IMPLEMENTATION_PLAN.md internal step-by-step plan for the application build
  .gitignore
  proposal/              holds the Ethereum Foundation RFP proposal PDF
  data/
    protocols.seed.json  the 20 v1 seed protocols
    feeds.registry.json  baseline (14) + added (3) feed providers
    coverage.example.json illustrative coverage matrix, not real ratings
```

The `proposal/` directory holds the EF App Relations RFP response as a PDF. The repository tracks `proposal/.gitkeep` so the directory exists before the PDF lands.

## Status

Early development, built in the open. No production deployment yet. Charter, scope, and planned stack are stable; application code is forthcoming.

## License

[AGPL-3.0](LICENSE). The repository is public from its first commit.

## Documents

- [PROJECT_CHARTER.md](PROJECT_CHARTER.md): binding rules, including the no-composite-scoring constraint.
- [CONTRIBUTING.md](CONTRIBUTING.md): how to propose corrections, new protocols, and new feeds.
- [METHODOLOGY.md](METHODOLOGY.md): how feeds are selected, how coverage is labeled, how provenance is tagged.
- [DATA_SCHEMA.md](DATA_SCHEMA.md): the data model and the verbatim-storage invariants.
