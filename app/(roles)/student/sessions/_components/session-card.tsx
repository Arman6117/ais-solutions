"use client";
import React, { useState, useMemo } from "react";
import { format, isValid } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  User2,
  BookOpenCheck,
  FileText,
  NotebookPen,
  Lock,
  Check,
} from "lucide-react";
import SessionMarkAsWatchedButton from "./session-mark-as-watched-button";
import { toast } from "sonner";
import SessionCardViewNotesButton from "./session-card-view-notes-button";
import { Session } from "@/lib/types/sessions.type";
import { markSessionAsWatched } from "@/actions/student/sessions/mark-as-watched";
import { useRouter } from "next/navigation";

type SessionCardProps = {
  session: Session;
  attended: boolean;
  studentId: string;
};

const SessionCard = ({ session, attended, studentId }: SessionCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { formattedDate, formattedTime } = useMemo(() => {
    try {
      let dateObj: Date;

      if (session.date instanceof Date) {
        dateObj = new Date(session.date);
      } else if (typeof session.date === "string") {
        dateObj = new Date(`${session.date}T${session.time || "00:00"}:00`);
      } else {
        dateObj = new Date(session.date);
      }

      if (!isValid(dateObj)) {
        console.error("Invalid date for session:", session._id, session.date);
        return {
          formattedDate: "Invalid date",
          formattedTime: session.time || "Invalid time",
        };
      }

      return {
        formattedDate: format(dateObj, "dd MMM yyyy"),
        formattedTime: format(dateObj, "hh:mm a"),
      };
    } catch (error) {
      console.error("Error formatting session date/time:", error, {
        date: session.date,
        time: session.time,
      });
      return {
        formattedDate: "Date error",
        formattedTime: session.time || "Time error",
      };
    }
  }, [session.date, session.time, session._id]);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await markSessionAsWatched(session._id, studentId);
      if (!res.success) {
        toast.error(res.message);
        setIsLoading(false);
        return;
      }

      toast.success(res.message);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const allTopics = Array.isArray(session.notes)
    ? session.notes.reduce<string[]>((acc, note) => {
        if (
          typeof note === "object" &&
          "topics" in note &&
          Array.isArray(note.topics)
        ) {
          return [...acc, ...note.topics];
        }
        return acc;
      }, [])
    : [];

  const uniqueTopics = [...new Set(allTopics)];

  return (
    <div
      className={`w-full border rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 space-y-3 ${
        session.isPurchasedModule === false
          ? "bg-gray-50 border-gray-300"
          : "bg-white"
      }`}
    >
      <div className="flex sm:flex-row flex-col items-center justify-between">
        <div className="flex sm:flex-row flex-col sm:mb-0 mb-4 items-center gap-4">
          <Badge
            variant={attended ? "default" : "outline"}
            className={`text-xs px-3 py-1 ${
              attended
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {attended ? "Attended" : "Missed"}
          </Badge>

          {/* Purchase Status Badge */}
          {session.isPurchasedModule === false && (
            <Badge
              variant="outline"
              className="text-xs px-3 py-1 bg-orange-50 text-orange-700 border-orange-300 flex items-center gap-1"
            >
              <Lock className="h-3 w-3" />
              Not Purchased
            </Badge>
          )}
          {session.isPurchasedModule === true && (
            <Badge
              variant="outline"
              className="text-xs px-3 py-1 bg-blue-50 text-blue-700 border-blue-300 flex items-center gap-1"
            >
              <Check className="h-3 w-3" />
              Purchased
            </Badge>
          )}

          {!attended && session.isPurchasedModule && (
            <SessionMarkAsWatchedButton
              loading={isLoading}
              onClick={handleClick}
            />
          )}
        </div>
        <div className="text-sm flex gap-3 flex-col items-center text-muted-foreground">
          {formattedDate} • {formattedTime}
          {session.isPurchasedModule && (
            <SessionCardViewNotesButton sessionId={session._id} />
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-primary">
        {session.meetingName}
      </h2>

      {session.instructor && (
        <div className="text-sm text-gray-700 flex items-center gap-2">
          <User2 className="h-4 w-4 text-blue-600" />
          <span className="font-medium">Instructor:</span> {session.instructor}
        </div>
      )}

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <BookOpenCheck className="h-4 w-4 text-green-600" />
        <span className="font-medium">Module:</span> {session.module}
        {session.isPurchasedModule === false && (
          <span className="text-xs text-orange-600 ml-2">(Preview Only)</span>
        )}
      </div>

      {session.chapters && session.chapters.length > 0 && (
        <div className="text-sm text-gray-700 flex sm:flex-row flex-col sm:items-start gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <NotebookPen className="h-4 w-4 text-pink-600" />
            <span className="font-medium">Chapter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {session.chapters.map((chapter, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-50 text-pink-700 border border-purple-200"
              >
                {chapter}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {uniqueTopics.length > 0 && (
        <div className="text-sm text-gray-700 flex sm:flex-row flex-col sm:items-start gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <FileText className="h-4 w-4 text-purple-600" />
            <span className="font-medium">Topics:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueTopics.map((topic, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-50 text-purple-700 border border-purple-200"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
