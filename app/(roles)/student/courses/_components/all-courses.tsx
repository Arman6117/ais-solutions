"use client";
import { Input } from "@/components/ui/input";
import React, {  useMemo, useState } from "react";
import CourseFilterSelect from "./course-filter-select";
import CourseSortSelect from "./course-sort-select";
import CourseCard from "./course-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";

const COURSES_PER_PAGE = 5; //TODO:Change it later
const dummyCourses = [
  {
    id: 1,
    title: "Intro to React",
    level: "Beginner",
    price: 199,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: 2,
    title: "Advanced Next.js",
    level: "Advanced",
    price: 499,
    createdAt: new Date("2025-01-15"),
  },
  {
    id: 3,
    title: "Intermediate Node",
    level: "Intermediate",
    price: 299,
    createdAt: new Date("2025-02-10"),
  },
  {
    id: 4,
    title: "Fullstack Basics",
    level: "Beginner",
    price: 149,
    createdAt: new Date("2025-03-01"),
  },
  {
    id: 5,
    title: "CSS Mastery",
    level: "Intermediate",
    price: 99,
    createdAt: new Date("2025-04-01"),
  },
  {
    id: 6,
    title: "TS & Zod",
    level: "Advanced",
    price: 399,
    createdAt: new Date("2025-05-15"),
  },
  {
    id: 7,
    title: "API Security",
    level: "Advanced",
    price: 349,
    createdAt: new Date("2025-05-29"),
  },
  {
    id: 8,
    title: "Beginner Git",
    level: "Beginner",
    price: 49,
    createdAt: new Date("2025-06-01"),
  },
  {
    id: 9,
    title: "Node + Express",
    level: "Intermediate",
    price: 299,
    createdAt: new Date("2025-06-02"),
  },
];

const AllCourses = () => {
  const [search, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = useMemo(() => {
    let courses = dummyCourses;
    if (levelFilter !== "All") {
      courses = courses.filter((course) => course.level === levelFilter);
    }

    if (search.trim()) {
      courses = courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    courses = [...courses].sort((a, b) => {
      const aVal = sortBy === "price" ? a.price : a.createdAt.getTime();
      const bVal = sortBy === "price" ? b.price : b.createdAt.getTime();
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return courses;
  }, [search, levelFilter, sortOrder, sortBy]);
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-serif">Browse Courses</h1>
      <div className="flex flex-col mt-10">
        <div className="flex sm:flex-row gap-10 flex-col">
          <Input
           onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="Search courses by name.."
            className="focus w-64 sm:w-96 border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
          />
          <div className="flex gap-3 flex-wrap">
            <CourseFilterSelect
              levelFilter={levelFilter}
              setLevelFilter={setLevelFilter}
            />
            <CourseSortSelect
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-3 xl:grid-cols-4  grid-cols-1 sm:grid-cols-2 border-separate gap-x-4 gap-y-8">
          {paginatedCourses.map((course) => (
            
              <CourseCard key={course.id} course={course} />
            
            
          ))}
        </div>
      </div>
      <Pagination className="mt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none cursor-pointer opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
          <PaginationItem className="px-4">
            {currentPage} / {totalPages}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none cursor-pointer opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllCourses;
