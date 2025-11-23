"use client";
import React, { useEffect, useMemo, useState } from "react";

import SessionFilterSelect from "./session-filter-select";
import SessionSortSelect from "./session-sort-select";

import { Input } from "@/components/ui/input";
import SessionCard from "./session-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SessionModuleFilterSelect from "./session-module-filter-select";
import { getStudentSessions } from "@/actions/shared/get-sessions";

import { toast } from "sonner";
import { Session } from "@/lib/types/sessions.type";
import { authClient } from "@/lib/auth-client";
import { getStudentId } from "@/actions/shared/get-student-id";
import { getStudentModules } from "@/actions/student/sessions/get-student-modules";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 5;

const Sessions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [studentSessions, setStudentSessions] = useState<Session[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "attended" | "missed">("all");
  const [moduleFilter, setModuleFilter] = useState<string>("all");
  const [studentModules, setStudentModules] = useState<string[]>([]);
  const [currentStudentId, setCurrentStudentId] = useState("");

  const isSessionPast = (sessionDate: Date | string, sessionTime: string) => {
    const currentDateTime = new Date();

    const sessionDateObj = new Date(sessionDate);

    if (sessionTime && sessionTime.includes(":")) {
      const [hours, minutes] = sessionTime
        .split(":")
        .map((num) => parseInt(num, 10));
      sessionDateObj.setHours(hours, minutes, 0, 0);
    } else {
      sessionDateObj.setHours(23, 59, 59, 999);
    }

    return sessionDateObj < currentDateTime;
  };

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const session = await authClient.getSession();
        if (!session.data) return;
        const studentId = await getStudentId(session.data.user.email!);
        if (!studentId) {
          throw new Error("Login");
        }

        setCurrentStudentId(studentId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentId();
  }, []);

  const fetchAllSessionsAndModules = async () => {
    setIsLoading(true);
    try {
      const res = await getStudentSessions(currentStudentId);
      const modules = await getStudentModules(currentStudentId);

      toast.message(res.message);

      // Filter to only show sessions that have already happened
      const pastSessions = res.data.filter((session) => {
        const isPast = isSessionPast(session.date, session.time);
        console.log(
          `Session ${session.meetingName} - Date: ${session.date}, Time: ${session.time}, Is Past: ${isPast}`
        );
        return isPast;
      });

      setStudentSessions(pastSessions);
      setStudentModules(modules.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setStudentSessions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentStudentId) {
      fetchAllSessionsAndModules();
    }
  }, [currentStudentId]);

  const filteredSessions = useMemo(() => {
    let sessions = [...studentSessions];

    // Filter by attendance status
    if (filter === "attended") {
      sessions = sessions.filter((session) =>
        session.studentId.includes(currentStudentId)
      );
    } else if (filter === "missed") {
      sessions = sessions.filter(
        (session) => !session.studentId.includes(currentStudentId)
      );
    }

    // Filter by module
    if (moduleFilter !== "all") {
      sessions = sessions.filter((session) => session.module === moduleFilter);
    }

    // Filter by search term with null/undefined checks
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      sessions = sessions.filter(
        (session) =>
          session.meetingName?.toLowerCase().includes(term) ||
          session.courseName?.toLowerCase().includes(term) ||
          session.module?.toLowerCase().includes(term) ||
          session.instructor?.toLowerCase().includes(term) ||
          session.chapters?.some((chapter) =>
            chapter.toLowerCase().includes(term)
          )
      );
    }

    // Sort by date and time
    sessions.sort((a, b) => {
      const dateTimeA = new Date(a.date);
      const timePartsA = a.time.split(":");
      dateTimeA.setHours(
        parseInt(timePartsA[0], 10),
        parseInt(timePartsA[1], 10),
        0,
        0
      );

      const dateTimeB = new Date(b.date);
      const timePartsB = b.time.split(":");
      dateTimeB.setHours(
        parseInt(timePartsB[0], 10),
        parseInt(timePartsB[1], 10),
        0,
        0
      );

      return sortBy === "newest"
        ? dateTimeB.getTime() - dateTimeA.getTime()
        : dateTimeA.getTime() - dateTimeB.getTime();
    });

    return sessions;
  }, [
    filter,
    moduleFilter,
    searchTerm,
    sortBy,
    studentSessions,
    currentStudentId,
  ]);

  const totalPages = Math.ceil(filteredSessions.length / ITEMS_PER_PAGE);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, moduleFilter, searchTerm, sortBy]);

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Loader2 className="text-primary-bg animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-serif">Sessions History</h1>

      <div className="flex flex-col mt-10">
        <div className="flex sm:flex-row gap-10 flex-col">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by meeting name, course name.."
            className="focus w-64 sm:w-96 border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
          />
          <div className="flex gap-3 flex-wrap">
            <SessionFilterSelect filter={filter} setFilter={setFilter} />
            <React.Suspense fallback={null}>
              <SessionModuleFilterSelect
                moduleFilter={studentModules}
                selectedModule={moduleFilter}
                setModuleFilter={setModuleFilter}
              />
            </React.Suspense>
            <SessionSortSelect setSortBy={setSortBy} sortBy={sortBy} />
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-10">
          {paginatedSessions.length > 0 ? (
            paginatedSessions.map((session) => (
              <SessionCard
                attended={session.studentId.includes(currentStudentId)}
                studentId={currentStudentId}
                key={session._id}
                session={session}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-lg">
                {searchTerm || filter !== "all" || moduleFilter !== "all"
                  ? "No sessions found matching your criteria."
                  : "No completed sessions available yet."}
              </p>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none cursor-not-allowed opacity-50"
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
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Sessions;
