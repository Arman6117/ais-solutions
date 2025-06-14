'use client'
import React, { useMemo } from "react";

import {  BookOpen} from "lucide-react";

import { PiStudent } from "react-icons/pi";
import { useCourseStore } from "@/store/use-course-store";
import CourseDataSkeleton from "@/components/skeletons/course-data";

const StudentCourseDataCard = () => {
  const {selectedCourse} = useCourseStore()
  const completedModules = useMemo(()=> {
    return selectedCourse?.modules.length || 0;
  },[selectedCourse]);
  const completedLectures = useMemo(()=> {
    return selectedCourse?.modules.length || 0;
  },[selectedCourse]);
  return (
    <div className="flex flex-col  w-full items-center justify-between rounded-lg shadow-md  bg-white p-3 ">
     
     <React.Suspense fallback={<CourseDataSkeleton/>}>

      <div className="flex flex-col p-4 w-full  bg-soft-white">
        <div className="bg-white p-1 size-7 h-auto flex items-center  rounded-md ">
            <BookOpen className="text-primary-bg size-7"/>
        </div>
        <div className="flex flex-col">
            <h1 className="text-5xl text-primary-bg font-medium">{completedModules}</h1>
            <span className="text-neutral-600 text-sm">Modules Completed</span>
        </div>
      </div>
      
     </React.Suspense>
     <React.Suspense fallback={<CourseDataSkeleton/>}>
      <div className="flex flex-col p-4 w-full  bg-soft-white">
        <div className="bg-white p-1 size-7 h-auto flex items-center  rounded-md ">
            <PiStudent className="text-primary-bg size-7"/>
        </div>
        <div className="flex flex-col">
            <h1 className="text-5xl text-primary-bg font-medium">124</h1>
            <span className="text-neutral-600 text-sm">Lectures Completed</span>
        </div>
      </div>
     </React.Suspense>
    </div>
  );
};

export default StudentCourseDataCard;
