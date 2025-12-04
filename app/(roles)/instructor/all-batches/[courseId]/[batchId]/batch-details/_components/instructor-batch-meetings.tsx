"use client";

import { deleteSession } from "@/actions/admin/sessions/delete-session";
import { getAllMeetingsByBatchId } from "@/actions/admin/sessions/get-all-meetings-by-batch-id";
import MeetingDeleteDialog from "@/app/(roles)/admin/all-batches/[courseId]/[batchId]/batch-details/_components/meeting-delete-dialog";
import MeetingEditDialog from "@/app/(roles)/admin/all-batches/[courseId]/[batchId]/batch-details/_components/meeting-edit-dialog";
import MeetingFilters from "@/app/(roles)/admin/all-batches/[courseId]/[batchId]/batch-details/_components/meeting-filters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BatchMeetings } from "@/lib/types/sessions.type";
import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";
import { Calendar } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";

type InstructorBatchMeetingsProps = {
  courseId: string;
  batch: string;
  mode: "view" | "edit";
};

const formatShortDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "rescheduled":
      return (
        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
          Rescheduled
        </span>
      );
    case "cancelled":
      return (
        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
          Cancelled
        </span>
      );
    case "scheduled":
      return (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          Scheduled
        </span>
      );
    default:
      return null;
  }
};

const InstructorBatchMeetings = ({ batch, courseId }: InstructorBatchMeetingsProps) => {
  const today = new Date();
  const [meetings, setMeetings] = useState<BatchMeetings[]>([]);
  const formattedToday = format(today, "EEEE PP");

  // Filter State
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sortOrder: "desc" as "asc" | "desc",
  });

  const fetchMeetings = async () => {
    try {
      const res = await getAllMeetingsByBatchId(batch);
      if (!res.success) {
        toast.error(res.message);
      } else {
        setMeetings(res.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [batch]);

  const handleDelete = async (meetingId: string) => {
    try {
      const res = await deleteSession(meetingId);
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success("Meeting cancelled successfully");
        fetchMeetings();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Apply Filters and Sorting
  const filteredMeetings = useMemo(() => {
    let result = [...meetings];

    // 1. Search Filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (m) =>
          m.meetingName.toLowerCase().includes(query) ||
          m.module.toLowerCase().includes(query) ||
          (m.instructor && m.instructor.toLowerCase().includes(query))
      );
    }

    // 2. Status Filter
    if (filters.status !== "all") {
      result = result.filter((m) => m.status === filters.status);
    }

    // 3. Sorting happens automatically in groupMeetingsByDate via object keys sort, 
    // but we need to control the Grouping Sort Order.
    return result;
  }, [meetings, filters]);

  const groupMeetingsByDate = (meetings: BatchMeetings[]) => {
    const grouped = meetings.reduce(
      (acc, meeting) => {
        const dateKey = format(new Date(meeting.date), "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(meeting);
        return acc;
      },
      {} as Record<string, BatchMeetings[]>
    );

    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      const timeA = new Date(dateA).getTime();
      const timeB = new Date(dateB).getTime();
      return filters.sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });
  };

  const groupedMeetings = groupMeetingsByDate(filteredMeetings);
  const hasMeetings = filteredMeetings.length > 0;

  return (
    <Card className="border shadow-md">
      <CardHeader className="pb-3 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
           <CardTitle className="text-xl">Meetings Schedule</CardTitle>
           <div className="text-sm text-gray-500 font-medium">{meetings.length} Total</div>
        </div>
        <div className="text-sm text-gray-500">{formattedToday}</div>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Filter Component */}
        <MeetingFilters onFilterChange={setFilters} />

        <div className="space-y-4">
          {hasMeetings ? (
            <ScrollArea className="h-96 w-full pr-4">
              <div className="space-y-6">
                {groupedMeetings.map(([date, dateMeetings]) => (
                  <div key={date} className="space-y-3">
                    {/* Date Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 rounded-lg shadow-sm z-10">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-gray-800">
                          {format(new Date(date), "EEEE, MMMM dd, yyyy")}
                        </h4>
                        <div className="flex items-center gap-2">
                          {isToday(new Date(date)) && (
                            <span className="text-xs bg-violet-500 text-white px-3 py-1 rounded-full font-medium">
                              Today
                            </span>
                          )}
                          <span className="text-xs bg-white text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                            {dateMeetings.length} meeting
                            {dateMeetings.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Meetings for this date */}
                    <div className="space-y-2 pl-2">
                      {dateMeetings
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((meeting, i) => (
                          <div
                            key={meeting._id || i}
                            className={cn(
                              "bg-white group p-3 rounded-lg shadow-sm border border-gray-200 hover:border-violet-400 hover:shadow-md transition-all duration-200",
                              isToday(new Date(meeting.date)) &&
                                "bg-violet-50/50 border-violet-200",
                              meeting.status === "cancelled" &&
                                "opacity-60 bg-red-50/30"
                            )}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-start gap-2 flex-1">
                                <div
                                  className={cn(
                                    "w-1 h-full rounded-full min-h-[2rem]",
                                    meeting.status === "cancelled"
                                      ? "bg-red-400"
                                      : meeting.status === "rescheduled"
                                      ? "bg-yellow-400"
                                      : "bg-violet-500"
                                  )}
                                ></div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h3 className="font-bold text-gray-800 text-base">
                                      {meeting.meetingName}
                                    </h3>
                                    {getStatusBadge(meeting.status)}
                                  </div>

                                  {/* Show original date/time for rescheduled meetings */}
                                  {meeting.status === "rescheduled" &&
                                    meeting.originalDate &&
                                    meeting.originalTime && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Originally:{" "}
                                        {formatShortDate(
                                          new Date(meeting.originalDate)
                                        )}{" "}
                                        at {meeting.originalTime}
                                      </p>
                                    )}

                                  {/* Show cancellation message */}
                                  {meeting.status === "cancelled" && (
                                    <p className="text-xs text-red-600 mt-1">
                                      This meeting has been cancelled
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Edit and Delete buttons */}
                              {meeting.status !== "cancelled" && (
                                <div className="flex gap-1">
                                  <MeetingEditDialog
                                    meetingData={meeting}
                                    batchId={batch}
                                    onSave={fetchMeetings}
                                  />
                                  <MeetingDeleteDialog
                                    onDelete={() => handleDelete(meeting._id!)}
                                  />
                                </div>
                              )}
                            </div>

                            {/* Meeting Details Grid */}
                            <div className="grid grid-cols-2 gap-3 text-sm pl-3">
                              <div>
                                <p className="text-gray-500 text-xs font-medium">
                                  Module
                                </p>
                                <p className="font-medium text-gray-800">
                                  {meeting.module}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs font-medium">
                                  Time
                                </p>
                                <p className="font-medium text-gray-800 flex items-center gap-1">
                                  <span className="text-violet-600">🕐</span>
                                  {meeting.time}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs font-medium">
                                  Instructor
                                </p>
                                <p className="font-medium text-gray-800 flex items-center gap-1">
                                  <span className="text-violet-600">👨‍🏫</span>
                                  {meeting.instructor || "Not Assigned"}
                                </p>
                              </div>
                              {meeting.chapters &&
                                meeting.chapters.length > 0 && (
                                  <div>
                                    <p className="text-gray-500 text-xs font-medium mb-1">
                                      Topics
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {meeting.chapters
                                        .slice(0, 2)
                                        .map((chapter, idx) => (
                                          <span
                                            key={idx}
                                            className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded"
                                          >
                                            {chapter}
                                          </span>
                                        ))}
                                      {meeting.chapters.length > 2 && (
                                        <span className="text-xs text-gray-500">
                                          +{meeting.chapters.length - 2} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center py-12 text-gray-400">
              <div className="bg-gray-100 p-4 rounded-full">
                <Calendar className="w-12 h-12" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">
                  {filters.search || filters.status !== "all" ? "No meetings match your filters" : "No meetings scheduled"}
                </p>
                {!(filters.search || filters.status !== "all") && (
                    <p className="text-sm text-gray-500 mt-1">
                      Click the button below to schedule your first meeting
                    </p>
                )}
              </div>
            </div>
          )}

          <Separator className="my-4" />

          <div className="pt-2">
            <Link
              href={`/instructor/all-batches/${courseId}/${batch}/batch-details/schedule-meet`}
            >
              <Button
                variant="outline"
                className="w-full cursor-pointer border-violet-200 text-violet-600 hover:bg-violet-50 hover:text-violet-700 font-medium"
              >
                + Schedule New Meeting
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorBatchMeetings;
