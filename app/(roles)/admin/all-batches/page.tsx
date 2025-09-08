import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllBatches } from "@/actions/admin/batches/get-all-batches";
import AllBatches from "./_components/all-batches";

export const revalidate = 60;
const AllBatchesPage = async() => {
  const res = await getAllBatches()
  
  return (
    <main className="p-3 w-full">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <h1 className="text-5xl font-bold">All Batches</h1>
          <Button
            asChild
            size="sm"
            className="flex items-center gap-1 cursor-pointer bg-primary-bg hover:bg-primary-bg/90"
          >
            <Link href={`/admin/all-batches/create-batch`}>
              <Plus size={16} /> Add Batch
            </Link>
          </Button>
        </div>
        <AllBatches data = {res.data} />
      </div>
    </main>
  );
};

export default AllBatchesPage;
