import React from "react";
import AllBatches from "./_components/all-batches";

const AllBatchesPage = () => {
  return (
    <main className="p-3 w-full">

    <div className="flex flex-col gap-10">
      <h1 className="text-5xl font-bold">All Batches</h1>
      <AllBatches />
    </div>
    </main>
  );
};

export default AllBatchesPage;
