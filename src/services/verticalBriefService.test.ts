import { describe, expect, it } from "vitest";
import {
  allocationLane,
  concentrationRisks,
  downsideClusters,
  payload,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

describe("portfolio allocation risk service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the allocation lane", () => {
    expect(allocationLane()[0]?.audience).toBeTruthy();
  });

  it("returns the concentration risks view", () => {
    expect(concentrationRisks()[0]?.concentrationScore).toBeGreaterThan(0);
  });

  it("returns the downside clusters view", () => {
    expect(downsideClusters()[0]?.urgencyScore).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the allocation headline in the payload sample", () => {
    expect(payload().sample[0]?.allocationHeadline).toBeTruthy();
  });
});
