import { pgTable, serial, text, varchar, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description").notNull(),
  technicalSpecs: jsonb("technical_specs").default({}).$type<Record<string, string>>(),
  compatibleBrands: jsonb("compatible_brands").default([]).$type<string[]>(),
  certifications: jsonb("certifications").default([]).$type<string[]>(),
  imageUrl: varchar("image_url", { length: 500 }),
  isFeatured: boolean("is_featured").notNull().default(false),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
