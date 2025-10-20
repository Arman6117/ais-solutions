"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useMemo, useState } from "react";
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
import { CourseCards } from "@/lib/types/course.type";
import { getAllCourses } from "@/actions/student/courses/get-all-courses";
import { AlertTriangle, Loader2 } from "lucide-react";

const COURSES_PER_PAGE = 5; //TODO:Change it later

const AllCourses = () => {
  const [search, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [allCourses, setAllCourse] = useState<CourseCards[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getAllCourses();
      setAllCourse(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const filteredCourses = useMemo(() => {
    if (!allCourses) return [];
    let courses = allCourses;
    if (levelFilter !== "All") {
      courses = courses.filter((course) => course.courseLevel === levelFilter);
    }

    if (search.trim()) {
      courses = courses.filter((course) =>
        course.courseName.toLowerCase().includes(search.toLowerCase())
      );
    }

    courses = [...courses].sort((a, b) => {
      const aVal =
        sortBy === "price" ? a.coursePrice : new Date(a.createdAt).getTime();
      const bVal = sortBy === "price" ? b.coursePrice : new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return courses;
  }, [search, levelFilter, sortOrder, sortBy, allCourses]);
  if (loading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Loader2 className="text-primary-bg animate-spin" />
      </div>
    );
  }
  if (!allCourses) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <AlertTriangle className="text-destructive" />
        <h1 className="text-destructive">No Courses Available Yet!!</h1>
      </div>
    );
  }
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <CourseCard key={course._id} course={course} />
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
