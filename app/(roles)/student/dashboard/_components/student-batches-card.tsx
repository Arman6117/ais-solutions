import { DummyBatches } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BookOpen, Calendar, CalendarCheckIcon, Clock } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiChalkboardTeacher } from "react-icons/pi";

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
          "bg-green-200/70 shadow-lg hover:outline-green-500 hover:outline-2 hover:shadow-lg hover:shadow-green-200",
        status === "Upcoming" &&
          "bg-blue-200/70 hover:outline-blue-500 hover:outline-2 hover:shadow-lg hover:shadow-blue-200",
        status === "Completed" &&
          "bg-amber-200/70 hover:outline-amber-500 hover:outline-2 hover:shadow-lg hover:shadow-amber-200"
      )}
    >
      <div className="bg-soft-white rounded-lg size-20 p-1">
        <Image
          alt="course thumbnail"
          className="rounded-lg"
          src={"https://placehold.co/80x80"}
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">{batch.name}</h1>
        <div className="flex gap-2 items-center text-neutral-600">
          <Clock className="size-4" />
          <span className="text-sm font-medium">{batch.time}</span>
        </div>
        <div className="flex gap-6 mt-2">
          <div className="flex gap-2 items-center text-neutral-600">
            <BookOpen className="size-4" />
            <span className="text-sm font-medium">10 Modules</span>
          </div>
          <div className="flex gap-2 items-center text-neutral-600">
            <FaChalkboardTeacher className="size-4" />
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
        {status ==='Upcoming' && (

          <div className="flex gap-6 mt-2">
          <div className="flex gap-2 items-center text-neutral-600">
            <Calendar className="size-4" />
            <span className="text-sm font-medium">{batch.startDate}</span>
          </div>
          <div className="flex gap-2 items-center text-neutral-600">
            <CalendarCheckIcon className="size-4" />
            <span className="text-sm font-medium">{batch.endDate}</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default StudentBatchesCard;
