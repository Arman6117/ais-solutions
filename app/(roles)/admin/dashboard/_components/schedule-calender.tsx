"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { sampleMeetings } from "@/lib/static";
import { getDaysInMonth } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
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

  //TODO:Make this component dynamic
  //TODO:Add today tomorrow tabs
  return (
    <div className="w-full transition-all flex-col h-full bg-white border border-gray-200 rounded-xl flex shadow-md overflow-hidden">
      <div className="flex w-full px-4 py-3 justify-between items-center border-b border-gray-200 bg-gray-50">
        <h1 className="text-lg font-bold text-gray-800">Your Schedule</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className="text-gray-700 p-1 rounded-full hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-sm font-medium text-gray-600 min-w-20 text-center">
            {format(paginatedDates[0], "MMM d")} - {format(paginatedDates[paginatedDates.length - 1], "MMM d")}
          </h1>
          <button
            onClick={handleNextPage}
            disabled={(page + 1) * DAYS_PER_PAGE >= allDates.length}
            className="text-gray-700 p-1 rounded-full hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="grid transition-all grid-cols-5 h-52 divide-x z-0 divide-gray-200">
        {paginatedDates.map((date, i) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const daysMeetings = sampleMeetings.filter(
            (m) => format(m.date, "yyyy-MM-dd") === dateStr
          );

          const hasMeetings = daysMeetings.length > 0;
          const isToday = isSameDay(date, today);
          
          return (
            <HoverCard key={date.toISOString()}>
              <HoverCardTrigger
                className={`cursor-pointer overflow-y-auto no-scrollbar p-2 h-full
                  ${isToday ? "bg-violet-50 border-t-2 border-t-violet-500" : "border-t border-t-transparent"}
                  ${hasMeetings ? "bg-teal-50" : "hover:bg-gray-50"} 
                  flex flex-col items-center justify-between transition-colors duration-200`}
              >
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500">{format(date, "EEE")}</span>
                      <span className={`font-medium text-lg ${isToday ? "text-violet-600" : ""}`}>
                        {format(date, "d")}
                      </span>
                    </div>
                    {isToday && (
                      <div className="bg-violet-500 w-2 h-2 rounded-full"></div>
                    )}
                  </div>
            
                  <div className="space-y-2 mt-1">
                    {daysMeetings.length > 0 ? (
                      <>
                        {daysMeetings.slice(0, 2).map((m, i) => (
                          <div
                            className="text-sm flex flex-col gap-1 bg-white p-2 rounded-md shadow-sm border border-gray-100"
                            key={i}
                          >
                            <div>
                              <p className="font-medium truncate text-xs">{m.course}</p>
                              <p className="text-neutral-500 text-xs truncate">{m.module}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-neutral-500 text-xs">{m.batch}</p>
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
                <div className={`${isToday ? "bg-violet-600" : "bg-gray-700"} text-white p-3 font-medium flex justify-between items-center`}>
                  <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
                  {isToday && <span className="text-xs bg-white text-violet-600 px-2 py-1 rounded-full">Today</span>}
                </div>
                
                {hasMeetings ? (
                  <div className="p-3 overflow-y-auto max-h-80">
                    {daysMeetings.map((m, i) => (
                      <div 
                        className="bg-white mb-2 p-3 rounded shadow-sm border border-gray-100 hover:border-violet-300 transition-colors duration-200" 
                        key={i}
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-1 h-8 bg-violet-500 rounded-full mr-2"></div>
                          <h3 className="font-bold text-gray-800">{m.course}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">Module</p>
                            <p className="font-medium">{m.module}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Batch</p>
                            <p className="font-medium">{m.batch}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-500 text-xs">Time</p>
                            <p className="font-medium">{m.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-center justify-center p-8 text-gray-400">
                    <Calendar className="size-12" />
                    <p className="text-center">No classes scheduled for this day</p>
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