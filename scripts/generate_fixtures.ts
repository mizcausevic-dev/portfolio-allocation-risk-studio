import { toExport } from "../src/analyze.js";
import { samplePortfolioAllocationRiskStudio } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = samplePortfolioAllocationRiskStudio.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync(
  "fixtures/portfolio-allocation-risk-studio.json",
  JSON.stringify(toExport(samplePortfolioAllocationRiskStudio), null, 2)
);

writeFileSync(
  "fixtures/portfolio-allocation-risk-studio-clean.json",
  JSON.stringify(toExport(clean), null, 2)
);
