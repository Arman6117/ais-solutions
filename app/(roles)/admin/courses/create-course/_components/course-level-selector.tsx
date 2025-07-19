"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseLevel, Mode } from "@/lib/types";
import { useCreateCourseStore } from "@/store/use-create-course-store";
import React from "react";
import { MdClass } from "react-icons/md";

const CourseLevelSelector = () => {
  const { courseLevel, setBasicInfo } = useCreateCourseStore();
  return (
    <Select
      value={courseLevel}
      onValueChange={(val: CourseLevel) => setBasicInfo({ courseLevel: val })}
    >
      <SelectTrigger className="flex gap-2 ml-6  w-64 text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <MdClass className="size-4 text-primary-bg" />
        <SelectValue placeholder="Select Mode" />
      </SelectTrigger>
      <SelectContent className="w-64">
        <SelectItem value="beginner">Beginner</SelectItem>
        <SelectItem value="intermediate">Intermediate</SelectItem>
        <SelectItem value="advanced">Advanced</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CourseLevelSelector;
