"use client";

import { useState } from "react";
import CreateListingModal from "./CreateListingModal";

export default function CreateListingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Create Listing
      </button>
      {isModalOpen && <CreateListingModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}