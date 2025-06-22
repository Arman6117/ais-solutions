"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MdOutlineVideoCall } from "react-icons/md";
import { cn } from "@/lib/utils"; // for conditional styling

const ongoingMeetings = [
  {
    id: "1",
    name: "JavaScript Basics",
    status: "Ongoing",
  },
  {
    id: "2",
    name: "React Advanced",
    status: "Ongoing",
  },
];

const statusOptions = ["Paused", "Resumed", "Postponed", "Cancelled"];

const statusColors: Record<string, string> = {
  Paused: "bg-yellow-100 text-yellow-700",
  Resumed: "bg-green-100 text-green-700",
  Postponed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
  Ongoing: "bg-violet-100 text-violet-700",
};

const MeetingsPanel = () => {
  const [meetings, setMeetings] = useState(ongoingMeetings);

  const handleStatusChange = (id: string, newStatus: string) => {
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === id ? { ...meeting, status: newStatus } : meeting
      )
    );
    console.log(`Notify students: Meeting ${id} is now ${newStatus}`);
    // 🔗 Add API call here if needed
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-14 h-10 cursor-pointer p-2">
          <MdOutlineVideoCall className="size-6 text-violet-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[320px] p-2 rounded-xl border shadow-lg">
        <DropdownMenuLabel className="text-base text-gray-800 px-2 mb-1">
          Ongoing Meetings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {meetings.length === 0 ? (
          <DropdownMenuItem disabled className="text-sm text-gray-500 px-3 py-2">
            No ongoing meetings
          </DropdownMenuItem>
        ) : (
          meetings.map((meeting) => (
            <div key={meeting.id} className="p-3 rounded-md hover:bg-muted/50 transition-all">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm text-gray-700">{meeting.name}</p>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    statusColors[meeting.status] || "bg-gray-100 text-gray-600"
                  )}
                >
                  {meeting.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-1">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant="ghost"
                    className={cn("text-xs px-3 py-1 border rounded-full  transition", statusColors[status])}
                    onClick={() => handleStatusChange(meeting.id, status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MeetingsPanel;
