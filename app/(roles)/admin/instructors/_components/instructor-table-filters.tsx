import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  selectedModule: string;
  selectedBatch: string;
  setSelectedModule: (val: string) => void;
  setSelectedBatch: (val: string) => void;
  uniqueModules: string[];
  filteredBatches: string[];
};

const InstructorTableFilters = ({
  selectedModule,
  selectedBatch,
  setSelectedModule,
  setSelectedBatch,
  uniqueModules,
  filteredBatches,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 ">
      <div className="">
        <Select value={selectedModule} onValueChange={(val) => {
          setSelectedModule(val);
          setSelectedBatch("all"); 
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            {uniqueModules.map((module) => (
              <SelectItem key={module} value={module}>
                {module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedModule !== "all" && (
        <div className="">
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {filteredBatches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default InstructorTableFilters;
