import { SelectListing } from "@/db/schema";

interface ListingCardProps {
  listing: SelectListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{listing.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{listing.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">${listing.price}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{listing.location}</span>
        </div>
      </div>
    </div>
  );
}