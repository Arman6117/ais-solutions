import React from "react";

import { BookOpen } from "lucide-react";

import { PiStudent } from "react-icons/pi";
import CourseDataSkeleton from "@/components/skeletons/course-data";
import { ModuleInfo } from "@/lib/types/student-dashboard.type";

type StudentCourseDataCardProps = {
  module:ModuleInfo[]
  lectureCompleted:number
}
export const revalidate = 60;
const StudentCourseDataCard = ({ module ,lectureCompleted}: StudentCourseDataCardProps) => {
  const completedModule = module.filter(
    (mod) => mod.status === "Completed"
  ).length;
  return (
    <div className="w-[250px] sm:w-[400px] md:w-fit sm:mx-auto">
      <div className="flex flex-col  w-full items-center justify-between rounded-lg shadow-md  bg-white p-3 ">
        <React.Suspense fallback={<CourseDataSkeleton />}>
          <div className="flex flex-col p-4 w-full  bg-soft-white">
            <div className="bg-white p-1 size-7 h-auto flex items-center  rounded-md ">
              <BookOpen className="text-primary-bg size-7" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-5xl text-primary-bg font-medium">
                {completedModule}
              </h1>
              <span className="text-neutral-600 text-sm">
                Modules Completed
              </span>
            </div>
          </div>
        </React.Suspense>
        <React.Suspense fallback={<CourseDataSkeleton />}>
          <div className="flex flex-col h-auto p-4 w-full  bg-soft-white">
            <div className="bg-white p-1 size-7 h-auto flex items-center  rounded-md ">
              <PiStudent className="text-primary-bg size-7" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-5xl text-primary-bg font-medium">{lectureCompleted}</h1>
              <span className="text-neutral-600 text-sm">
                Lectures Completed
              </span>
            </div>
          </div>
        </React.Suspense>
      </div>
    </div>
  );
};

export default StudentCourseDataCard;
