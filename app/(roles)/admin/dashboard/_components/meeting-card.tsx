"use client";

import { Calendar } from "lucide-react";
import { format, isSameDay, isAfter } from "date-fns";
import { Button } from "@/components/ui/button";

export const MeetingCard = ({ meeting, isTodayOrFuture }: {
  meeting: {
    course: string;
    module: string;
    batch: string;
    time: string;
    date: string;
  };
  isTodayOrFuture: boolean;
}) => {
  return (
    <div className="bg-white mb-2 p-3 rounded shadow-sm border border-gray-100 hover:border-violet-300 transition-colors duration-200">
      <div className="flex items-center mb-2">
        <div className="w-1 h-8 bg-violet-500 rounded-full mr-2"></div>
        <h3 className="font-bold text-gray-800">{meeting.course}</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Module</p>
          <p className="font-medium">{meeting.module}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Batch</p>
          <p className="font-medium">{meeting.batch}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 text-xs">Time</p>
          <p className="font-medium">{meeting.time}</p>
        </div>
      </div>

      {isTodayOrFuture && (
        <div className="flex justify-end gap-2 mt-3">
          <Button
            size="sm"
            variant="outline"
            className="text-xs px-2 py-1 h-auto"
            onClick={() => console.log("Edit", meeting)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="text-xs px-2 py-1 h-auto"
            onClick={() => console.log("Delete", meeting)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
