import EditBatchInfo from "@/components/batch-components/edit-batch-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CheckCircle } from "lucide-react";
import React from "react";

const BatchStatusSelector = ({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (val: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <EditBatchInfo
        label="Status"
        icon={<CheckCircle className="text-indigo-600 mr-2" size={20} />}
      >
        <Select
          value={status}
          onValueChange={(val) => {
            setStatus(val);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue
              // className={`${statusColor.bg}`}
              placeholder="Status"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`focus:bg-green-50`} value="Ongoing">
              Ongoing
            </SelectItem>
            <SelectItem className={`focus:bg-blue-50`} value="Upcoming">
              Upcoming
            </SelectItem>
            <SelectItem className={`focus:bg-amber-50`} value="Completed">
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </EditBatchInfo>
    </div>
  );
};

export default BatchStatusSelector;
