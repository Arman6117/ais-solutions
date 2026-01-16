"use client";
import { format, isToday, isYesterday, isValid } from "date-fns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
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

  // Safe date filtering
  const filteredSessions = showOlder
    ? availableSessions.filter((s) => {
        try {
          if (!filterDate || !s.date) return false;
          const sessionDate = new Date(s.date);
          if (!isValid(sessionDate)) return false;
          return (
            format(sessionDate, "yyyy-MM-dd") ===
            format(filterDate, "yyyy-MM-dd")
          );
        } catch (error) {
          console.error("Error filtering session:", error);
          return false;
        }
      })
    : availableSessions.filter((s) => {
        try {
          if (!s.date) return false;
          const sessionDate = new Date(s.date);
          if (!isValid(sessionDate)) return false;
          return isToday(sessionDate) || isYesterday(sessionDate);
        } catch (error) {
          console.error("Error filtering session:", error);
          return false;
        }
      });

  // Safe date formatter
  const formatSessionDate = (date: Date | string) => {
    try {
      const dateObj = new Date(date);
      if (!isValid(dateObj)) return "Invalid date";
      return format(dateObj, "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date error";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select a Session</DialogTitle>
        </DialogHeader>

        {!showOlder && (
          <div className="space-y-2">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((s) => (
                    <div
                      key={s._id}
                      className="border p-3 rounded-md space-y-1 hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm font-medium">{s.meetingName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatSessionDate(s.date)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Module: {s.module}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Chapter: {s.chapter.toString()}
                      </p>
                      <Button
                        size="sm"
                        className="mt-1"
                        onClick={() => onSelect(s)}
                      >
                        Select
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No sessions found for today or yesterday.
                  </p>
                )}
              </div>
            </ScrollArea>

            <Button
              variant="link"
              size="sm"
              onClick={() => setShowOlder(true)}
              className="w-full"
            >
              Search Older Session
            </Button>
          </div>
        )}

        {showOlder && (
          <div className="space-y-4 flex flex-col items-center">
            <Calendar
              mode="single"
              selected={filterDate}
              onSelect={setFilterDate}
              className="rounded-md border mb-2"
            />

            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setShowOlder(false);
                setFilterDate(undefined);
              }}
              className="self-start"
            >
              ← Back to Recent Sessions
            </Button>

            {filterDate && (
              <div className="w-full">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground pl-1">
                  Sessions for {formatSessionDate(filterDate)}:
                </h4>
                
                {/* ScrollArea added here for older sessions results */}
                <ScrollArea className="h-[300px] w-full pr-4 border rounded-md p-2">
                  <div className="space-y-2">
                    {filteredSessions.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-12">
                        No sessions found for this date.
                      </p>
                    ) : (
                      filteredSessions.map((s) => (
                        <div
                          key={s._id}
                          className="border p-3 rounded-md space-y-1 hover:bg-gray-50 transition-colors bg-white"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium">{s.meetingName}</p>
                                <p className="text-xs text-muted-foreground">
                                    Module: {s.module}
                                </p>
                            </div>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => onSelect(s)}
                            >
                                Select
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}