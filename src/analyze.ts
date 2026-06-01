import type {
  Finding,
  PortfolioAllocationRiskExport,
  PortfolioAllocationRiskItem,
  PortfolioAllocationRiskReport
} from "./types.js";

function average(items: PortfolioAllocationRiskItem[], pick: (item: PortfolioAllocationRiskItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: PortfolioAllocationRiskItem): Finding[] {
  const findings: Finding[] = [];

  if (item.direction === "TRIM" && item.savingsRecoveryScore >= 78) {
    findings.push({
      code: "trim-capital-now",
      severity: "medium",
      track: item.track,
      audience: item.audience,
      message: "This lane is ready for an immediate trim and savings-recovery recommendation."
    });
  }

  if (item.direction === "PROTECT" && item.investmentConvictionScore >= 85 && item.boardConfidenceScore >= 85) {
    findings.push({
      code: "protect-flagship",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This allocation behaves like a flagship and should be protected from opportunistic cuts."
    });
  }

  if (item.downsideClusterScore >= 68) {
    findings.push({
      code: "clustered-downside",
      severity: item.downsideClusterScore >= 78 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Downside signals are clustering into one allocation lane, which weakens the board story if left unresolved."
    });
  }

  if (item.concentrationScore >= 72 && item.diversificationScore <= 55) {
    findings.push({
      code: "concentration-overhang",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "This allocation is too concentrated relative to its diversification and should be re-ranked quickly."
    });
  }

  if (item.boardConfidenceScore < 74 || item.requiredEvidence.length > 4) {
    findings.push({
      code: "thin-allocation-proof",
      severity: item.boardConfidenceScore < 64 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "The allocation recommendation is still resting on thin proof, which weakens the committee packet."
    });
  }

  return findings;
}

export function analyze(items: PortfolioAllocationRiskItem[], options: { now?: string } = {}): PortfolioAllocationRiskReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const trimTracks = items.filter((item) => item.direction === "TRIM").length;
  const protectTracks = items.filter((item) => item.direction === "PROTECT").length;
  const capitalAtRiskMillions = Math.round(
    items.reduce((sum, item) => sum + item.concentrationScore * 0.7 + item.downsideClusterScore * 0.55, 0)
  );

  return {
    generatedAt,
    items: items.length,
    averageConcentrationScore: average(items, (item) => item.concentrationScore),
    averageDownsideClusterScore: average(items, (item) => item.downsideClusterScore),
    averageSavingsRecoveryScore: average(items, (item) => item.savingsRecoveryScore),
    averageInvestmentConvictionScore: average(items, (item) => item.investmentConvictionScore),
    averageDiversificationScore: average(items, (item) => item.diversificationScore),
    averageBoardConfidenceScore: average(items, (item) => item.boardConfidenceScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    trimTracks,
    protectTracks,
    capitalAtRiskMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: PortfolioAllocationRiskItem[], now?: string): PortfolioAllocationRiskExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
