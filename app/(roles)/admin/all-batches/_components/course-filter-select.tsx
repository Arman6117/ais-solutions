"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import React from "react";
import { coursesWithBatches } from "@/lib/static";

interface Props {
  selectedCourse: string;
  onSelectCourse: (course: string) => void;
}

const CourseFilterSelect: React.FC<Props> = ({
  selectedCourse,
  onSelectCourse,
}) => {
  const courseNames = ["All", ...new Set(coursesWithBatches.map((c) => c.name))];

  return (
    <Select value={selectedCourse} onValueChange={onSelectCourse}>
      <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950 w-48">
        <Filter className="size-4 text-primary-bg" />
        <SelectValue placeholder="Select course" />
      </SelectTrigger>
      <SelectContent>
        {courseNames.map((name) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CourseFilterSelect;
