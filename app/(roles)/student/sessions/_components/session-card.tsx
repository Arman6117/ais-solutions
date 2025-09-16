"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { User2, BookOpenCheck, Layers } from "lucide-react";
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
  const sessionDate = new Date(session.date);
  const formattedDate = format(sessionDate, "dd MMM yyyy");
  const formattedTime = format(sessionDate, "hh:mm a");

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
      console.log(error)
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full border rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5  bg-white space-y-3">
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
          <SessionCardViewNotesButton  sessionId={session._id} />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-primary">{session.title}</h2>

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <User2 className="h-4 w-4" />
        <span className="font-medium">Instructor:</span> {session.instructor}
      </div>

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <BookOpenCheck className="h-4 w-4" />
        <span className="font-medium">Module:</span> {session.module}
      </div>

      <div className="text-sm text-gray-700 sm:flex-row flex-col  flex sm:items-center gap-2">
        <Layers className="h-4 w-4" />
        {/* <span className="font-medium">Module:</span> {session.modules} */}
        <span className="font-medium ">Chapter:</span> {session.chapters}
      </div>
    </div>
  );
};

export default SessionCard;
