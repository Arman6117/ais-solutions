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
  filter: "all" | "attended" | "missed";
  setFilter: (filter: "all" | "attended" | "missed") => void;
};
const SessionFilterSelect = ({
  filter,
  setFilter,
}: SessionFilterSelectProps) => {
  return (
    <Select
      value={filter}
      onValueChange={(val: "all" | "attended" | "missed") =>
        setFilter(val)
      }
    >
      <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <Filter className="size-4 text-primary-bg" />
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="attended">Attended</SelectItem>
        <SelectItem value="missed">Missed</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SessionFilterSelect;
