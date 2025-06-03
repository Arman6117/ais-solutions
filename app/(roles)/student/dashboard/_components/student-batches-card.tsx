'use client'
import { DummyBatches } from "@/lib/types";
import { cn, generateReadableLightColor } from "@/lib/utils";
import { BookOpen, Calendar, CalendarCheckIcon, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

type StudentBatchesCardProps = {
  batch: DummyBatches;
  status: "Ongoing" | "Upcoming" | "Completed";
};
const StudentBatchesCard = ({ batch, status }: StudentBatchesCardProps) => {

  const [bgColor, setBgColor] = useState("#ffffff"); // default safe color

  useEffect(() => {
    // run only on client after hydration
    setBgColor(generateReadableLightColor());
  }, [batch.id]);
  return (
    <Link
      href={`/student/batch-details/${batch.id}`}
      className={cn(
        "flex rounded cursor-pointer transition-all p-4 gap-6",
        `hover:shadow-lg hover:shadow-primary-bg/10 hover:border-2 hover:border-primary-bg`,
      
      )}
      style={{ backgroundColor:  bgColor ,}}
    >
      <div className="bg-white rounded-lg size-20 p-1">
        <Image
          alt="course thumbnail"
          className="rounded-lg"
          src={"https://placehold.co/80x80"}
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-medium ">{batch.name}</h1>
        <div className="flex gap-2 items-center text-neutral-600">
          <Clock className="size-4" />
          <span className="text-sm ">{batch.time}</span>
        </div>
        <div className="flex gap-6 mt-2">
          <div className="flex gap-2 items-center text-neutral-600">
            <BookOpen className="size-4" />
            <span className="text-sm ">10 Modules</span>
          </div>
          <div className="flex gap-2 items-center text-neutral-600">
            <FaChalkboardTeacher className="size-4" />
            <span className="text-sm ">John Doe</span>
          </div>
        </div>
        {status === "Upcoming" && (
          <div className="flex gap-6 mt-2">
            <div className="flex gap-2 items-center text-neutral-600">
              <Calendar className="size-4" />
              <span className="text-sm ">{batch.startDate}</span>
            </div>
            <div className="flex gap-2 items-center text-neutral-600">
              <CalendarCheckIcon className="size-4" />
              <span className="text-sm font">{batch.endDate}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default StudentBatchesCard;
