export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">RiskAtlas</h1>
      <p className="mt-3 text-neutral-700">
        A neutral, open-source aggregator that shows what independent DeFi risk feeds say about
        major Ethereum protocols, side by side, with provenance.
      </p>

      <p className="mt-6 rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
        RiskAtlas does not score, rank, recommend, or synthesize risk. Feed ratings are shown
        verbatim, with a link back to each source.
      </p>

      <div className="mt-8 text-sm text-neutral-600">
        Early development. Application scaffold is in place; data and UI are forthcoming.
      </div>

      <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-neutral-700">
        <li>
          <a
            className="underline underline-offset-2 hover:text-neutral-900"
            href="https://github.com/Dev-In-Crypt/RiskAtlas"
          >
            Repository
          </a>
        </li>
        <li>
          <a
            className="underline underline-offset-2 hover:text-neutral-900"
            href="https://github.com/Dev-In-Crypt/RiskAtlas/blob/main/PROJECT_CHARTER.md"
          >
            Project charter
          </a>
        </li>
        <li>
          <a
            className="underline underline-offset-2 hover:text-neutral-900"
            href="https://github.com/Dev-In-Crypt/RiskAtlas/blob/main/METHODOLOGY.md"
          >
            Methodology
          </a>
        </li>
        <li>
          <a
            className="underline underline-offset-2 hover:text-neutral-900"
            href="https://github.com/Dev-In-Crypt/RiskAtlas/blob/main/CONTRIBUTING.md"
          >
            Contributing
          </a>
        </li>
      </ul>
    </main>
  );
}
