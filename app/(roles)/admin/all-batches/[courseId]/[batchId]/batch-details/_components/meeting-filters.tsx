"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, SortDesc, Filter } from "lucide-react";
import { useState } from "react";

type FilterState = {
  search: string;
  status: string;
  sortOrder: "asc" | "desc";
};

type MeetingFiltersProps = {
  onFilterChange: (filters: FilterState) => void;
};

const MeetingFilters = ({ onFilterChange }: MeetingFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    sortOrder: "desc",
  });

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search meetings..."
          className="pl-9 bg-white"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        {/* Status Filter */}
        <div className="w-[140px]">
          <Select
            value={filters.status}
            onValueChange={(val) => handleChange("status", val)}
          >
            <SelectTrigger className="bg-white">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-gray-500" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="rescheduled">Rescheduled</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="w-[140px]">
          <Select
            value={filters.sortOrder}
            onValueChange={(val: "asc" | "desc") => handleChange("sortOrder", val)}
          >
            <SelectTrigger className="bg-white">
              <div className="flex items-center gap-2">
                {filters.sortOrder === "asc" ? (
                  <SortAsc className="h-3.5 w-3.5 text-gray-500" />
                ) : (
                  <SortDesc className="h-3.5 w-3.5 text-gray-500" />
                )}
                <SelectValue placeholder="Sort" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MeetingFilters;
