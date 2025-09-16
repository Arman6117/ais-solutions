import { Button } from "@/components/ui/button";
import { MeetingInfo } from "@/lib/types/student-dashboard.type";

import { BookOpen, Calendar, Clock, Users, Video } from "lucide-react";
import Link from "next/link";
import React from "react";
export const revalidate = 60;
const LectureScheduleCard = ({ meeting }: { meeting: MeetingInfo }) => {
  // Convert 24-hour format to 12-hour format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div
      className={`relative group sm:w-72 w-full max-w-full bg-soft-white rounded-xl shadow-primary-bg/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group overflow-hidden`}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">Meeting name</h3>
          <div className="flex items-center space-x-2">
            <Link href={meeting.meetingLink} target="_blank">
              <Button size={"sm"} className="" variant={"outline"}>
                <Video className="w-4 h-4 text-/80" />
                Join
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Course
              </span>
            </div>
            <p className="text-gray-900 font-semibold text-sm">
              {meeting.courseName}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Batch
              </span>
            </div>
            <p className="text-gray-900 font-semibold text-sm">
              {meeting.batchName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Module
              </span>
            </div>
            <p className="text-gray-900 font-semibold text-sm">
              {meeting.module}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Time
              </span>
            </div>
            <p className="text-gray-900 font-bold text-lg">{formatTime(meeting.time)}</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl border-2 border-purple-200 transition-opacity duration-300 pointer-events-none "></div>
    </div>
  );
};

export default LectureScheduleCard;