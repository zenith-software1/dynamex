import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const artifactDir = path.dirname(fileURLToPath(import.meta.url));

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const staticCandidates = [
  path.resolve(artifactDir, "../catalytic-hub/dist/public"),
  path.resolve(artifactDir, "../../catalytic-hub/dist/public"),
];

const staticRoot = staticCandidates.find((dir) =>
  fs.existsSync(path.join(dir, "index.html")),
);

if (staticRoot) {
  app.use(express.static(staticRoot));

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(staticRoot, "index.html"));
  });

  logger.info({ staticRoot }, "Serving frontend static files");
} else {
  logger.warn("Frontend build not found; API-only mode");
}

export default app;
