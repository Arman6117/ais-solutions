// import React from 'react'
// import CourseCards from './course-cards'

// const OngoingCourses = () => {
//   return (
//     <div className=" w-full   overflow-y-scroll no-scrollbar  rounded-4xl px-4 py-4 bg-white">
//         <h1 className='text-xl font-bold'>Ongoing Batches</h1>
//         <div className='flex flex-col '>
//           {/* //TODO:Add auto scroll */}
//             <CourseCards/>
//         </div>
//     </div>
//   )
// }

// export default OngoingCourses
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { BatchModules } from "@/lib/types/types";

type PopulatedBatch = {
  _id: string;
  name: string;
  courseId?: {_id:string, courseName: string };
  students: string[];
  modules: BatchModules[];
  status: string;
};

const OngoingCourses = ({ batches }: { batches: PopulatedBatch[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto Scroll Logic
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer || batches.length <= 3) return; // Don't scroll if few items

    const scrollStep = 1;
    const scrollDelay = 30;

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight
        ) {
          scrollContainer.scrollTop = 0;
        } else {
          scrollContainer.scrollTop += scrollStep;
        }
      }, scrollDelay);
    };

    const stopAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    startAutoScroll();
    scrollContainer.addEventListener("mouseenter", stopAutoScroll);
    scrollContainer.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      scrollContainer.removeEventListener("mouseenter", stopAutoScroll);
      scrollContainer.removeEventListener("mouseleave", startAutoScroll);
    };
  }, [batches.length]);

  return (
    <div className="w-full flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4 text-violet-950">Ongoing Batches</h3>

      <div
        ref={containerRef}
        className="flex flex-col gap-4 max-h-[500px] overflow-y-auto no-scrollbar"
      >
        {batches.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No ongoing batches found.</p>
        )}
        
        {batches.map((batch, i) => (
          <Link
            href={`/admin/all-batches/${batch.courseId?._id}/${batch._id}/batch-details`}
            key={batch._id || i}
            className="w-full h-auto p-4 bg-white border-violet-300 border rounded-lg cursor-pointer flex flex-col hover:bg-violet-50 justify-center gap-4 hover:shadow-sm transition-all duration-200 group shrink-0"
          >
            <div className="flex gap-3">
              <div className="w-1 h-8 rounded-3xl bg-primary-bg"></div>
              <h1 className="text-lg font-semibold text-violet-950 group-hover:underline line-clamp-1">
                {batch.name}
              </h1>
            </div>
            <div className="flex justify-between items-center max-w-[90%]">
              <div className="flex flex-col">
                <span className="text-neutral-600 text-xs font-medium">Course</span>
                <span className="text-neutral-900 font-medium text-sm">
                  {batch.courseId?.courseName || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-neutral-600 text-xs font-medium">Students</span>
                <span className="text-neutral-900 font-medium text-sm">
                  {batch.students?.length || 0}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center max-w-[90%]">
               <div className="flex flex-col">
                 <span className="text-neutral-600 text-xs font-medium">Modules</span>
                 <span className="text-neutral-900 font-medium text-sm">{batch.modules?.length || 0}</span>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OngoingCourses;
