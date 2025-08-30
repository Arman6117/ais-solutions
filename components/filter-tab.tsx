import React from "react";
import { Button } from "@/components/ui/button";
import { ModuleStatus } from "./modules-card";


interface StatusCounts {
  all: number;
  ongoing: number;
  upcoming: number;
  completed: number;
}

interface FilterTabsProps {
  filter: ModuleStatus | "all";
  statusCounts: StatusCounts;
  onFilterChange: (filter: ModuleStatus | "all") => void;
}

export default function FilterTabs({
  filter,
  statusCounts,
  onFilterChange,
}: FilterTabsProps) {
  const filterTabs = [
    { key: "all", label: "All", count: statusCounts.all },
    { key: "Ongoing", label: "Ongoing", count: statusCounts.ongoing },
    { key: "Upcoming", label: "Upcoming", count: statusCounts.upcoming },
    { key: "Completed", label: "Completed", count: statusCounts.completed },
  ];

  return (
    <div className="flex gap-2 mt-6">
      {filterTabs.map(({ key, label, count }) => (
        <Button
          key={key}
          onClick={() => onFilterChange(key as ModuleStatus | "all")}
          className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            filter === key
              ? "bg-white text-indigo-600 shadow-lg"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {label} ({count})
        </Button>
      ))}
    </div>
  );
}