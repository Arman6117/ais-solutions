"use client";

import React, { useEffect, useRef } from "react";
import { ongoingCourses } from "@/lib/static";
import Link from "next/link";

const CourseCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1;
    const scrollDelay = 30;

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight
        ) {
          scrollContainer.scrollTop = 0; // Reset to top
        } else {
          scrollContainer.scrollTop += scrollStep;
        }
      }, scrollDelay);
    };

    const stopAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    startAutoScroll();

    scrollContainer.addEventListener("mouseenter", stopAutoScroll);
    scrollContainer.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      scrollContainer.removeEventListener("mouseenter", stopAutoScroll);
      scrollContainer.removeEventListener("mouseleave", startAutoScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-10 flex flex-col gap-4 max-h-[550px] overflow-y-auto no-scrollbar"
    >
      {ongoingCourses.map((course, i) => (
        <Link
          href={`/admin/all-batches/batch-details/${course.id}`}
          key={i}
          className="w-full h-auto p-4 bg-white border-violet-300 border rounded-lg cursor-pointer flex flex-col hover:bg-violet-50 justify-center gap-4 hover:shadow-sm transition-all duration-200 group"
          onClick={() => {}}
        >
          <div className="flex gap-3">
            <div className="w-1 h-8 rounded-3xl bg-primary-bg"></div>
            <h1 className="text-lg font-semibold text-violet-950 group-hover:underline">
              {course.batchName}
            </h1>
          </div>
          <div className="flex justify-between items-center max-w-[90%]">
            <div className="flex flex-col">
              <span className="text-neutral-600 text-xs font-medium">
                Course
              </span>
              <span className="text-neutral-900 font-medium">
                {course.courseName}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-600 text-xs font-medium">
                Module
              </span>
              <span className="text-neutral-900 font-medium">
                {course.module}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center max-w-[90%]">
            <div className="flex flex-col">
              <span className="text-neutral-600 text-xs font-medium">
                Lecture
              </span>
              <span className="text-neutral-900 font-medium">
                {course.lectureNumber}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-neutral-600 text-xs font-medium">
                Instructor
              </span>
              <div className="flex flex-col items-center">
                <span className="text-neutral-900 flex flex-col text-sm font-medium">
                  {course.instructor}
                </span>
                <span className="text-neutral-900 flex flex-col text-sm font-medium">
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CourseCards;
