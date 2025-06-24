'use client';
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
import { useState } from "react";
import { Input } from "../ui/input";
import { Session } from "@/lib/types";

type Props = {
  sessions: Session[];
  onSelect: (session: Session) => void;
  triggerLabel?: string;
};

export default function SelectSessionDialog({ sessions, onSelect, triggerLabel = "Select Session" }: Props) {
  const [showOlder, setShowOlder] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);

  const today = new Date();

  const filteredSessions = showOlder
    ? sessions.filter((s) => filterDate && format(s.date, "yyyy-MM-dd") === format(filterDate, "yyyy-MM-dd"))
    : sessions.filter((s) => isToday(s.date) || isYesterday(s.date));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Select a Session</DialogTitle>
        </DialogHeader>

        {!showOlder && (
          <div className="space-y-2">
            {filteredSessions.map((s) => (
              <div key={s.id} className="border p-3 rounded-md space-y-1">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">{format(s.date, "MMM dd, yyyy")}</p>
                <p className="text-xs text-muted-foreground">Module: {s.module}</p>
                <p className="text-xs text-muted-foreground">Chapter: {s.chapter}</p>
                <p className="text-xs text-muted-foreground">Instructor: {s.instructor}</p>
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
            <Calendar mode="single" selected={filterDate} onSelect={setFilterDate} />
            <Button variant="link" size="sm" onClick={() => setShowOlder(false)}>
              Back
            </Button>

            {filterDate && filteredSessions.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">No sessions found for selected date.</p>
            )}

            {filterDate && filteredSessions.map((s) => (
              <div key={s.id} className="border p-3 rounded-md space-y-1 mt-2">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">{format(s.date, "MMM dd, yyyy")}</p>
                <p className="text-xs text-muted-foreground">Module: {s.module}</p>
                <p className="text-xs text-muted-foreground">Chapter: {s.chapter}</p>
                <p className="text-xs text-muted-foreground">Instructor: {s.instructor}</p>
                <Button size="sm" className="mt-1" onClick={() => onSelect(s)}>
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
