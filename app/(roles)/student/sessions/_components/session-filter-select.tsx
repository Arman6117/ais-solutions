import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import React from "react";

type SessionFilterSelectProps = {
  filter: "all" | "upcoming" | "attended" | "missed";
  setFilter: (filter: "all" | "upcoming" | "attended" | "missed") => void;
};
const SessionFilterSelect = ({
  filter,
  setFilter,
}: SessionFilterSelectProps) => {
  return (
    <Select
      value={filter}
      onValueChange={(val: "all" | "upcoming" | "attended" | "missed") =>
        setFilter(val)
      }
    >
      <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <Filter className="size-4 text-primary-bg" />
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="upcoming">Upcoming</SelectItem>
        <SelectItem value="attended">Attended</SelectItem>
        <SelectItem value="missed">Missed</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SessionFilterSelect;
