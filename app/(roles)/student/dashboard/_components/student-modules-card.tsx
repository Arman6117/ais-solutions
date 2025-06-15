'use client'
import { DummyModules } from "@/lib/types";
import { cn, generateReadableLightColor, getLevelColor, getStatusColor } from "@/lib/utils";
import { BookOpen, Calendar, CalendarCheckIcon, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

type StudentModulesCardProps = {
  module: DummyModules;
  status: "Ongoing" | "Upcoming" | "Completed";
};
const StudentModulesCard = ({ module, status }: StudentModulesCardProps) => {

   const bgStyle = useMemo(()=> {
    return getStatusColor(module.status)
   },[module.id])

  //  console.log(bgStyle)
  return (
    <Link
      href={`/student/module-details/${module.id}`}
      className={cn(
        "flex rounded cursor-pointer border-2 transition-all p-4 gap-6",
        `hover:shadow-lg hover:shadow-primary-bg/10 hover:border-2 hover:border-primary-bg`,
      
      bgStyle.bg ,bgStyle.border,bgStyle.text)}
    
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
    </Link>
  );
};

export default StudentModulesCard;
