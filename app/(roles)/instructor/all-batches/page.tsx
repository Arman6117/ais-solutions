import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllBatches } from "@/actions/admin/batches/get-all-batches";
import InstructorAllBatches from "./_components/instructor-all-batches";

export const revalidate = 60;
const InstructorsAllBatchesPage = async () => {
  const res = await getAllBatches();

  return (
    <main className="p-3 w-full">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <h1 className="text-5xl font-bold">All Batches</h1>
          <Button
            asChild
            size="sm"
            className="flex  items-center gap-1 cursor-pointer bg-primary-bg hover:bg-primary-bg/90"
          >
            <Link href={`/instructor/all-batches/create-batch`}>
              <Plus size={16} /> Add Batch
            </Link>
          </Button>
        </div>
        <InstructorAllBatches data={res.data} />
      </div>
    </main>
  );
};

export default InstructorsAllBatchesPage;
