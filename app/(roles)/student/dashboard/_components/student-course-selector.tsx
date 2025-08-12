"use client";
import React, { useEffect, useState } from "react";
// import { coursesData } from "@/lib/static";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import { useCourseStore } from "@/store/use-course-store";
import { CourseSelector } from "@/lib/types/course.type";
import { getCourses } from "@/actions/shared/get-course";

const StudentCourseSelector = () => {
  const { selectedCourse, setSelectedCourse } = useCourseStore();
  const [coursesData,setCoursesData]= useState<CourseSelector[] |[]>([]);
  const fetchCourses = async () => {
    try{
      const data = await getCourses();
      setCoursesData(data);
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    fetchCourses()
  },[])
  const handleCourseChange = (courseName: string) => {
    const course = coursesData.find((c) => c.courseName === courseName);
    if (course) {
      setSelectedCourse(course);
    }
  };

  useEffect(() => {
    if (selectedCourse) return;
    const defaultCourse = coursesData[0];
    setSelectedCourse(defaultCourse);
  }, [selectedCourse, setSelectedCourse]);
  return (
    <Select value={selectedCourse?.courseName} onValueChange={handleCourseChange}>
      <SelectTrigger className="flex gap-2 w-64 text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <BookOpen className="size-4 text-primary-bg" />
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent>
        {coursesData.map((course) => (
          <SelectItem key={course._id} value={course.courseName}>
            {course.courseName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StudentCourseSelector;
