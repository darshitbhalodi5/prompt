"use client";

import { useState, useEffect } from "react";
import { SelectListing } from "@/db/schema";
import ListingCard from "./ListingCard";
import ListingSearch from "./ListingSearch";

interface ListingListProps {
  initialListings: SelectListing[];
}

export default function ListingList({ initialListings }: ListingListProps) {
  const [listings, setListings] = useState(initialListings);
  const [filteredListings, setFilteredListings] = useState(initialListings);

  useEffect(() => {
    setListings(initialListings);
    setFilteredListings(initialListings);
  }, [initialListings]);

  const handleSearch = (searchTerm: string) => {
    const filtered = listings.filter((listing) =>
      Object.values(listing).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredListings(filtered);
  };

  return (
    <>
      <div className="w-2/3 mb-6">
        <ListingSearch onSearch={handleSearch} />
      </div>
      {filteredListings.length === 0 ? (
        <div className="text-center py-8 text-gray-600">No listings found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </>
  );
}