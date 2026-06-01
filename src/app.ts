import express from "express";
import { renderDocs, renderInvestmentWaterfall, renderOverview, renderPeerGaps, renderVerification } from "./services/render.js";
import { allocationLane, concentrationRisks, downsideClusters, payload, riskMap, summary, verification } from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/allocation-lane", (_req, res) => res.type("html").send(renderPeerGaps()));
  app.get("/concentration-risks", (_req, res) => res.type("html").send(renderInvestmentWaterfall()));
  app.get("/downside-clusters", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/allocation-lane", (_req, res) => res.json(allocationLane()));
  app.get("/api/concentration-risks", (_req, res) => res.json(concentrationRisks()));
  app.get("/api/downside-clusters", (_req, res) => res.json(downsideClusters()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const port = Number(process.env.PORT || 4010);

if (process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`portfolio-allocation-risk-studio listening on http://127.0.0.1:${port}`);
  });
}
