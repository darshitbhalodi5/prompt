"use server";

import { createListing, deleteListing, getAllListings, getListingById, updateListing } from "@/db/queries/listing-queries";
import { InsertListing } from "@/db/schema";
import { ActionState } from "@/types";
import { revalidatePath } from "next/cache";

export async function createListingAction(data: InsertListing): Promise<ActionState> {
  try {
    const newListing = await createListing(data);
    revalidatePath("/listings");
    return { status: "success", message: "Listing created successfully", data: newListing };
  } catch (error) {
    return { status: "error", message: "Failed to create listing" };
  }
}

export async function getListingByIdAction(id: string): Promise<ActionState> {
  try {
    const listing = await getListingById(id);
    return { status: "success", message: "Listing retrieved successfully", data: listing };
  } catch (error) {
    return { status: "error", message: "Failed to get listing" };
  }
}

export async function getAllListingsAction(search?: string): Promise<ActionState> {
  try {
    const listings = await getAllListings(search);
    return { status: "success", message: "Listings retrieved successfully", data: listings };
  } catch (error) {
    return { status: "error", message: "Failed to get listings" };
  }
}

export async function updateListingAction(id: string, data: Partial<InsertListing>): Promise<ActionState> {
  try {
    const updatedListing = await updateListing(id, data);
    revalidatePath("/listings");
    return { status: "success", message: "Listing updated successfully", data: updatedListing };
  } catch (error) {
    return { status: "error", message: "Failed to update listing" };
  }
}

export async function deleteListingAction(id: string): Promise<ActionState> {
  try {
    await deleteListing(id);
    revalidatePath("/listings");
    return { status: "success", message: "Listing deleted successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to delete listing" };
  }
}