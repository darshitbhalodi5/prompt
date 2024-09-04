import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { exampleTable, listingTable } from "./schema";

config({ path: ".env.local" });

const schema = {
  exampleTable,
  listingTable
};

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });