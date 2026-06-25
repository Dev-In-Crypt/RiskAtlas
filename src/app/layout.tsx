import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RiskAtlas",
  description:
    "Neutral, open-source aggregator of independent DeFi risk feeds for major Ethereum protocols. Verbatim ratings, full provenance, no composite scoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
