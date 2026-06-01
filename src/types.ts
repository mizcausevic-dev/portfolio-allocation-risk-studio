export type AllocationTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type AllocationDirection = "INCREASE" | "PROTECT" | "TRIM" | "HOLD";

export interface PortfolioAllocationRiskItem {
  id: string;
  owner: string;
  audience: string;
  track: AllocationTrack;
  direction: AllocationDirection;
  allocationTheme: string;
  boardQuestion: string;
  currentPosture: string;
  allocationMove: string;
  concentrationScore: number;
  downsideClusterScore: number;
  savingsRecoveryScore: number;
  investmentConvictionScore: number;
  diversificationScore: number;
  boardConfidenceScore: number;
  urgencyScore: number;
  allocationHeadline: string;
  allocationNarrative: string;
  nextCapitalDecision: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface PortfolioAllocationRiskExport {
  generatedAt: string;
  items: PortfolioAllocationRiskItem[];
}

export type FindingCode =
  | "clustered-downside"
  | "trim-capital-now"
  | "protect-flagship"
  | "thin-allocation-proof"
  | "concentration-overhang";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: AllocationTrack;
  audience: string;
  message: string;
}

export interface PortfolioAllocationRiskReport {
  generatedAt: string;
  items: number;
  averageConcentrationScore: number;
  averageDownsideClusterScore: number;
  averageSavingsRecoveryScore: number;
  averageInvestmentConvictionScore: number;
  averageDiversificationScore: number;
  averageBoardConfidenceScore: number;
  averageUrgencyScore: number;
  trimTracks: number;
  protectTracks: number;
  capitalAtRiskMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
