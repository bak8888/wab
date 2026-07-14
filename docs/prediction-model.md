# Prediction Model

## Formula
MVP soccer uses expected goals:
- `homeEG = base + homeAdvantage + ratingDiffScale - awayInjuryPenalty + restAdjustment`
- `awayEG = base - ratingDiffScale - homeInjuryPenalty`

Each team goal count is modeled with Poisson probability `P(k)=e^-λ λ^k / k!`. Outcomes are summed for home win, draw, away win from 0..8 goals.

## Features
- Team rating: approximate strength
- Home advantage: fixed goals value
- Injuries/suspensions: capped goal penalty only when source-backed
- Rest days: bounded adjustment

Weights live in `src/config/prediction.ts`.

## Normalization
Raw outcome probabilities are normalized to 100 with one-decimal rounding correction. NaN and Infinity are rejected by tests and Zod constraints.

## Confidence vs Win Probability
Win probability is an outcome estimate. Analysis confidence is separate and based on freshness, source count, official source ratio, conflicts, and coverage.

## Calibration Plan
Add historical match data, backtest Brier/log loss, tune weights by league, and calibrate with isotonic or Platt scaling while preserving explainability.
