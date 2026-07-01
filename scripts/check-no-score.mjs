#!/usr/bin/env node
// Enforces the no-composite-scoring rule from PROJECT_CHARTER.md.
// Fails if any tracked source, data, or docs file contains a phrase that
// implies a RiskAtlas-owned score, rank, or recommendation.
//
// The forbidden-phrase list below is the canonical machine-readable copy.
// The human-readable policy narrative lives in POLICY_NO_SCORE.md (internal).
// Keep the two in sync when either changes.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();

const PHRASES = [
  "RiskAtlas Score",
  "Overall Score",
  "Composite Score",
  "Weighted Score",
  "Final Rating",
  "Best protocol",
  "Worst protocol",
  "RiskAtlas recommends",
  "Our rating",
  "Our score",
  "We rate",
  "RiskAtlas says",
  "Top protocol",
  "Top ranked",
  "Ranking",
  "Recommended",
  "Safest",
  "Riskiest",
];

// Files where the phrases are legitimately discussed because the file's job
// is to describe what is forbidden. Paths relative to repo root, forward slashes.
// The internal workflow files (AGENTS, ROADMAP, TODO, etc.) are gitignored so
// they will not exist in CI, but locally they must be excluded too because they
// contain the forbidden vocabulary by design.
const EXCLUDE_FILES = new Set([
  // Public files that describe the rule
  "PROJECT_CHARTER.md",
  "METHODOLOGY.md",
  "CONTRIBUTING.md",
  ".github/ISSUE_TEMPLATE/correction.yml",
  // The script itself contains the phrase list
  "scripts/check-no-score.mjs",
  // Internal workflow files (gitignored; excluded for local runs)
  "AGENTS.md",
  "ROADMAP.md",
  "TODO.md",
  "STATE.md",
  "VERIFY.md",
  "ARCHITECTURE.md",
  "SECURITY_NOTES.md",
  "DECISIONS.md",
  "POLICY_NO_SCORE.md",
  "IMPLEMENTATION_PLAN.md",
  // Lockfiles and generated artifacts
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
  "next-env.d.ts",
]);

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
  "out",
  "RUNS",
  ".claude",
  "proposal",
]);

const INCLUDE_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".md",
  ".mdx",
  ".json",
  ".yml",
  ".yaml",
  ".css",
  ".html",
]);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      walk(full, files);
      continue;
    }
    const rel = relative(ROOT, full).split(sep).join("/");
    if (EXCLUDE_FILES.has(rel)) continue;
    const dot = entry.lastIndexOf(".");
    const ext = dot >= 0 ? entry.slice(dot) : "";
    if (!INCLUDE_EXT.has(ext)) continue;
    files.push(rel);
  }
  return files;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Multi-word phrase: case-insensitive substring.
// Single-word phrase: word-boundary match so "Safest" does not hit "safestring".
function makeMatcher(phrase) {
  const escaped = escapeRegex(phrase);
  const pattern = /\s/.test(phrase) ? escaped : `\\b${escaped}\\b`;
  return new RegExp(pattern, "i");
}

const matchers = PHRASES.map((p) => ({ phrase: p, re: makeMatcher(p) }));

const files = walk(ROOT);
const hits = [];

for (const file of files) {
  const content = readFileSync(join(ROOT, file), "utf8");
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const { phrase, re } of matchers) {
      if (re.test(lines[i])) {
        hits.push({ file, line: i + 1, phrase, text: lines[i].trim() });
      }
    }
  }
}

if (hits.length === 0) {
  console.log(`no-score check: OK (0 hits across ${files.length} scanned files)`);
  process.exit(0);
}

console.error(`no-score check: FAIL (${hits.length} hit(s) across ${files.length} scanned files)\n`);
for (const h of hits) {
  const snippet = h.text.length > 120 ? h.text.slice(0, 117) + "..." : h.text;
  console.error(`${h.file}:${h.line}  [${h.phrase}]  ${snippet}`);
}
console.error(
  `\nSee PROJECT_CHARTER.md (public) and POLICY_NO_SCORE.md (internal) for context.`,
);
process.exit(1);
