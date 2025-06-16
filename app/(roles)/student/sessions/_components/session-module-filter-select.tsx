import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCopyIcon, Filter } from "lucide-react";
import React from "react";

type SessionModuleFilterSelectProps = {
  moduleFilter: string[] | undefined;
  setModuleFilter?: (filter: string) => void;
};
const SessionModuleFilterSelect = ({
  moduleFilter,
  setModuleFilter,
}: SessionModuleFilterSelectProps) => {
  return (
    <Select
      value={moduleFilter?.[0] ?? ""}
      //   onValueChange={(val: string) =>
      //     setModuleFilter(val)
      //   }
    >
      <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
        <BookCopyIcon className="size-4 text-primary-bg" />
        <SelectValue placeholder="Module" />
      </SelectTrigger>
      <SelectContent>
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
