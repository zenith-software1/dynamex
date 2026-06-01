import { eq } from "drizzle-orm";
import { db, isMemoryMode } from "./index";
import {
  distributorsTable,
  productsTable,
  regionsTable,
  type Distributor,
  type Product,
  type Region,
} from "./schema";
import {
  memoryCreateDistributor,
  memoryGetDistributor,
  memoryGetProduct,
  memoryGetRegionByCode,
  memoryListDistributors,
  memoryListFeaturedProducts,
  memoryListProducts,
  memoryListRegions,
  memoryUpdateDistributorStatus,
} from "./memory-store";

export async function listRegions(): Promise<Region[]> {
  if (isMemoryMode) return memoryListRegions();
  return db.select().from(regionsTable);
}

export async function getRegionByCode(code: string): Promise<Region | undefined> {
  if (isMemoryMode) return memoryGetRegionByCode(code);
  const [row] = await db
    .select()
    .from(regionsTable)
    .where(eq(regionsTable.code, code));
  return row;
}

export async function listProducts(): Promise<Product[]> {
  if (isMemoryMode) return memoryListProducts();
  return db.select().from(productsTable);
}

export async function listFeaturedProducts(): Promise<Product[]> {
  if (isMemoryMode) return memoryListFeaturedProducts();
  return db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isFeatured, true));
}

export async function getProduct(id: number): Promise<Product | undefined> {
  if (isMemoryMode) return memoryGetProduct(id);
  const [row] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));
  return row;
}

export async function listDistributors(): Promise<Distributor[]> {
  if (isMemoryMode) return memoryListDistributors();
  return db.select().from(distributorsTable);
}

export async function createDistributor(
  input: Omit<Distributor, "id" | "createdAt" | "status"> & {
    taxId?: string | null;
    message?: string | null;
  },
): Promise<Distributor> {
  if (isMemoryMode) {
    return memoryCreateDistributor({
      ...input,
      taxId: input.taxId ?? null,
      message: input.message ?? null,
    });
  }

  const [inserted] = await db
    .insert(distributorsTable)
    .values({
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      country: input.country,
      city: input.city,
      businessType: input.businessType,
      estimatedMonthlyVolume: input.estimatedMonthlyVolume,
      taxId: input.taxId ?? null,
      message: input.message ?? null,
    })
    .returning();

  return inserted;
}

export async function getDistributor(id: number): Promise<Distributor | undefined> {
  if (isMemoryMode) return memoryGetDistributor(id);
  const [row] = await db
    .select()
    .from(distributorsTable)
    .where(eq(distributorsTable.id, id));
  return row;
}

export async function updateDistributorStatus(
  id: number,
  status: Distributor["status"],
): Promise<Distributor | undefined> {
  if (isMemoryMode) return memoryUpdateDistributorStatus(id, status);

  const [updated] = await db
    .update(distributorsTable)
    .set({ status })
    .where(eq(distributorsTable.id, id))
    .returning();

  return updated;
}
