import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { samplePortfolioAllocationRiskStudio } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(samplePortfolioAllocationRiskStudio, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(samplePortfolioAllocationRiskStudio.length);
  });

  it("computes positive allocation metrics", () => {
    const report = analyze(samplePortfolioAllocationRiskStudio, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageSavingsRecoveryScore).toBeGreaterThan(0);
    expect(report.averageInvestmentConvictionScore).toBeGreaterThan(0);
  });

  it("counts trim and protect tracks", () => {
    const report = analyze(samplePortfolioAllocationRiskStudio, { now: "2026-06-01T00:00:00Z" });
    expect(report.trimTracks).toBeGreaterThan(0);
    expect(report.protectTracks).toBeGreaterThan(0);
  });

  it("emits findings", () => {
    const report = analyze(samplePortfolioAllocationRiskStudio, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up capital at risk", () => {
    const report = analyze(samplePortfolioAllocationRiskStudio, { now: "2026-06-01T00:00:00Z" });
    expect(report.capitalAtRiskMillions).toBeGreaterThan(0);
  });
});
