# LocalEdge

AI-powered investment intelligence. LocalEdge discovers, translates, analyzes, and prioritizes
financial news from local-language sources across seven high-growth markets — Brazil, India,
Mexico, Indonesia, Vietnam, South Korea, and Turkey — surfacing what matters before it reaches
mainstream global financial media.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. Sample data lives in `/data` as JSON.
Deploys to Vercel with zero configuration.

## Routes
- `/` — Main dashboard (conviction signals, not-yet-covered, emerging stories, global developments, trending countries/industries, most-mentioned companies)
- `/signals` — Full intelligence feed with category + market filters
- `/article/[id]` — Article analysis: original + translated headline, AI summary, bull/bear case, impact/confidence/novelty scoring
- `/company/[id]` — Company overview, exposure, supply chain, sentiment, implications
- `/country/[slug]` — Local feed, macro indicators, economic/regulatory/infrastructure/sector developments
- `/watchlist` — Follow companies, countries, industries (persists in browser)
- `/alerts` — High-impact signals, regulatory, supply-chain, commodity alerts

## AI scoring
Every article carries an Impact (0–100), Confidence (0–100), and Novelty (0–100) score.
