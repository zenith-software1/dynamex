import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

export const isMemoryMode = !process.env.DATABASE_URL;

export const pool = isMemoryMode
  ? null
  : new Pool({ connectionString: process.env.DATABASE_URL });

export const db = isMemoryMode
  ? (null as unknown as ReturnType<typeof drizzle<typeof schema>>)
  : drizzle(pool!, { schema });

export * from "./schema";
export * from "./queries";
export { ensureSeeded } from "./bootstrap";
