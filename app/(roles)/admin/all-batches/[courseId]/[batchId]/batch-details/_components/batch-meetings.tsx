"use client";
import { deleteSession } from "@/actions/admin/sessions/delete-session";
import { getAllMeetingsByBatchId } from "@/actions/admin/sessions/get-all-meetings-by-batch-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BatchMeetings as BatchMeetingsType } from "@/lib/types/sessions.type";
import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";
import {  Calendar } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import MeetingDeleteDialog from "./meeting-delete-dialog";
import MeetingEditDialog from "./meeting-edit-dialog";

type BatchMeetingsProps = {
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

const BatchMeetings = ({ batch, courseId }: BatchMeetingsProps) => {
  const today = new Date();
  const [meetings, setMeetings] = useState<BatchMeetingsType[]>([]);
  const formattedToday = format(today, "EEEE PP");
  const fetchMeetings = async () => {
    try {
      const res = await getAllMeetingsByBatchId(batch);
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setMeetings(res.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMeetings();
  }, []);

  const sortedMeetings = [...meetings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const hasMeetings = meetings.length > 0;
  const handleDelete = async (meetingId: string) => {
    try {
      const res = await deleteSession(meetingId);
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.success);
        fetchMeetings();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
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
                    key={meeting._id || i}
                    className={cn(
                      "bg-white group p-3 rounded shadow-sm border border-gray-100 hover:border-violet-300 transition-colors duration-200",
                      !isToday(meeting.date) && "bg-violet-50"
                    )}
                  >
                    <div className="flex justify-between items-center mb-2 w-full">
                      <div className="flex  items-center mb-2 ">
                        <div className="w-1 h-8 bg-violet-500 rounded-full mr-2"></div>
                        <h3 className="font-bold text-gray-800">
                          {meeting.meetingName}
                        </h3>
                        {isToday(meeting.date) && (
                          <span className="ml-2 text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded-full">
                            Today
                          </span>
                        )}
                      </div>
                     <div className="flex gap-2">

                     <MeetingDeleteDialog
                      onDelete={() => handleDelete(meeting._id!)}
                      
                      />
                     <MeetingEditDialog
                      
                      meetingData={meeting}
                      batchId={batch}
                      
                      />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Module</p>
                        <p className="font-medium">{meeting.module}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Date</p>
                        <p className="font-medium">
                          {formatShortDate(new Date(meeting.date))}
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
              href={`/admin/all-batches/${courseId}/${batch}/batch-details/schedule-meet`}
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
