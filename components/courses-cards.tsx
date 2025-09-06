"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import { Course } from "@/lib/types/types";
import CourseCard from "./course-card";

type CourseType = {
  id: string;
  title: string;
  duration: string;
  students: number;
  mode: "Online" | "Offline" | "Hybrid";
  location?: string;
  startDate: string;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
};

const dummyCourses: CourseType[] = [
  {
    id: "course-1",
    title: "Web Development Fundamentals",
    duration: "3 Months",
    students: 26,
    mode: "Online",
    startDate: "June 1, 2025",
    rating: 4.7,
    level: "Beginner",
    instructor: "Dr. Sarah Johnson",
  },
  {
    id: "course-2",
    title: "Advanced Data Science",
    duration: "4 Months",
    students: 18,
    mode: "Hybrid",
    location: "Tech Campus, Building B",
    startDate: "July 15, 2025",
    rating: 4.9,
    level: "Advanced",
    instructor: "Prof. Michael Chen",
  },
  {
    id: "course-3",
    title: "UX/UI Design Workshop",
    duration: "2 Months",
    students: 32,
    mode: "Offline",
    location: "Design Studio, Floor 3",
    startDate: "May 30, 2025",
    rating: 4.5,
    level: "Intermediate",
    instructor: "Emma Rodriguez",
  },
  {
    id: "course-4",
    title: "Mobile App Development",
    duration: "3 Months",
    students: 24,
    mode: "Online",
    startDate: "June 15, 2025",
    rating: 4.3,
    level: "Intermediate",
    instructor: "David Wilson",
  },
  {
    id: "course-5",
    title: "Cybersecurity Essentials",
    duration: "2.5 Months",
    students: 28,
    mode: "Hybrid",
    location: "Security Lab, East Building",
    startDate: "July 5, 2025",
    rating: 4.8,
    level: "Beginner",
    instructor: "Dr. Linda Garcia",
  },
];

// Determine chunk size based on screen width
const useChunkSize = () => {
  const [chunkSize, setChunkSize] = useState(getInitialChunkSize());

  function getInitialChunkSize() {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 1;
    if (width < 1280) return 2;
    return 2;
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setChunkSize(1);
      else if (width < 1024) setChunkSize(1);
      else if (width < 1280) setChunkSize(2);
      else setChunkSize(2);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return chunkSize;
};

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

type CoursesCardsProps = {
  courses?: Course[];
  mode: "view" | "edit";
  label: string | undefined;
};

const CoursesCards = ({  label }: CoursesCardsProps) => {
  const [search, setSearch] = useState("");
  const chunkSize = useChunkSize();

  const filteredCourses = dummyCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );
  const chunkedCourses = chunkArray(filteredCourses, chunkSize);

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      {label && (
        <div className="flex justify-between px-3 w-full sm:px-5 py-3 sm:py-5 rounded-lg items-center bg-primary-bg text-white">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 flex items-center">
              <div className="w-1 h-5 sm:h-6 bg-white rounded-full mr-2"></div>
              <BookOpen className="mr-2" size={24} />
              {label}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              The following courses include this module
            </p>
          </div>
         
        </div>
      )}

      {/* Search Input */}
      <Input
        placeholder="Search by course name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-64 focus-visible:ring-0 border focus:border-violet-400"
      />

      {/* Responsive Display: Carousel for large, Scrollable list for small */}
      {chunkSize > 1 ? (
        <div className="mt-4 sm:mt-8 w-full relative">
          <Carousel className="w-full">
            <CarouselContent className="w-full">
              {chunkedCourses.length > 0 ? (
                chunkedCourses.map((courseChunk, chunkIndex) => (
                  <CarouselItem
                    key={chunkIndex}
                    className="flex justify-center"
                  >
                    <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 lg:gap-10 justify-center sm:justify-around items-center px-12">
                      {courseChunk.map((course, index) => (
                        <div key={index} className="w-full sm:max-w-xs">
                          <CourseCard course={course} />
                        </div>
                      ))}
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="text-gray-500 p-4 text-center w-full">
                    No courses found.
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 ml-0 sm:ml-2 rounded-lg cursor-pointer hover:border-violet-300 hover:bg-violet-50" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 mr-0 sm:mr-2 rounded-lg cursor-pointer hover:border-violet-300 hover:bg-violet-50" />
          </Carousel>
        </div>
      ) : (
        <div className="flex flex-col gap-7 max-h-[450px] overflow-y-auto py-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="w-full">
                <CourseCard course={course} />
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">No courses found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesCards;
