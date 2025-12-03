"use client";

import { cn, getStatusColor } from "@/lib/utils";
import { BookOpen, Calendar, CalendarCheck, ChevronRight, Lock } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import StudentModulesMeetingDialog from "./student-modules-meeting-dialog";
import { ModuleInfo } from "@/lib/types/student-dashboard.type";
import { formatDate, isValid } from "date-fns";
import { Badge } from "@/components/ui/badge";

type StudentModulesCardProps = {
  module: ModuleInfo;
  status: "Ongoing" | "Upcoming" | "Completed";
};

const StudentModulesCard = ({ module, status }: StudentModulesCardProps) => {
  // Determine access: default to true if field is missing
  const hasAccess = module.isPurchased !== false;
  
  // NEW: Define interaction logic. 
  // User can only click if they have access AND the module is not "Upcoming".
  const isInteractive = hasAccess && status !== "Upcoming";

  const statusStyle = useMemo(() => {
    return getStatusColor(module.status);
  }, [module.status]);

  const hasInstructors = useMemo(() => {
    return (
      module.instructor &&
      module.instructor.length > 0 &&
      module.instructor[0] !== ""
    );
  }, [module.instructor]);

  const instructorText = useMemo(() => {
    if (!hasInstructors) return "No instructor";
    if (module.instructor!.length > 1) {
      return `${module.instructor![0]} +${module.instructor!.length - 1}`;
    }
    return module.instructor![0];
  }, [hasInstructors, module.instructor]);

  const showDateRange = useMemo(() => {
    return status === "Upcoming" && module.startDate && module.endDate;
  }, [status, module.startDate, module.endDate]);

  const formatSafeDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isValid(date)) {
        return formatDate(date, "MMM dd");
      }
      return null;
    } catch (error) {
      console.error("Invalid date:", dateString, error);
      return null;
    }
  };

  const formattedStartDate = useMemo(() => {
    return formatSafeDate(module.startDate);
  }, [module.startDate]);

  const formattedEndDate = useMemo(() => {
    return formatSafeDate(module.endDate);
  }, [module.endDate]);

  const cardContent = (
    <div
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200",
        // UPDATED: Use isInteractive for hover states
        isInteractive 
          ? "cursor-pointer hover:shadow-lg hover:border-primary-bg bg-white" 
          : "cursor-not-allowed opacity-80 bg-gray-50 border-gray-200",
        hasAccess && statusStyle.border,
        // Keep specific opacity for upcoming to differentiate from locked
        status === "Upcoming" && "opacity-70 bg-gray-50/50" 
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
        <Image
          alt={`${module.name} thumbnail`}
          className={cn(
            "object-cover transition-transform duration-300",
            isInteractive && "group-hover:scale-105", // Only scale if interactive
            !hasAccess && "grayscale"
          )}
          src={module.thumbnail || "https://placehold.co/80x80"}
          fill
          sizes="80px"
        />
        {/* Status Dot / Lock Icon */}
        <div className="absolute top-1 right-1">
          {hasAccess ? (
            <span
              className={cn(
                "w-3 h-3 rounded-full shadow-md block",
                statusStyle.dot
              )}
            />
          ) : (
             <div className="bg-black/60 p-1 rounded-full">
                <Lock className="w-3 h-3 text-white" />
             </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn(
            "font-semibold text-base sm:text-lg line-clamp-1 transition-colors",
            isInteractive ? "text-gray-800 group-hover:text-primary-bg" : "text-gray-500"
          )}>
            {module.name}
          </h3>
          <div className="flex flex-col items-end gap-1">
             <span
               className={cn(
                 "px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0",
                 hasAccess ? cn(statusStyle.bg, statusStyle.text) : "bg-gray-200 text-gray-600"
               )}
             >
               {status}
             </span>
             {!hasAccess && (
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-orange-300 text-orange-600 bg-orange-50">
                   Locked
                </Badge>
             )}
          </div>
        </div>

        {/* Info Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <BookOpen className={cn("w-4 h-4", hasAccess ? "text-violet-600" : "text-gray-400")} />
            <span>{module.noOfChap} Ch</span>
          </div>
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <FaChalkboardTeacher className={cn("w-4 h-4 flex-shrink-0", hasAccess ? "text-orange-600" : "text-gray-400")} />
            <span className="truncate" title={instructorText}>
              {instructorText}
            </span>
          </div>
        </div>

        {/* Date Range (Upcoming only) */}
        {showDateRange && formattedStartDate && formattedEndDate && (
          <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{formattedStartDate}</span>
            </div>
            <span className="text-gray-400">→</span>
            <div className="flex items-center gap-1">
              <CalendarCheck className="w-3.5 h-3.5 text-green-600" />
              <span>{formattedEndDate}</span>
            </div>
          </div>
        )}
      </div>

      {isInteractive && (
        <ChevronRight
          className="w-5 h-5 text-gray-400 group-hover:text-primary-bg group-hover:translate-x-1 transition-all flex-shrink-0"
        />
      )}
    </div>
  );

  // UPDATED LOGIC: Only wrap in dialog if interactive
  if (isInteractive) {
    return (
      <StudentModulesMeetingDialog
        moduleName={module.name}
        batchId={module.batchId}
        status={module.status}
      >
        {cardContent}
      </StudentModulesMeetingDialog>
    );
  }

  return cardContent;
};

export default StudentModulesCard;
