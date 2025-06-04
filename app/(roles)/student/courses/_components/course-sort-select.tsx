import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter } from "lucide-react";
import React from "react";
import { RiOrderPlayFill } from "react-icons/ri";

type CourseSortSelectProps = {
  sortBy: "price" | "date";
  setSortBy: (by: "price" | "date") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
};
const CourseSortSelect = ({
  sortBy,
  setSortBy,
  setSortOrder,
  sortOrder,
}: CourseSortSelectProps) => {
  return (
    <>
      <Select
        value={sortBy}
        onValueChange={(value) => setSortBy(value as "price" | "date")}
      >
        <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
          <Calendar className="size-4 text-primary-bg" />
          <SelectValue placeholder="Select sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Sort by Date</SelectItem>
          <SelectItem value="price">Sort by Price</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
      >
        <SelectTrigger className="flex gap-2 size-auto text-xs sm:text-sm border-primary-bg font-medium text-violet-950">
          <RiOrderPlayFill className="size-4 text-primary-bg" />
          <SelectValue placeholder="Select sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default CourseSortSelect;
