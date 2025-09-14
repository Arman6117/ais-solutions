"use client";
import { DummyModules } from "@/lib/types/types";
import { cn, getStatusColor } from "@/lib/utils";
import { BookOpen, Calendar, CalendarCheckIcon } from "lucide-react";
import Image from "next/image";
import React, {  useMemo } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import StudentModulesMeetingDialog from "./student-modules-meeting-dialog";
import { dummySessions } from "@/lib/static";

type StudentModulesCardProps = {
  module: DummyModules;
  status: "Ongoing" | "Upcoming" | "Completed";
};
const StudentModulesCard = ({ module, status }: StudentModulesCardProps) => {
  const bgStyle = useMemo(() => {
    return getStatusColor(module.status);
  }, [module.id,module.status]);

  //  console.log(bgStyle)
  return (
    <StudentModulesMeetingDialog session={dummySessions} status={module.status} >
      <div
        className={cn(
          "flex sm:flex-row flex-col rounded  cursor-pointer border-2 transition-all p-2 items-center sm:items-start sm:p-4 sm:gap-6",
          `hover:shadow-lg hover:shadow-primary-bg/10 hover:border-2 hover:border-primary-bg`,

          bgStyle.bg,
          bgStyle.border,
          bgStyle.text
        )}
      >
        <div className="bg-white rounded-lg size-20 p-1">
          <Image
            alt="course thumbnail"
            className="rounded-lg object-cover"
            src={"https://placehold.co/80x80"}
          //  fill
          width={80}
          height={0}
          //  sizes="10px"
          />
        </div>
        <div className="flex flex-col sm:gap-2">
          <h1 className="text-lg font-medium ">{module.name}</h1>

          <div className="flex gap-6 mt-2">
            <div className="flex gap-2 items-center text-neutral-600">
              <BookOpen className="size-4" />
              <span className="text-sm ">10 Chapter</span>
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
                <span className="text-sm ">20 June 2025</span>
              </div>
              <div className="flex gap-2 items-center text-neutral-600">
                <CalendarCheckIcon className="size-4" />
                <span className="text-sm font">20 July 2025</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentModulesMeetingDialog>
  );
};

export default StudentModulesCard;
