"use client";
import React, { useMemo, useState } from "react";

import SessionFilterSelect from "./session-filter-select";
import SessionSortSelect from "./session-sort-select";

import { Input } from "@/components/ui/input";

import { dummySessions } from "@/lib/static";
import SessionCard from "./session-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SessionModuleFilterSelect from "./session-module-filter-select";
import { useCourseStore } from "@/store/use-course-store";

const ITEMS_PER_PAGE = 5; //TODO: Number of sessions per page change later
const Sessions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "attended" | "missed">("all");

  const {selectedCourse} = useCourseStore()
  const now = new Date();
  const filteredSessions = useMemo(() => {
    let sessions = [...dummySessions];

    if (filter === "attended") {
      sessions = sessions.filter((session) => session.attended);
    } else if (filter === "missed") {
      sessions = sessions.filter((session) => !session.attended);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      sessions = sessions.filter(
        (session) =>
          session.title.toLowerCase().includes(term) ||
          session.course.toLowerCase().includes(term) ||
          session.instructor.toLowerCase().includes(term)
      );
    }

    sessions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
    return sessions;
  }, [filter, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredSessions.length / ITEMS_PER_PAGE);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-serif">Sessions History</h1>

      <div className="flex flex-col mt-10">
        <div className="flex sm:flex-row gap-10 flex-col">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by meeting name,course name.."
            className="focus w-64 sm:w-96 border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
          />
          <div className="flex gap-3 flex-wrap">
            <SessionFilterSelect filter={filter} setFilter={setFilter} />
            <React.Suspense fallback={null}>

            <SessionModuleFilterSelect moduleFilter={selectedCourse?.modules} />
            </React.Suspense>
            <SessionSortSelect setSortBy={setSortBy} sortBy={sortBy} />
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {paginatedSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
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

export default Sessions;
