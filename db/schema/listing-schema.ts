import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const listingTable = pgTable("listing", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
});

export type InsertListing = typeof listingTable.$inferInsert;
export type SelectListing = typeof listingTable.$inferSelect;