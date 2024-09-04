"use server";

import { eq, or, like } from "drizzle-orm";
import { db } from "../db";
import { InsertListing, SelectListing, listingTable } from "../schema";

export const createListing = async (data: InsertListing) => {
  try {
    const [newListing] = await db.insert(listingTable).values(data).returning();
    return newListing;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw new Error("Failed to create listing");
  }
};

export const getListingById = async (id: string) => {
  try {
    const listing = await db.query.listingTable.findFirst({
      where: eq(listingTable.id, id)
    });
    if (!listing) {
      throw new Error("Listing not found");
    }
    return listing;
  } catch (error) {
    console.error("Error getting listing by ID:", error);
    throw new Error("Failed to get listing");
  }
};

export const getAllListings = async (search?: string): Promise<SelectListing[]> => {
  let query = db.select().from(listingTable);

  if (search) {
    query = query.where(
      or(
        like(listingTable.title, `%${search}%`),
        like(listingTable.description, `%${search}%`),
        like(listingTable.location, `%${search}%`)
      )
    );
  }

  const results = await query;
  return results;
};

export const updateListing = async (id: string, data: Partial<InsertListing>) => {
  try {
    const [updatedListing] = await db.update(listingTable).set(data).where(eq(listingTable.id, id)).returning();
    return updatedListing;
  } catch (error) {
    console.error("Error updating listing:", error);
    throw new Error("Failed to update listing");
  }
};

export const deleteListing = async (id: string) => {
  try {
    await db.delete(listingTable).where(eq(listingTable.id, id));
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw new Error("Failed to delete listing");
  }
};