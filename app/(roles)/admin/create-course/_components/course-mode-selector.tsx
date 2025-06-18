import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mode } from "@/lib/types";
import React from "react";
import { MdClass } from "react-icons/md";

type CourseModeSelectorProps = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};
const CourseModeSelector = ({ mode, setMode }: CourseModeSelectorProps) => {
  return (
    <Select value={mode} onValueChange={(val: Mode) => setMode(val)}>
      <SelectTrigger className="flex gap-2 ml-6  w-64 text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <MdClass className="size-4 text-primary-bg" />
        <SelectValue placeholder="Select Mode" />
      </SelectTrigger>
      <SelectContent className="w-64">
        <SelectItem value="online">Online</SelectItem>
        <SelectItem value="offline">Offline</SelectItem>
        <SelectItem value="hybrid">Hybrid</SelectItem>
        
      </SelectContent>
    </Select>
  );
};

export default CourseModeSelector;
