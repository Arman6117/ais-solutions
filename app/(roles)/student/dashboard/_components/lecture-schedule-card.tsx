import { Button } from "@/components/ui/button";
import { MeetingInfo } from "@/lib/types/student-dashboard.type";
import {
  BookOpen,
  Calendar,
  Clock,
  Users,
  Video,
  AlertTriangle,
  CalendarClock,
  Lock,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";

export const revalidate = 60;

const LectureScheduleCard = ({ meeting }: { meeting: MeetingInfo }) => {
  // Determine access rights (default to true if field is missing for backward compatibility)
  const hasAccess = meeting.isPurchasedModule !== false;

  // Convert 24-hour format to 12-hour format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  // Determine card styling based on status
  const isCancelled = meeting.status === "cancelled";
  const isRescheduled = meeting.status === "rescheduled";

  return (
    <div
      className={`relative group sm:w-72 w-full max-w-full bg-soft-white rounded-xl shadow-primary-bg/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer overflow-hidden ${
        isCancelled ? "opacity-70" : ""
      } ${!hasAccess ? "opacity-90" : ""}`}
    >
      {/* Header with gradient */}
      <div
        className={`px-6 py-4 relative ${
          !hasAccess
            ? "bg-gradient-to-r from-gray-500 to-gray-600"
            : isCancelled
            ? "bg-gradient-to-r from-red-600 to-red-700"
            : isRescheduled
            ? "bg-gradient-to-r from-yellow-500 to-orange-600"
            : "bg-gradient-to-r from-indigo-600 to-purple-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
              {meeting.module}
              {!hasAccess && <Lock className="w-4 h-4 text-gray-300" />}
            </h3>
            {/* Status Badge */}
            <div className="mt-2 flex items-center gap-2">
              {!hasAccess && (
                <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-2 py-1 rounded-full font-medium">
                  <Lock className="w-3 h-3" />
                  Preview Only
                </span>
              )}
              {hasAccess && isCancelled && (
                <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-2 py-1 rounded-full font-medium">
                  <AlertTriangle className="w-3 h-3" />
                  Cancelled
                </span>
              )}
              {hasAccess && isRescheduled && (
                <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-2 py-1 rounded-full font-medium">
                  <CalendarClock className="w-3 h-3" />
                  Rescheduled
                </span>
              )}
            </div>
          </div>
          {/* Only show Join button if user has access AND meeting isn't cancelled */}
          {hasAccess && !isCancelled && (
            <div className="flex items-center space-x-2">
              {meeting.meetingLink ? (
                <Link href={meeting.meetingLink} target="_blank">
                  <Button size={"sm"} variant={"outline"}>
                    <Video className="w-4 h-4 mr-1" />
                    Join
                  </Button>
                </Link>
              ) : (
                <Button size={"sm"} variant={"outline"} disabled>
                  No Link
                </Button>
              )}
            </div>
          )}
          {/* Show Locked button if no access */}
          {!hasAccess && (
            <Button size={"sm"} variant={"outline"} disabled className="bg-white/10 text-white border-white/20">
              <Lock className="w-4 h-4 mr-1" />
              Locked
            </Button>
          )}
        </div>
      </div>

      {/* Status Alert Messages */}
      {isCancelled && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mx-4 mt-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-sm text-red-700 font-medium">
              This meeting has been cancelled
            </p>
          </div>
        </div>
      )}

      {isRescheduled && meeting.originalDate && meeting.originalTime && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mx-4 mt-4">
          <div className="flex items-center">
            <CalendarClock className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-sm text-yellow-700 font-medium">
                Meeting Rescheduled
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Original: {formatDate(meeting.originalDate)} at{" "}
                {formatTime(meeting.originalTime)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Card Content */}
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
                Date
              </span>
            </div>
            <p className="text-gray-900 font-semibold text-sm">
              {formatDate(meeting.date)}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Time
              </span>
            </div>
            <p className="text-gray-900 font-bold text-lg">
              {formatTime(meeting.time)}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl border-2 transition-opacity duration-300 pointer-events-none ${
          !hasAccess
            ? "border-gray-300"
            : isCancelled
            ? "border-red-300"
            : isRescheduled
            ? "border-yellow-300"
            : "border-purple-200"
        }`}
      ></div>
    </div>
  );
};

export default LectureScheduleCard;
