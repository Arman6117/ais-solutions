"use client";

import { sampleMeetings } from "@/lib/static";
import { getDaysInMonth } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

const ScheduleCalender = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const allDates = getDaysInMonth(currentYear, currentMonth);
  const [haveMeeting, setHaveMeeting] = useState(false);
  const [page, setPage] = useState(0);
  const paginatedDates = allDates.slice(page * 10, page * 10 + 10);

  return (
    <div className="w-full flex-col h-full bg-white border border-neutral-200 rounded-lg flex shadow-sm">
      <div className="flex w-full px-4 py-3 justify-between items-center border-b border-neutral-200">
        <h1 className="text-lg font-medium">Your Schedule</h1>
        <div className="flex">
          <h1 className="text-sm font-medium text-neutral-600">
            may 1 - may 10
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-5 h-52 divide-x divide-neutral-200">
        {paginatedDates.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const daysMeetings = sampleMeetings.filter(
            (m) => format(m.date, "yyyy-MM-dd") === dateStr
          );

          return (
            <div
              key={date.toISOString()}
              className="border-t overflow-y-auto no-scrollbar  border-neutral-200 p-2"
            >
              <p className="font-medium text-lg mb-2">{format(date, "d")}</p>
              {daysMeetings.length > 0 ? (
                daysMeetings.map((m, i) => (
                  <div
                    className="mb-2 text-sm flex flex-col gap-1 bg-green-50 p-2 rounded-md shadow-sm"
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
