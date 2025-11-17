"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { User2, BookOpenCheck, FileText, NotebookPen } from "lucide-react";
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
  const sessionDateTime = new Date(`${session.date}T${session.time}:00`);
  const formattedDate = format(sessionDateTime, "dd MMM yyyy");
  const formattedTime = format(sessionDateTime, "hh:mm a");

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

  // Extract all topics from notes
  const allTopics = Array.isArray(session.notes)
    ? session.notes.reduce<string[]>((acc, note) => {
        if (typeof note === 'object' && 'topics' in note && Array.isArray(note.topics)) {
          return [...acc, ...note.topics];
        }
        return acc;
      }, [])
    : [];

  // Remove duplicates
  const uniqueTopics = [...new Set(allTopics)];

  return (
    <div className="w-full border rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 bg-white space-y-3">
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
          {!attended && (
            <SessionMarkAsWatchedButton
              loading={isLoading}
              onClick={handleClick}
            />
          )}
        </div>
        <div className="text-sm flex gap-3 flex-col items-center text-muted-foreground">
          {formattedDate} • {formattedTime}
          <SessionCardViewNotesButton sessionId={session._id} />
        </div>
      </div>

    <h2 className="text-xl font-semibold text-primary">{session.meetingName}</h2>

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <User2 className="h-4 w-4 text-blue-600" />
        <span className="font-medium">Instructor:</span> {session.instructor}
      </div>

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <BookOpenCheck className="h-4 w-4 text-green-600" />
        <span className="font-medium">Module:</span> {session.module}
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
