"use client";
import React, { useEffect } from "react";
import { coursesData } from "@/lib/static";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import { useCourseStore } from "@/store/use-course-store";

const StudentCourseSelector = () => {
  const { selectedCourse, setSelectedCourse } = useCourseStore();
  const handleCourseChange = (courseName: string) => {
    const course = coursesData.find((c) => c.name === courseName);
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
    <Select value={selectedCourse?.name} onValueChange={handleCourseChange}>
      <SelectTrigger className="flex gap-2 w-64 text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <BookOpen className="size-4 text-primary-bg" />
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent>
        {coursesData.map((course) => (
          <SelectItem key={course.id} value={course.name}>
            {course.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StudentCourseSelector;
