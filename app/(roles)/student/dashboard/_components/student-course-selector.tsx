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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type StudentCourseSelectorProps = {
  courses: StudentCourse[];
};

const StudentCourseSelector = ({ courses }: StudentCourseSelectorProps) => {
  const { selectedCourse, setSelectedCourse } = useCourseStore();
  const [coursesData, setCoursesData] = useState<StudentCourse[]>(courses);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("courseId", course._id!);
      router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    
    const courseIdFromParams = searchParams.get("courseId");
    console.log(courseIdFromParams)

    if (!courseIdFromParams && !selectedCourse?._id) {
     
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("courseId", coursesData[0]._id);
      router.replace(`${pathname}?${currentParams.toString()}`, {
        scroll: false,
      });
    }

    // 4. Also, sync your Zustand store with the definitive ID from the server/URL
    const currentCourse = courses.find((c) => c._id === selectedCourse?._id);
    if (currentCourse) {
      setSelectedCourse(currentCourse);
    }
  }, [
    selectedCourse,
    courses,
    searchParams,
    pathname,
    router,
    setSelectedCourse,
  ]);

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
