// eslint-disable-next-line import/no-unresolved
import "server-only";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL!;

const sql = postgres(connectionString, { max: 10 });

export const db = drizzle(sql);
