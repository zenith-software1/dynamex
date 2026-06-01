// [Zenith Safe-Code Protocol Active]
import { Router } from "express";
import { listRegions, getRegionByCode } from "@workspace/db";
import { GetRegionParams } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const rows = await listRegions();
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Error listing regions");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const params = GetRegionParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: "Invalid region code" });
      return;
    }

    const row = await getRegionByCode(params.data.code);

    if (!row) {
      res.status(404).json({ error: "Region not found" });
      return;
    }

    res.json(row);
  } catch (err) {
    req.log.error({ err }, "Error getting region");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
