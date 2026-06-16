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

## Status

Early development, built in the open. No production deployment yet. Charter, scope, and planned stack are stable; application code is forthcoming.

## License

[AGPL-3.0](LICENSE). The repository is public from its first commit.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Corrections, additional protocols, additional feed providers, and provenance fixes are all welcome through issues and pull requests.

## Project charter

See [PROJECT_CHARTER.md](PROJECT_CHARTER.md). The no-composite-scoring rule defined there is binding on this project and on any successor steward.
