import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const distributorsTable = pgTable("distributors", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 200 }).notNull(),
  contactName: varchar("contact_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  country: varchar("country", { length: 50 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  businessType: varchar("business_type", { length: 50 }).notNull(),
  estimatedMonthlyVolume: varchar("estimated_monthly_volume", { length: 50 }).notNull(),
  taxId: varchar("tax_id", { length: 100 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDistributorSchema = createInsertSchema(distributorsTable).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertDistributor = z.infer<typeof insertDistributorSchema>;
export type Distributor = typeof distributorsTable.$inferSelect;
