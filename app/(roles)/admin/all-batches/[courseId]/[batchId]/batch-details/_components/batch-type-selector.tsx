import EditBatchInfo from "@/components/edit-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BatchType } from "@/lib/types";

import { CheckCircle, University } from "lucide-react";
import React from "react";
import { MdBookOnline } from "react-icons/md";

const BatchTypeSelector = ({
  batchType,
  setBatchType,
}: {
  batchType: BatchType;
  setBatchType: (val: BatchType) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <EditBatchInfo
        label="Batch Type"
        icon={<University className="text-indigo-600 mr-2" size={20} />}
      >
        <Select
          value={batchType}
          onValueChange={(val: BatchType) => {
            setBatchType(val);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue
              // className={`${batchTypeColor.bg}`}
              placeholder="Batch Type"

            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`focus:bg-green-50`} value="Weekend">
              Weekend
            </SelectItem>
            <SelectItem className={`focus:bg-blue-50`} value="Weekdays">
              Weekdays
            </SelectItem>
            
          </SelectContent>
        </Select>
      </EditBatchInfo>
    </div>
  );
};

export default BatchTypeSelector;
