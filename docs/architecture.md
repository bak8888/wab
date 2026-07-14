# Architecture

## Research Pipeline
`ResearchProvider` is an interface. `DemoResearchProvider` returns fixtures. `OpenAIResearchProvider` uses the official OpenAI TypeScript SDK Responses API with `web_search_preview`, splitting work into schedule, squad, injury, press conference, lineup, form, home/away, and travel sub-searches. Web text is sanitized and treated only as data.

## Prediction Pipeline
Evidence and sports data feed the availability analyzer. Feature values then enter `predictSoccer`, a deterministic team-rating + expected-goals + Poisson engine. The explanation layer receives calculated probabilities and may not alter them.

## Data Flow
UI → `/api/matches/resolve` → candidate match → `/api/analyses` → research → availability → prediction → Zod validation → UI result.

## Provider Replacement
Implement the `ResearchProvider` or future `SportsDataProvider` interface and select it in factory functions. Keep external service specifics out of domain code.

## Adding a SportAdapter
Create a sport adapter with outcome shape, feature builder, and prediction engine. Soccer supports home/draw/away; baseball and basketball should return two-way probabilities.
