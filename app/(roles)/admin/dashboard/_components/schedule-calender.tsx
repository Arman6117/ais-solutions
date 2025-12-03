"use client";

import { useState } from "react";
import { format, isSameDay, isAfter, parseISO } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getDaysInMonth } from "@/lib/utils";
import { Session } from "@/lib/types/sessions.type";
import { deleteSession } from "@/actions/admin/sessions/delete-session"; // Adjust import path as needed
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DAYS_PER_PAGE = 10;

type ScheduleCalenderProps = {
  sessions?: Session[];
};

const ScheduleCalender = ({ sessions = [] }: ScheduleCalenderProps) => {
  const router = useRouter();
  const today = new Date();
  const [currentYear] = useState(today.getFullYear());
  const [currentMonth] = useState(today.getMonth());
  const allDates = getDaysInMonth(currentYear, currentMonth);

  // State to track which session is currently being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const todayIndex = allDates.findIndex((date) => isSameDay(date, today));
  const initialPage = todayIndex !== -1 ? Math.floor(todayIndex / DAYS_PER_PAGE) : 0;

  const [page, setPage] = useState(initialPage);
  const paginatedDates = allDates.slice(
    page * DAYS_PER_PAGE,
    page * DAYS_PER_PAGE + DAYS_PER_PAGE
  );

  const handleNextPage = () => {
    if ((page + 1) * DAYS_PER_PAGE < allDates.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Helper to safely parse date from session
  const getSessionDate = (session: Session): Date => {
    if (session.date instanceof Date) {
      return session.date;
    }
    if (typeof session.date === "string") {
      return parseISO(session.date);
    }
    return new Date(session.date);
  };

  // DELETE HANDLER
  const handleDelete = async (sessionId: string) => {
    if (!sessionId) {
        toast.error("Invalid Session ID");
        return;
    }

    setDeletingId(sessionId);
    try {
      const res = await deleteSession(sessionId);
      
      if (res.success) {
        toast.success(res.message);
        router.refresh(); // Refresh server components to update the list
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full transition-all flex-col h-full bg-white border border-gray-200 rounded-xl flex shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex w-full px-4 py-3 justify-between items-center border-b border-gray-200 bg-gray-50">
        <h1 className="text-lg font-bold text-gray-800">Your Schedule</h1>
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            onClick={handlePrevPage}
            disabled={page === 0}
            className="text-gray-700 p-1 rounded-full hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft size={18} />
          </Button>
          <h1 className="text-sm font-medium text-gray-600 min-w-20 text-center">
            {format(paginatedDates[0], "MMM d")} -{" "}
            {format(paginatedDates[paginatedDates.length - 1], "MMM d")}
          </h1>
          <Button
            variant="ghost"
            onClick={handleNextPage}
            disabled={(page + 1) * DAYS_PER_PAGE >= allDates.length}
            className="text-gray-700 p-1 rounded-full hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid transition-all h-52 divide-x z-0 divide-gray-200 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
        {paginatedDates.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");

          const daysMeetings = sessions.filter((m) => {
            try {
              const sessionDate = getSessionDate(m);
              return format(sessionDate, "yyyy-MM-dd") === dateStr;
            } catch (error) {
              console.log(error)
              return false;
            }
          });

          const hasMeetings = daysMeetings.length > 0;
          const isToday = isSameDay(date, today);

          return (
            <HoverCard key={date.toISOString()}>
              <HoverCardTrigger
                className={`cursor-pointer overflow-y-auto no-scrollbar p-2 h-full
                  ${
                    isToday
                      ? "bg-violet-50 border-t-2 border-t-violet-500"
                      : "border-t border-t-transparent"
                  }
                  ${hasMeetings ? "bg-teal-50" : "hover:bg-gray-50"} 
                  flex flex-col items-center justify-between transition-colors duration-200`}
              >
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500">
                        {format(date, "EEE")}
                      </span>
                      <span
                        className={`font-medium text-lg ${
                          isToday ? "text-violet-600" : ""
                        }`}
                      >
                        {format(date, "d")}
                      </span>
                    </div>
                    {isToday && (
                      <div className="bg-violet-500 w-2 h-2 rounded-full"></div>
                    )}
                  </div>

                  <div className="space-y-2 mt-1">
                    {hasMeetings ? (
                      <>
                        {daysMeetings.slice(0, 2).map((m, i) => (
                          <div
                            className="text-sm flex flex-col gap-1 bg-white p-2 rounded-md shadow-sm border border-gray-100"
                            key={i}
                          >
                            <div>
                              <p className="font-medium truncate text-xs">
                                {m.meetingName}
                              </p>
                              <p className="text-neutral-500 text-xs truncate">
                                {m.module}
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-neutral-500 text-xs">
                                {m.instructor || "TBA"}
                              </p>
                              <p className="text-xs font-medium">{m.time}</p>
                            </div>
                          </div>
                        ))}

                        {daysMeetings.length > 2 && (
                          <p className="text-xs text-blue-600 font-medium text-center mt-1">
                            +{daysMeetings.length - 2} more
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-neutral-400 text-xs italic text-center mt-3">
                        No classes
                      </p>
                    )}
                  </div>
                </div>
              </HoverCardTrigger>

              <HoverCardContent
                align="center"
                className="w-80 max-h-96 bg-white border border-gray-200 p-0 rounded-lg shadow-lg overflow-hidden"
                sideOffset={5}
              >
                <div
                  className={`${
                    isToday ? "bg-violet-600" : "bg-gray-700"
                  } text-white p-3 font-medium flex justify-between items-center`}
                >
                  <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
                  {isToday && (
                    <span className="text-xs bg-white text-violet-600 px-2 py-1 rounded-full">
                      Today
                    </span>
                  )}
                </div>

                {hasMeetings ? (
                  <div className="p-3 overflow-y-auto max-h-80">
                    {daysMeetings.map((m, i) => {
                      const meetingDate = getSessionDate(m);
                      const allowEditDelete =
                        isSameDay(meetingDate, today) || isAfter(meetingDate, today);
                      
                      const isDeleting = deletingId === m._id;

                      return (
                        <div
                          className="bg-white mb-2 p-3 rounded shadow-sm border border-gray-100 hover:border-violet-300 transition-colors duration-200"
                          key={i}
                        >
                          <div className="flex items-center mb-2">
                            <div className="w-1 h-8 bg-violet-500 rounded-full mr-2"></div>
                            <h3 className="font-bold text-gray-800">
                              {m.meetingName}
                            </h3>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs">Module</p>
                              <p className="font-medium">{m.module}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Instructor</p>
                              <p className="font-medium">{m.instructor || "TBA"}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-gray-500 text-xs">Time</p>
                              <p className="font-medium">{m.time}</p>
                            </div>
                          </div>

                          {allowEditDelete && (
                            <div className="flex justify-end gap-2 mt-3">
                              <Button
                                size="sm"
                                variant="destructive"
                                className="text-xs px-2 py-1 h-auto"
                                disabled={isDeleting}
                                onClick={() => handleDelete(m._id)}
                              >
                                {isDeleting ? (
                                   <>
                                     <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                     Deleting...
                                   </>
                                ) : (
                                   "Delete"
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-center justify-center p-8 text-gray-400">
                    <Calendar className="size-12" />
                    <p className="text-center">
                      No classes scheduled for this day
                    </p>
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleCalender;
