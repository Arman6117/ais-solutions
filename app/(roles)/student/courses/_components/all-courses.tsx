"use client";
import React, { use, useMemo, useState } from "react";

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
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-serif">Browse Courses</h1>
      <div className="flex flex-col"></div>
    </div>
  );
};

export default AllCourses;
