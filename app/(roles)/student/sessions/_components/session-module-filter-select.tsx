import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCopyIcon } from "lucide-react";
import React from "react";

type SessionModuleFilterSelectProps = {
  moduleFilter: string[] | undefined;
  selectedModule: string;
  setModuleFilter: (filter: string) => void;
};

const SessionModuleFilterSelect = ({
  moduleFilter,
  selectedModule,
  setModuleFilter,
}: SessionModuleFilterSelectProps) => {
  return (
    <Select value={selectedModule} onValueChange={setModuleFilter}>
      <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <BookCopyIcon className="size-4 text-primary-bg" />
        <SelectValue placeholder="All Modules" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Modules</SelectItem>
        {moduleFilter?.map((module, idx) => (
          <SelectItem value={module} key={idx}>
            {module}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SessionModuleFilterSelect;
