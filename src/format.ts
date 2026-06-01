import type { PortfolioAllocationRiskReport } from "./types.js";

export function toSummary(report: PortfolioAllocationRiskReport) {
  return [
    `Allocation lanes: ${report.items}`,
    `Average concentration: ${report.averageConcentrationScore}`,
    `Average downside clustering: ${report.averageDownsideClusterScore}`,
    `Average savings recovery: ${report.averageSavingsRecoveryScore}`,
    `Average investment conviction: ${report.averageInvestmentConvictionScore}`,
    `Average diversification: ${report.averageDiversificationScore}`,
    `Average board confidence: ${report.averageBoardConfidenceScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Trim tracks: ${report.trimTracks}`,
    `Protect tracks: ${report.protectTracks}`,
    `Capital at risk ($M): ${report.capitalAtRiskMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
