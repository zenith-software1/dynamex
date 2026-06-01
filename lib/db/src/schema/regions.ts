import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const regionsTable = pgTable("regions", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 30 }),
  distributionTime: varchar("distribution_time", { length: 100 }),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertRegionSchema = createInsertSchema(regionsTable).omit({ id: true });

export type InsertRegion = z.infer<typeof insertRegionSchema>;
export type Region = typeof regionsTable.$inferSelect;
