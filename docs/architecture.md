# Architecture

Portfolio Allocation Risk Studio is a static-friendly TypeScript executive-intelligence surface for concentration pressure, downside clustering, trim-versus-protect choices, and board-safe capital allocation.

## Core flow

- `src/data/sampleVerticalBrief.ts` models allocation-risk lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores concentration, downside clustering, savings recovery, conviction, diversification, and board confidence while generating allocation findings.
- `src/services/verticalBriefService.ts` exposes the allocation-lane, concentration-risks, downside-clusters, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- where are we too concentrated
- where is downside clustering
- what should we protect or trim first
- what evidence still blocks a committee-quality decision

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
