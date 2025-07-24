import EditBatchInfo from "@/components/edit-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mode } from "@/lib/types";

import { CheckCircle } from "lucide-react";
import React from "react";
import { MdBookOnline } from "react-icons/md";

const BatchModeSelector = ({
  batchMode,
  setBatchMode,
}: {
  batchMode: Mode;
  setBatchMode: (val: Mode) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <EditBatchInfo
        label="BatchMode"
        icon={<MdBookOnline className="text-indigo-600 mr-2" size={20} />}
      >
        <Select
          value={batchMode}
          onValueChange={(val: Mode) => {
            setBatchMode(val);
          }}
        >
          <SelectTrigger className="w-[280px]" value={batchMode}>
            <SelectValue
              // className={`${batchModeColor.bg}`}
              placeholder="Batch Mode"


            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`focus:bg-green-50`} value="Online">
              Online
            </SelectItem>
            <SelectItem className={`focus:bg-blue-50`} value="Offline">
              Offline
            </SelectItem>
            <SelectItem className={`focus:bg-amber-50`} value="Hybrid">
              Hybrid
            </SelectItem>
          </SelectContent>
        </Select>
      </EditBatchInfo>
    </div>
  );
};

export default BatchModeSelector;
