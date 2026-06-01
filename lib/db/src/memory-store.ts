import type { Product } from "./schema/products";
import type { Region } from "./schema/regions";
import type { Distributor } from "./schema/distributors";
import {
  SEED_DISTRIBUTORS,
  SEED_PRODUCTS,
  SEED_REGIONS,
} from "./seed-data";

let regions: Region[] = [];
let products: Product[] = [];
let distributors: Distributor[] = [];
let nextProductId = 1;
let nextRegionId = 1;
let nextDistributorId = 1;

export function resetMemoryStore(): void {
  regions = SEED_REGIONS.map((r) => ({ ...r, id: nextRegionId++ }));
  products = SEED_PRODUCTS.map((p) => ({ ...p, id: nextProductId++ }));
  distributors = SEED_DISTRIBUTORS.map((d) => ({
    ...d,
    id: nextDistributorId++,
    createdAt: new Date(),
  }));
}

resetMemoryStore();

export function memoryListRegions(): Region[] {
  return [...regions];
}

export function memoryGetRegionByCode(code: string): Region | undefined {
  return regions.find((r) => r.code === code);
}

export function memoryListProducts(): Product[] {
  return [...products];
}

export function memoryListFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function memoryGetProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function memoryListDistributors(): Distributor[] {
  return [...distributors];
}

export function memoryCreateDistributor(
  input: Omit<Distributor, "id" | "createdAt" | "status"> & {
    status?: Distributor["status"];
  },
): Distributor {
  const row: Distributor = {
    ...input,
    id: nextDistributorId++,
    status: input.status ?? "pending",
    createdAt: new Date(),
  };
  distributors.push(row);
  return row;
}

export function memoryGetDistributor(id: number): Distributor | undefined {
  return distributors.find((d) => d.id === id);
}

export function memoryUpdateDistributorStatus(
  id: number,
  status: Distributor["status"],
): Distributor | undefined {
  const row = distributors.find((d) => d.id === id);
  if (!row) return undefined;
  row.status = status;
  return row;
}
