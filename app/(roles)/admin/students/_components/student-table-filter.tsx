"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentTableFiltersProps {
  feeStatusFilter: string;
  genderFilter: string;
  batchFilter: string;
  uniqueFeeStatuses: string[];
  uniqueGenders: string[];
  uniqueBatches: string[];
  setFeeStatusFilter: (value: string) => void;
  setGenderFilter: (value: string) => void;
  setBatchFilter: (value: string) => void;
}

const StudentTableFilters = ({
  feeStatusFilter,
  genderFilter,
  batchFilter,
  uniqueFeeStatuses,
  uniqueGenders,
  uniqueBatches,
  setFeeStatusFilter,
  setGenderFilter,
  setBatchFilter,
}: StudentTableFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb4">
      <Select value={feeStatusFilter} onValueChange={setFeeStatusFilter}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Fee Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Fee Status</SelectItem>
          {uniqueFeeStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={genderFilter} onValueChange={setGenderFilter}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Gender</SelectItem>
          {uniqueGenders.map((gender) => (
            <SelectItem key={gender} value={gender}>
              {gender}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={batchFilter} onValueChange={setBatchFilter}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Batch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Batches</SelectItem>
          {uniqueBatches.map((batch) => (
            <SelectItem key={batch} value={batch}>
              {batch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StudentTableFilters;
