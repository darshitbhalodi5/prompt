"use client";

import { useState } from "react";
import CreateListingButton from "./CreateListingButton";

interface ListingSearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function ListingSearch({ onSearch }: ListingSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-grow mr-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search listings..."
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <CreateListingButton />
    </div>
  );
}