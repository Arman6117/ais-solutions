import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";
import { Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

type Meeting = {
  id: string;
  course: string;
  module: string;
  date: Date;
  time: string;
};

type BatchMeetings = {
  courseId: string;
  batch: string;
  mode: "view" | "edit";
  modules: string[];
};

const formatShortDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const BatchMeetings = ({ batch, courseId, mode, modules }: BatchMeetings) => {
  const today = new Date();

  const formattedToday = format(today, "EEEE PP");

  const dummyMeetings: Meeting[] = [
    {
      id: "1",
      course: "Web Development",
      module: "React Fundamentals",
      date: new Date(2025, 4, 10), // May 10, 2025
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: "2",
      course: "JavaScript Essentials",
      module: "Advanced Concepts",
      date: new Date(2025, 4, 7), // May 7, 2025 (today)
      time: "2:00 PM - 4:00 PM",
    },
    {
      id: "3",
      course: "CSS Mastery",
      module: "Responsive Design",
      date: new Date(2025, 4, 5), // May 5, 2025 (past)
      time: "9:00 AM - 11:00 AM",
    },
    {
      id: "4",
      course: "Backend Fundamentals",
      module: "Node.js Basics",
      date: new Date(2025, 4, 3), // May 3, 2025 (past)
      time: "1:00 PM - 3:00 PM",
    },
  ];

  const sortedMeetings = [...dummyMeetings].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const hasMeetings = dummyMeetings.length > 0;

  return (
    <Card className="border shadow-md">
      <CardHeader className="pb-3 bg-gray-50 border-b">
        <CardTitle className="text-xl">Meetings Schedule</CardTitle>
        <div className="text-sm text-gray-500">{formattedToday}</div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {hasMeetings ? (
            <ScrollArea className="h-64 w-full pr-4">
              <div className="space-y-3">
                {sortedMeetings.map((meeting, i) => (
                  <div
                    key={meeting.id || i}
                    className={cn(
                      "bg-white p-3 rounded shadow-sm border border-gray-100 hover:border-violet-300 transition-colors duration-200",
                      !isToday(meeting.date) && "bg-violet-50"
                    )}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-1 h-8 bg-violet-500 rounded-full mr-2"></div>
                      <h3 className="font-bold text-gray-800">
                        {meeting.course}
                      </h3>
                      {isToday(meeting.date) && (
                        <span className="ml-2 text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded-full">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Module</p>
                        <p className="font-medium">{meeting.module}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Date</p>
                        <p className="font-medium">
                          {formatShortDate(meeting.date)}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500 text-xs">Time</p>
                        <p className="font-medium">{meeting.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center py-8 text-gray-400">
              <Calendar className="w-12 h-12" />
              <p className="text-center">No meetings found</p>
            </div>
          )}

          <Separator className="my-2" />

          <div className="mt-4 pt-2">
            <Link
              href={`/admin/courses/batch-details/${courseId}/batch/${batch}/schedule-meet`}
            >
              <Button
                variant="outline"
                className="w-full cursor-pointer border-violet-200 text-violet-600 hover:bg-violet-50 hover:text-violet-700"
              >
                Schedule a meet
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchMeetings;
