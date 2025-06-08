import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "@/components/ui/select";

import { Calendar } from "lucide-react";
import React from "react";

type SessionSortSelectProps = {
  sortBy: "newest" | "oldest";
  setSortBy: (sort: "newest" | "oldest") => void;
};
const SessionSortSelect = ({ setSortBy, sortBy }: SessionSortSelectProps) => {
  return (
    <Select
      value={sortBy}
      onValueChange={(value) => setSortBy(value as "newest" | "oldest")}
    >
      <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <Calendar className="size-4 text-primary-bg" />
        <SelectValue placeholder="Sort By.." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SessionSortSelect;
