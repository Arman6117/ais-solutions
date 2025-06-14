"use client";
import BatchNameSkeleton from "@/components/skeletons/batch-name";
import { coursesData } from "@/lib/static";
import { useCourseStore } from "@/store/use-course-store";
import React, { useMemo } from "react";
import { FaSchool } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const StudentBatchName = () => {
    const { selectedCourse } = useCourseStore();

    const batchName = useMemo(() => {
      if (!selectedCourse) return null;
      return coursesData.find((course) => course.id === selectedCourse.id)
        ?.batchesName[0] || null;
    }, [selectedCourse]);
  
    if (!batchName) return null;
  return (
    <React.Suspense fallback={<BatchNameSkeleton/>}>
        <div className="flex gap-3">

      <div className="flex gap-1 items-center ">
        <FaSchool className="text-neutral-500 size-[14px]" />
        <span className="text-sm mt-0.5 text-neutral-500">{batchName}</span>
      </div>
      <div className="flex gap-1 items-center ">
        <MdAlternateEmail className="text-neutral-500 size-[14px]" />
        <span className="text-sm mt-0.5 text-neutral-500">20 June 2025</span>
      </div>
        </div>
    </React.Suspense>
  );
};

export default StudentBatchName;
