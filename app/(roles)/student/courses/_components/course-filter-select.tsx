import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import React from "react";

type CourseFilterSelectProps = {
  levelFilter: string;
  setLevelFilter: (level: string) => void;
};
const CourseFilterSelect = ({
  levelFilter,
  setLevelFilter,
}: CourseFilterSelectProps) => {
  return (
    <Select value={levelFilter} onValueChange={(val) => setLevelFilter(val)} >
      <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <Filter className="size-4 text-primary-bg" />
        <SelectValue placeholder="Select level"  />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="Beginner">Beginner</SelectItem>
        <SelectItem value="Intermediate">Intermediate</SelectItem>
        <SelectItem value="Advanced">Advanced</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CourseFilterSelect;
