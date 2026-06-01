import { analyze } from "../analyze.js";
import { samplePortfolioAllocationRiskStudio } from "../data/sampleVerticalBrief.js";

const report = analyze(samplePortfolioAllocationRiskStudio, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageConcentrationScore: report.averageConcentrationScore,
    averageDownsideClusterScore: report.averageDownsideClusterScore,
    averageSavingsRecoveryScore: report.averageSavingsRecoveryScore,
    averageInvestmentConvictionScore: report.averageInvestmentConvictionScore,
    averageDiversificationScore: report.averageDiversificationScore,
    averageBoardConfidenceScore: report.averageBoardConfidenceScore,
    averageUrgencyScore: report.averageUrgencyScore,
    trimTracks: report.trimTracks,
    protectTracks: report.protectTracks,
    capitalAtRiskMillions: report.capitalAtRiskMillions,
    highFindings,
    recommendation:
      "Protect the AI and biotech flagships, increase the highest-recovery revenue lane, and trim concentrated identity and procurement overlap before funding more adjacent expansion."
  };
}

export function allocationLane() {
  return samplePortfolioAllocationRiskStudio.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    direction: item.direction,
    allocationTheme: item.allocationTheme,
    boardQuestion: item.boardQuestion,
    allocationMove: item.allocationMove,
    nextCapitalDecision: item.nextCapitalDecision
  }));
}

export function concentrationRisks() {
  return samplePortfolioAllocationRiskStudio.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    allocationTheme: item.allocationTheme,
    concentrationScore: item.concentrationScore,
    downsideClusterScore: item.downsideClusterScore,
    diversificationScore: item.diversificationScore,
    companyTags: item.companyTags
  }));
}

export function downsideClusters() {
  return samplePortfolioAllocationRiskStudio.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    urgencyScore: item.urgencyScore,
    boardConfidenceScore: item.boardConfidenceScore,
    currentPosture: item.currentPosture,
    allocationHeadline: item.allocationHeadline,
    relatedSurfaces: item.relatedSurfaces,
    requiredEvidence: item.requiredEvidence
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic allocation-risk data only - no live capital plans, committee packets, or private financials are included.",
    "Concentration, downside clustering, savings recovery, conviction, diversification, and board-confidence metrics are modeled from the sample executive-intelligence set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package allocation-risk judgment into one board-readable operating layer.",
    "Company tags and track labels are synthetic design aids rather than audited portfolio signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    allocationLane: allocationLane(),
    concentrationRisks: concentrationRisks(),
    downsideClusters: downsideClusters(),
    riskMap: riskMap(),
    verification: verification(),
    sample: samplePortfolioAllocationRiskStudio
  };
}
