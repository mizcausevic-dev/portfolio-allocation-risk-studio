import { once } from "node:events";
import { createServer } from "node:http";
import { AddressInfo } from "node:net";
import { createApp } from "../src/app.js";

async function main() {
  const app = createApp();
  const server = createServer(app);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");

  const { port } = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${port}`;
  const htmlRoutes = ["/", "/allocation-lane", "/concentration-risks", "/downside-clusters", "/verification", "/docs"];
  const jsonRoutes = [
    "/api/dashboard/summary",
    "/api/allocation-lane",
    "/api/concentration-risks",
    "/api/downside-clusters",
    "/api/risk-map",
    "/api/verification",
    "/api/sample",
    "/api/payload"
  ];

  try {
    for (const route of htmlRoutes) {
      const response = await fetch(`${base}${route}`);
      if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
        throw new Error(`HTML route failed: ${route}`);
      }
    }

    for (const route of jsonRoutes) {
      const response = await fetch(`${base}${route}`);
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error(`JSON route failed: ${route}`);
      }
    }

    console.log("smoke check passed");
  } finally {
    server.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
