"use client";
import React from "react";
import { ongoingCourses } from "@/lib/static";

const CourseCards = () => {
  return (
    <div className="mt-10 flex flex-col gap-4">
      {ongoingCourses.map((course, i) => (
        <div
          key={i}
          className="w-full h-auto p-4 bg-white border-violet-300 border rounded-lg cursor-pointer flex flex-col  hover:bg-violet-50  justify-center gap-4 hover:shadow-sm transition-all duration-200 group"
          onClick={() => {}}
        >
          <div className="flex gap-3">
            <div className="w-1 h-8 rounded-3xl bg-primary-bg"></div>
            <h1 className="text-lg font-semibold text-violet-950  group-hover:underline ">
              {course.courseName}
            </h1>
          </div>
          <div className="flex justify-between items-center max-w-[90%]">
            <div className="flex flex-col ">
              <span className="text-neutral-600 text-xs font-medium">
                Batch
              </span>
              <span className="text-neutral-900 font-medium">
                {course.batchName}
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
          <div className="flex justify-between max-w-[9 items-center">
            <div className="flex flex-col">
              <span className="text-neutral-600 text-xs font-medium">
                Lecture
              </span>
              <span className="text-neutral-900 font-medium">
                {course.lectureNumber}
              </span>
            </div>
            <div className="flex flex-col items-center ">
              <span className="text-neutral-600 text-xs font-medium">
                Instructor
              </span>
              <span className="text-neutral-900 text-sm font-medium">
                {course.instructor}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCards;
