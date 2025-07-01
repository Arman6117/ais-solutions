import React from "react";
import AllBatches from "./_components/all-batches";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const AllBatchesPage = () => {
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
            <Link href={`/admin/courses/create-batch`}>
              <Plus size={16} /> Add Batch
            </Link>
          </Button>
        </div>
        <AllBatches />
      </div>
    </main>
  );
};

export default AllBatchesPage;
