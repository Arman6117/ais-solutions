"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import { useCourseStore } from "@/store/use-course-store";
import { StudentCourse } from "@/lib/types/course.type";
import { RiLoader2Line } from "react-icons/ri";

type StudentCourseSelectorProps = {
  courses: StudentCourse[];
};

const StudentCourseSelector = ({ courses }: StudentCourseSelectorProps) => {
  const { selectedCourse, setSelectedCourse } = useCourseStore();
  const [coursesData, setCoursesData] = useState<StudentCourse[]>(courses);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setCoursesData(courses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCourseChange = (courseName: string) => {
    const course = coursesData.find((c) => c.courseName === courseName);
    if (course) {
      setSelectedCourse(course);
    }
  };

  // ✅ Fix: select the first course as default when data is ready
  useEffect(() => {
    if (!selectedCourse && coursesData.length > 0) {
      setSelectedCourse(coursesData[0]);
    }
  }, [selectedCourse, coursesData, setSelectedCourse]);

  if (loading) {
    return <RiLoader2Line className="animate-spin text-primary-bg " />;
  }

  return (
    <Select
      value={selectedCourse?.courseName}
      onValueChange={handleCourseChange}
    >
      <SelectTrigger className="flex  gap-2 sm:w-64 w-64 text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
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
