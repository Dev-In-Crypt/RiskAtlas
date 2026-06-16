# RiskAtlas Project Charter

This charter defines the binding principles of the RiskAtlas project. It exists to make the project's neutrality verifiable and durable across contributors and time.

## Binding rule

> RiskAtlas does not score, rank, recommend, or synthesize risk. It aggregates and displays source material from independent risk feeds with clear provenance. Any future addition of composite scoring requires written agreement from the Ethereum Foundation and a public charter amendment.

This rule is binding on all contributors, maintainers, and successor stewards.

## Why

The value of RiskAtlas is in making disagreement visible. Independent risk feeds use different methodologies, time horizons, and assumptions. Collapsing them into a single number, letter grade, or ordering creates false certainty and hides the methodological diversity that is the entire point of aggregation. RiskAtlas presents each feed as the feed itself presents it, side by side, and lets the reader draw conclusions.

## Provenance principle

Every material data point shown in RiskAtlas is traceable to its origin:

- For automated feeds: the source endpoint and the timestamp of the fetch.
- For manual entries: the curator, the source link, and the timestamp of entry.
- For corrections: the correction record (issue or pull request) that produced the change.

Manual entries are labeled as manual in the user interface. They are never disguised as automated data, and their presence is never hidden.

## Neutral positioning

- No protocol receives preferential treatment in coverage, ordering, or visual emphasis.
- No feed provider receives preferential treatment in placement, weighting, or commentary.
- Any conflict of interest affecting a maintainer, contributor, or steward is disclosed publicly in the repository before it can influence project decisions.
- The project does not accept paid placement, sponsored ratings, or undisclosed funding tied to coverage decisions.

## Stewardship

- The named steward of RiskAtlas is Dev-In-Crypt (https://github.com/Dev-In-Crypt).
- A successor steward must be named publicly in this repository before any handover takes effect.
- The no-composite-scoring constraint remains binding through any change of stewardship.
- Removing or weakening this constraint is only permitted through the amendment process below.

## Amendment process

This charter may be amended only through all of the following steps:

1. A pull request to this file describing the proposed change and its rationale.
2. Written agreement from the Ethereum Foundation, recorded in the pull request thread or linked from it.
3. A merged commit, retained in the public git history, that constitutes the public record of the change.

Any change made outside this process is not a valid amendment. Reverting such a change is consistent with the charter, not a breach of it.
