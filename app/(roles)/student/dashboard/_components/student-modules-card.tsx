"use client";

import { cn, getStatusColor } from "@/lib/utils";
import { BookOpen, Calendar, CalendarCheckIcon } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import StudentModulesMeetingDialog from "./student-modules-meeting-dialog";
import { dummySessions } from "@/lib/static";
import { ModuleInfo } from "@/lib/types/student-dashboard.type";
import { formatDate } from "date-fns";

type StudentModulesCardProps = {
  module: ModuleInfo;
  status: "Ongoing" | "Upcoming" | "Completed";
};
const StudentModulesCard = ({ module, status }: StudentModulesCardProps) => {
  const bgStyle = useMemo(() => {
    return getStatusColor(module.status);
  }, [module.id, module.status]);



  return (
    <StudentModulesMeetingDialog session={dummySessions} status={module.status}>
      <div
        className={cn(
          "flex sm:flex-row flex-col rounded cursor-pointer border-2 transition-all p-2 items-center sm:items-start sm:p-4 sm:gap-6",
          `hover:shadow-lg hover:shadow-primary-bg/10 hover:border-2 hover:border-primary-bg`,
          bgStyle.bg,
          bgStyle.border,
          bgStyle.text
        )}
      >
        {/* Fixed thumbnail container */}
        <div className="relative size-20 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
          <Image
            alt="course thumbnail"
            className="object-cover"
            src={
              module.thumbnail ? module.thumbnail : "https://placehold.co/80x80"
            }
            fill
            sizes="80px"
          />
        </div>
        
        <div className="flex flex-col sm:gap-2 flex-1">
          <h1 className="text-lg font-medium">{module.name}</h1>

          <div className="flex gap-6 mt-2">
            <div className="flex gap-2 items-center text-neutral-600">
              <BookOpen className="size-4" />
              <span className="text-sm">{module.noOfChap} Chapters</span>
            </div>
            <div className="flex gap-2 items-center text-neutral-600">
              <FaChalkboardTeacher className="size-4" />
              <span className="text-sm">
                {module.instructor?.length === 0 || !module.instructor
                  ? "No instructors assigned"
                  : module.instructor.toString()}
              </span>
            </div>
          </div>
          
          {status === "Upcoming" && module.startDate && module.endDate && (
            <div className="flex gap-6 mt-2">
              <div className="flex gap-2 items-center text-neutral-600">
                <Calendar className="size-4" />
                <span className="text-sm">
                  {formatDate(new Date(module.startDate), "PP")}
                </span>
              </div>
              <div className="flex gap-2 items-center text-neutral-600">
                <CalendarCheckIcon className="size-4" />
                <span className="text-sm">
                  {formatDate(new Date(module.endDate), "PP")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentModulesMeetingDialog>
  );
};

export default StudentModulesCard;