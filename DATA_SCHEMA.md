# Data Schema

This document describes the RiskAtlas data model. Application code is not yet in the repository; the schema below is the contract that the application and the public data exports will conform to.

A core invariant: `feed_ratings` stores `raw_value` and `raw_label` exactly as the source publishes them, alongside `source_url`, `fetched_at`, and `provenance`. The rating text is never transformed, rescaled, translated, or otherwise edited.

Public JSON and CSV exports of the full data layer are planned, served from a `/data` route once the application lands. Each export will include the generation timestamp and the commit SHA of the code that produced it.

## Entities

### protocols

The protocols that RiskAtlas covers.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `slug` | text, unique | URL-safe identifier, for example `aave`. |
| `name` | text | Display name. |
| `family_id` | uuid, nullable | Foreign key into `protocol_families`. |
| `category` | text | Category from the methodology, for example `Lending` or `DEX/AMM`. |
| `website` | text, nullable | Canonical project website. |
| `chains` | text[] | Chains the protocol operates on. v1 focuses on Ethereum mainnet. |
| `defillama_slug` | text, nullable | Slug used by DefiLlama for TVL lookups. |
| `created_at` | timestamptz | Row creation time. |

### protocol_families

Groups versions of the same protocol, for example Aave v3 and Aave v4.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `slug` | text, unique | URL-safe family identifier. |
| `name` | text | Display name of the family. |
| `description` | text, nullable | Short, neutral description. |

### feeds

The independent risk feeds RiskAtlas displays.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `slug` | text, unique | URL-safe identifier, for example `llamarisk`. |
| `name` | text | Display name. |
| `methodology_summary` | text | One-line neutral description of what the feed measures. |
| `source_url` | text | Public homepage or documentation URL. |
| `license` | text, nullable | License of the feed's published data, when known. |
| `machine_readable` | boolean | True if RiskAtlas can fetch the feed via an API or stable endpoint. |
| `cadence` | text, nullable | Refresh cadence of the source, when known. |
| `added` | boolean | True if the feed was onboarded after the project start; false for the baseline 14. |

### feed_coverage

The protocol-by-feed matrix cell.

| Field | Type | Description |
|---|---|---|
| `protocol_id` | uuid | Foreign key into `protocols`. |
| `feed_id` | uuid | Foreign key into `feeds`. |
| `status` | enum | One of `covered`, `partial`, `none`. |
| `note` | text, nullable | Optional curator note explaining a `partial` or `none` status. |
| `updated_at` | timestamptz | Last time this cell was updated. |

Composite primary key: (`protocol_id`, `feed_id`).

### feed_ratings

The verbatim rating a feed publishes about a protocol.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `protocol_id` | uuid | Foreign key into `protocols`. |
| `feed_id` | uuid | Foreign key into `feeds`. |
| `raw_value` | text | The rating value, byte-for-byte from the source. |
| `raw_label` | text | The rating label, byte-for-byte from the source. |
| `source_url` | text | Direct link to the source page or endpoint. |
| `fetched_at` | timestamptz | Time the value was fetched or entered. |
| `provenance` | enum | One of `auto`, `manual`, `illustrative`. |
| `curator` | text, nullable | Name of the curator for `manual` entries. |

`raw_value` and `raw_label` are never transformed by RiskAtlas. If a source changes its rating scale, the new value lands here as a new row; the old row is retained for history.

### governance_records

On-chain or verifiable governance parameters and events.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `protocol_id` | uuid | Foreign key into `protocols`. |
| `source` | enum | One of `snapshot`, `tally`, `onchain`. |
| `payload` | jsonb | The fetched record, stored verbatim. |
| `source_url` | text | Link to the source page or transaction. |
| `fetched_at` | timestamptz | Time the record was fetched. |
| `provenance` | enum | One of `auto`, `manual`, `illustrative`. |

Records from different sources are stored side by side and never merged.

### audit_records

Public security audits.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `protocol_id` | uuid | Foreign key into `protocols`. |
| `auditor` | text | Name of the auditing firm or party. |
| `report_url` | text | Public link to the audit report. |
| `scope` | text, nullable | Scope of the audit. |
| `completed_at` | date | Date the audit was completed or published. |
| `provenance` | enum | One of `auto`, `manual`, `illustrative`. |

### incident_records

Publicly reported security incidents, exploits, or material outages.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `protocol_id` | uuid | Foreign key into `protocols`. |
| `occurred_at` | date | Date the incident occurred. |
| `summary` | text | Short, neutral summary. |
| `loss_usd` | numeric, nullable | Reported loss in USD, when known. |
| `source_url` | text | Public link to the report or postmortem. |
| `provenance` | enum | One of `auto`, `manual`, `illustrative`. |

### provenance_records

An audit log of where a given data point came from. Lets the UI render a complete provenance trail for any value without joining four tables on the read path.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `entity_type` | text | The entity the record describes, for example `feed_ratings` or `governance_records`. |
| `entity_id` | uuid | The row id within that entity. |
| `source_url` | text | Where the value came from. |
| `fetched_at` | timestamptz | When the value was captured. |
| `provenance` | enum | One of `auto`, `manual`, `illustrative`. |
| `curator` | text, nullable | Curator for `manual` entries. |
| `correction_request_id` | uuid, nullable | Foreign key into `correction_requests` when the value resulted from a correction. |

### correction_requests

The audit trail of public corrections.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Primary key. |
| `protocol_id` | uuid, nullable | Foreign key into `protocols` if the correction is protocol-specific. |
| `feed_id` | uuid, nullable | Foreign key into `feeds` if the correction is feed-specific. |
| `submitter` | text | Name or handle of the submitter. |
| `payload` | jsonb | Proposed change, including before and after values. |
| `pr_url` | text, nullable | URL of the pull request that carried the change. |
| `status` | enum | One of `open`, `merged`, `rejected`. |
| `created_at` | timestamptz | Time the request was opened. |
