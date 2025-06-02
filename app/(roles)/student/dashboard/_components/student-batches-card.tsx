import { DummyBatches } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type StudentBatchesCardProps = {
  batch: DummyBatches;
  status: "Ongoing" | "Upcoming" | "Completed";
};
const StudentBatchesCard = ({ batch, status }: StudentBatchesCardProps) => {
  return (
    <div
      className={cn(
        "flex rounded transition-all p-4 gap-6",
        status === "Ongoing" &&
          "bg-green-200 hover:outline-green-500 hover:outline-2 hover:shadow-lg hover:shadow-green-200",
        status === "Upcoming" &&
          "bg-blue-200 hover:outline-blue-500 hover:outline-2 hover:shadow-lg hover:shadow-blue-200",
        status === "Completed" &&
          "bg-amber-200 hover:outline-amber-500 hover:outline-2 hover:shadow-lg hover:shadow-amber-200"
      )}
    >
      <div className="bg-soft-white rounded-lg size-20 p-1">
        <Image alt="course thumbnail" className="rounded-lg" src={'https://placehold.co/80x80'} width={80} height={80}/>
      </div>
      <div className="flex flex-col gap-4">batch</div>
    </div>
  );
};

export default StudentBatchesCard;
