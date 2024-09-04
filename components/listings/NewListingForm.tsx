"use client";

import { useState } from "react";
import { createListingAction } from "@/actions/listing-actions";
import { InsertListing } from "@/db/schema";

export default function NewListingForm() {
  const [formData, setFormData] = useState<InsertListing>({
    title: "",
    description: "",
    price: 0,
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createListingAction(formData);
      setFormData({ title: "", description: "", price: 0, location: "" });
      // Optionally, you can add a success message or redirect here
    } catch (error) {
      console.error("Error creating listing:", error);
      // Optionally, you can add an error message here
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "price" ? parseInt(value) : value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="location" className="block mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg text-black"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Create Listing
      </button>
    </form>
  );
}