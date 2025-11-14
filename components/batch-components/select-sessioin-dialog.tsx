"use client";
import { format, isToday, isYesterday } from "date-fns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";

import { NoteTableSessionType } from "@/lib/types/note.type";

type Props = {
  sessions: NoteTableSessionType[];
  onSelect: (session: NoteTableSessionType) => void;
  triggerLabel?: string;
};

export default function SelectSessionDialog({
  sessions,
  onSelect,
  triggerLabel = "Select Session",
}: Props) {
  const [showOlder, setShowOlder] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [availableSessions, setAvailableSessions] =
    useState<NoteTableSessionType[]>(sessions);
  useEffect(() => {
    setAvailableSessions(sessions);
  }, [sessions]);


  const filteredSessions = showOlder
    ? availableSessions.filter(
        (s) =>
          filterDate &&
          format(s.date, "yyyy-MM-dd") === format(filterDate, "yyyy-MM-dd")
      )
    : availableSessions.filter((s) => isToday(s.date) || isYesterday(s.date));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Select a Session</DialogTitle>
        </DialogHeader>

        {!showOlder && (
          <div className="space-y-2">
            {filteredSessions.map((s) => (
              <div key={s._id} className="border p-3 rounded-md space-y-1">
                <p className="text-sm font-medium">{s.meetingName}</p>
                <p className="text-xs text-muted-foreground">
                  {format(s.date, "MMM dd, yyyy")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Module: {s.module}
                </p>
                <p className="text-xs text-muted-foreground">
                  Chapter: {s.chapter.toString()}
                </p>
                {/* <p className="text-xs text-muted-foreground">
                  Instructor: {s.instructor}
                </p> */}
                <Button size="sm" className="mt-1" onClick={() => onSelect(s)}>
                  Select
                </Button>
              </div>
            ))}

            <Button variant="link" size="sm" onClick={() => setShowOlder(true)}>
              Search Older Session
            </Button>
          </div>
        )}

        {showOlder && (
          <div>
            <Calendar
              mode="single"
              selected={filterDate}
              onSelect={setFilterDate}
            />
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowOlder(false)}
            >
              Back
            </Button>

            {filterDate && filteredSessions.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                No sessions found for selected date.
              </p>
            )}

            {filterDate &&
              filteredSessions.map((s) => (
                <div
                  key={s._id}
                  className="border p-3 rounded-md space-y-1 mt-2"
                >
                  <p className="text-sm font-medium">{s.meetingName}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(s.date, "MMM dd, yyyy")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Module: {s.module}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Chapter: {s.chapter}
                  </p>
                  {/* <p className="text-xs text-muted-foreground">
                    Instructor: {s.instructor}
                  </p> */}
                  <Button
                    size="sm"
                    className="mt-1"
                    onClick={() => onSelect(s)}
                  >
                    Select
                  </Button>
                </div>
              ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
