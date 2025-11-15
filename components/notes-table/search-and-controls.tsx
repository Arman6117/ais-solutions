import { Filter, Search, Trash2 } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type SearchAndControlsProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleSortDirection: () => void;
  sortDirection: "asc" | "desc";
  selectedRows: Set<string>; // Changed from Set<number>
  handleBulkDelete: () => void;
};

const SearchAndControls = ({
  searchTerm,
  setSearchTerm,
  toggleSortDirection,
  sortDirection,
  selectedRows,
  handleBulkDelete,
}: SearchAndControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by module, chapter or file..."
          className="pl-8 w-full sm:w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={toggleSortDirection}
          >
            <Filter className="size-4" />
            Sort by date {sortDirection === "asc" ? "↑" : "↓"}
          </Button>

          {selectedRows.size > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="size-4" />
              Delete ({selectedRows.size})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndControls;
