import React from "react";
import { dummySessions } from "@/lib/static";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock,
  User2,
  BookOpenCheck,
  Layers,
} from "lucide-react";
import SessionMarkAsWatchedButton from "./session-mark-as-watched-button";
import { toast } from "sonner";
import SessionCardViewNotesButton from "./session-card-view-notes-button";
import { Session } from "@/lib/types/sessions.type";

type SessionCardProps = {
  session: Session
  attended:boolean
};

const SessionCard = ({ session ,attended}: SessionCardProps) => {
  const sessionDate = new Date(session.date);
  const formattedDate = format(sessionDate, "dd MMM yyyy");
  const formattedTime = format(sessionDate, "hh:mm a");

  return (
    <div className="w-full border rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
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
              onClick={() => toast.success("Marked as watched")}
            />
          )}
        </div>
        <div className="text-sm flex gap-3 flex-col items-center text-muted-foreground">
          {formattedDate} • {formattedTime}
          <SessionCardViewNotesButton
            sessionId={session._id}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-primary">{session.title}</h2>

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <User2 className="h-4 w-4" />
        <span className="font-medium">Instructor:</span> {session.instructor}
      </div>

      <div className="text-sm text-gray-700 flex items-center gap-2">
        <BookOpenCheck className="h-4 w-4" />
        <span className="font-medium">Course:</span> {session.courseName}
      </div>

      <div className="text-sm text-gray-700 sm:flex-row flex-col  flex sm:items-center gap-2">
        <Layers className="h-4 w-4" />
        <span className="font-medium">Module:</span> {session.modules}
        <span className="font-medium sm:ml-4">Chapter:</span> {session.chapters}
      </div>
    </div>
  );
};

export default SessionCard;
