// [Zenith Safe-Code Protocol Active]
import { Router } from "express";
import {
  listDistributors,
  createDistributor,
  getDistributor,
  updateDistributorStatus,
} from "@workspace/db";
import {
  CreateDistributorBody,
  ListDistributorsQueryParams,
  GetDistributorParams,
  UpdateDistributorStatusParams,
  UpdateDistributorStatusBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const query = ListDistributorsQueryParams.safeParse(req.query);
    if (!query.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    let rows = await listDistributors();

    if (query.data.status) {
      rows = rows.filter((r) => r.status === query.data.status);
    }
    if (query.data.region) {
      rows = rows.filter((r) => r.country === query.data.region);
    }

    const result = rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Error listing distributors");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = CreateDistributorBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }

    const inserted = await createDistributor({
      companyName: body.data.companyName,
      contactName: body.data.contactName,
      email: body.data.email,
      phone: body.data.phone,
      country: body.data.country,
      city: body.data.city,
      businessType: body.data.businessType,
      estimatedMonthlyVolume: body.data.estimatedMonthlyVolume,
      taxId: body.data.taxId ?? null,
      message: body.data.message ?? null,
    });

    res.status(201).json({
      ...inserted,
      createdAt: inserted.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error creating distributor");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const rows = await listDistributors();

    const total = rows.length;
    const pending = rows.filter((r) => r.status === "pending").length;
    const approved = rows.filter((r) => r.status === "approved").length;
    const rejected = rows.filter((r) => r.status === "rejected").length;

    const regionMap: Record<string, number> = {};
    for (const r of rows) {
      regionMap[r.country] = (regionMap[r.country] ?? 0) + 1;
    }
    const byRegion = Object.entries(regionMap).map(([country, count]) => ({
      country,
      count,
    }));

    res.json({ total, pending, approved, rejected, byRegion });
  } catch (err) {
    req.log.error({ err }, "Error getting distributor stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const params = GetDistributorParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const row = await getDistributor(params.data.id);

    if (!row) {
      res.status(404).json({ error: "Distributor not found" });
      return;
    }

    res.json({ ...row, createdAt: row.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Error getting distributor");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const params = UpdateDistributorStatusParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const body = UpdateDistributorStatusBody.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: body.error.message });
      return;
    }

    const updated = await updateDistributorStatus(
      params.data.id,
      body.data.status,
    );

    if (!updated) {
      res.status(404).json({ error: "Distributor not found" });
      return;
    }

    res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Error updating distributor status");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
