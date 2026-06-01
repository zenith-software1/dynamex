// [Zenith Safe-Code Protocol Active]
import { Router } from "express";
import {
  listProducts,
  listFeaturedProducts,
  getProduct,
} from "@workspace/db";
import {
  ListProductsQueryParams,
  GetProductParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const query = ListProductsQueryParams.safeParse(req.query);
    if (!query.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    let rows = await listProducts();

    if (query.data.category) {
      rows = rows.filter((r) => r.category === query.data.category);
    }
    if (query.data.brand) {
      const brand = query.data.brand.toLowerCase();
      rows = rows.filter((r) =>
        (r.compatibleBrands as string[]).some((b) =>
          b.toLowerCase().includes(brand),
        ),
      );
    }

    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Error listing products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const rows = await listFeaturedProducts();
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Error getting featured products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const params = GetProductParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const row = await getProduct(params.data.id);

    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(row);
  } catch (err) {
    req.log.error({ err }, "Error getting product");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
