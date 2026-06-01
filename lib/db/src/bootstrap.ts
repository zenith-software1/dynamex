import { count } from "drizzle-orm";
import { db, isMemoryMode } from "./index";
import { distributorsTable, productsTable, regionsTable } from "./schema";
import { resetMemoryStore } from "./memory-store";
import {
  SEED_DISTRIBUTORS,
  SEED_PRODUCTS,
  SEED_REGIONS,
} from "./seed-data";

export async function ensureSeeded(): Promise<void> {
  if (isMemoryMode) {
    resetMemoryStore();
    return;
  }

  const [regionCount] = await db.select({ value: count() }).from(regionsTable);
  if (Number(regionCount?.value) > 0) {
    return;
  }

  await db.insert(regionsTable).values(SEED_REGIONS);
  await db.insert(productsTable).values(SEED_PRODUCTS);
  await db.insert(distributorsTable).values(SEED_DISTRIBUTORS);
}
