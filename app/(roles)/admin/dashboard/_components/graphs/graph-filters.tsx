import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarRange } from "lucide-react";
import React from "react";

type GraphFiltersProps = {
  year?: string;
  setYear?: (year: string) => void;
  month?: string;
  setMonth?: (month: string) => void;
  startDate?: string;
  setStartDate?: (date: string) => void;
  endDate?: string;
  setEndDate?: (date: string) => void;
  resetFilters?: () => void;
  course?: string;
  setCourse?: (value: string) => void;
  batch?: string;
  setBatch?: (value: string) => void;
  courseOptions?: string[];
  batchOptions?: string[];
};
const GraphFilters = ({
  setYear,
  year,
  month,
  setMonth,
  endDate,
  setEndDate,
  setStartDate,
  startDate,
  resetFilters,
  course, 
  setCourse,
  batch,
  setBatch,
  batchOptions,
  courseOptions
}: GraphFiltersProps) => {
  return (
    <div className="flex sm:flex-row flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-center">
       {setCourse && (
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
          <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Courses</SelectItem>
            {courseOptions?.map((courseName) => (
              <SelectItem key={courseName} value={courseName}>
                {courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Batch Filter */}
      {setBatch && (
        <Select value={batch} onValueChange={setBatch}>
          <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
          <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Batches</SelectItem>
            {batchOptions?.map((batchName) => (
              <SelectItem key={batchName} value={batchName}>
                {batchName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Year Filter */}
      {setYear && (
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
            <CalendarRange className="size-4 text-primary-bg" />
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      )}
        {/* Month Filter */}
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
            {/* <Montj className="size-4 text-primary-bg" /> */}
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Months</SelectItem>
            <SelectItem value="01">January</SelectItem>
            <SelectItem value="02">February</SelectItem>
            <SelectItem value="03">March</SelectItem>
            <SelectItem value="04">April</SelectItem>
            <SelectItem value="05">May</SelectItem>
            <SelectItem value="06">June</SelectItem>
            <SelectItem value="07">July</SelectItem>
            <SelectItem value="08">August</SelectItem>
            <SelectItem value="09">September</SelectItem>
            <SelectItem value="10">October</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">December</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range */}
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="focus w-fit border-black focus-visible:-0 focus-visible:ring-2 focus-visible:ring-primary-bg"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="focus w-fit border-black focus-visible:-0 focus-visible:ring-2 focus-visible:ring-primary-bg"
        />
      </div>

      {/* Clear Filters Button */}
      <Button
        className="bg-primary-bg sm:mt-0 mt-5 cursor-pointer"
        onClick={resetFilters}
      >
        Reset
      </Button>
    </div>
  );
};

export default GraphFilters;
