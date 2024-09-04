import { Suspense } from 'react';
import { getAllListingsAction } from "@/actions/listing-actions";
import ListingList from "@/components/listings/ListingList";
// import CreateListingButton from "@/components/listings/CreateListingButton";

export default async function ListingsPage() {
  const { data: initialListings } = await getAllListingsAction();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Listings</h1>
      <div className="flex justify-between items-center mb-8">
        <div className="w-2/3">
          {/* ListingSearch will be rendered inside ListingList */}
        </div>
        {/* <div className="w-1/3 flex justify-end">
          <CreateListingButton />
        </div> */}
      </div>
      <Suspense fallback={<div className="text-center">Loading listings...</div>}>
        <ListingList initialListings={initialListings} />
      </Suspense>
    </div>
  );
}