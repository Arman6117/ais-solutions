"use client";

import { sampleMeetings } from "@/lib/static";
import { getDaysInMonth } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { useState } from "react";

const DAYS_PER_PAGE = 10;
const ScheduleCalender = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const allDates = getDaysInMonth(currentYear, currentMonth);

  const todayIndex = allDates.findIndex((date) => isSameDay(date, today));
  const initialPage =
    todayIndex !== -1 ? Math.floor(todayIndex / DAYS_PER_PAGE) : 0;

  const [page, setPage] = useState(initialPage);
  const paginatedDates = allDates.slice(page * DAYS_PER_PAGE, page * DAYS_PER_PAGE + DAYS_PER_PAGE);

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

  return (
    <div className="w-full flex-col h-full bg-white border z-10 border-neutral-700 rounded-2xl flex shadow-sm">
      <div className="flex w-full px-4 py-3 justify-between items-center border-b border-neutral-700">
        <h1 className="text-lg font-bold">Your Schedule</h1>
        <div className="flex gap-2 items-center">
          {/* Pagination arrows */}
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className="text-lg px-2 disabled:opacity-50"
          >
            ←
          </button>
          <h1 className="text-sm font-medium text-neutral-600">
            {format(paginatedDates[0], "MMM d")} - {format(paginatedDates[paginatedDates.length - 1], "MMM d")}
          </h1>
          <button
            onClick={handleNextPage}
            disabled={(page + 1) * DAYS_PER_PAGE >= allDates.length}
            className="text-lg px-2 disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 h-52 divide-x z-0 rounded-2xl divide-neutral-700">
        {paginatedDates.map((date, i) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const daysMeetings = sampleMeetings.filter(
            (m) => format(m.date, "yyyy-MM-dd") === dateStr
          );

          const hasMeetings = daysMeetings.length > 0;
    const isToday = isSameDay(date, today);
          return (
            <div
              key={date.toISOString()}
              className={`border-t overflow-y-auto no-scrollbar  border-neutral-700 p-2 ${
                hasMeetings ? "bg-teal-200" : ""
              }  flex flex-col items-ceter justify-between`}
              style={{
                borderBottomLeftRadius: i == 5 ? " 1rem" : "0",
                borderBottomRightRadius: i == 9 ? " 1rem" : "0",
              }}
            >
              <div>

              <p className="font-medium text-lg mb-2">{format(date, "d")}</p>
              {isToday && (
                <div className="w-2 h-2 rounded-full bg-purple-500 mb-2 "></div>
              )}
              </div>

              {daysMeetings.length > 0 ? (
                daysMeetings.map((m, i) => (
                  <div
                    className="mb-2 text-sm flex flex-col gap-1 bg-white p-2 rounded-md shadow-sm"
                    key={i}
                  >
                    <div>
                      <p className="font-medium">{m.course}</p>
                      <p className="text-neutral-500 text-xs">{m.module}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs">{m.batch}</p>
                      <p className="text-xs font-medium">{m.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 text-xs italic">No classes</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleCalender;
