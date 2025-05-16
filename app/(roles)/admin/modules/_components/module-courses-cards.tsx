"use client";
import React, { useState } from "react";
import ModuleCourseCard from "./module-course-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";


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
    instructor: "Dr. Sarah Johnson"
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
    instructor: "Prof. Michael Chen"
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
    instructor: "Emma Rodriguez"
  },
  {
    id: "course-4",
    title: "UX/UI Design Workshop",
    duration: "2 Months",
    students: 32,
    mode: "Offline",
    location: "Design Studio, Floor 3",
    startDate: "May 30, 2025",
    rating: 4.5,
    level: "Intermediate",
    instructor: "Emma Rodriguez"
  },
  {
    id: "course-5",
    title: "UX/UI Design Workshop",
    duration: "2 Months",
    students: 32,
    mode: "Offline",
    location: "Design Studio, Floor 3",
    startDate: "May 30, 2025",
    rating: 4.5,
    level: "Intermediate",
    instructor: "Emma Rodriguez"
  }
];

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

type ModuleCoursesCardsProps = {
  courses: string[];
};

const ModuleCoursesCards = ({ courses }: ModuleCoursesCardsProps) => {
  const [search, setSearch] = useState("");

  const filteredCourses = dummyCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );


  const chunkedCourses = chunkArray(filteredCourses, 2);

  return (
    <div className="w-full flex  flex-col space-y-4">

      <Input
        placeholder="Search by course name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64 focus-visible:ring-0 border focus:border-violet-400"
      />

      <div className="  mt-10">

      <Carousel>
        <CarouselContent className="w-full ">
          {chunkedCourses.length > 0 ? (
            chunkedCourses.map((courseChunk, chunkIndex) => (
              <CarouselItem key={chunkIndex} className="flex justify-center ">
                <div className="flex gap-10">
                  {courseChunk.map((course, index) => (
                    <ModuleCourseCard course={course} key={index} />
                  ))}
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="text-gray-500 p-4">No courses found.</div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="ml-10 rounded-lg cursor-pointer  hover:border-violet-300 hover:bg-violet-50" />
        <CarouselNext className="mr-10 rounded-lg cursor-pointer hover:border-violet-300 hover:bg-violet-50" />
      </Carousel>
                </div>
    </div>
  );
};

export default ModuleCoursesCards;
