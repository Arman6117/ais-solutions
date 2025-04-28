"use client";
import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Column, FilterOption } from "@/lib/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { ArrowRight, EllipsisVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder: string;
  filterOptions: FilterOption[];
  onDeleteSelected: (selectedIds: string[]) => void;
  getRowId: (row: T) => string;
};

export function DataTable<T>({
  columns,
  data,
  filterOptions,
  getRowId,
  onDeleteSelected,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const pageSize = 3; //TODO:Later make 10-20

  const filteredData = useMemo(() => {
    let sorted = [...data];

    if (sortType) {
      const [key, order] = sortType.split("-");
      sorted.sort((a, b) => {
        const aVal = (a as any)[key];
        const bVal = (b as any)[key];
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    }
    return sorted.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortType, data]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = filteredData.map((item) => getRowId(item));
    const allSelected = allIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allIds.includes(id)));
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...allIds.filter((id) => !prev.includes(id)),
      ]);
    }
    toast.success(`${allIds.length} items selected`);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSortType("");
    setCurrentPage(0);
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedIds.includes(getRowId(item)));

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-7">
        <div className="flex gap-3 w-full">
          <Input
            value={searchTerm}
            placeholder={searchPlaceholder}
            className="max-w-sm text-lg font-medium focus-visible:ring-1 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
          <Button
            className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
            onClick={() => {
              setSearchTerm(searchTerm);
              //TODO: Implement server action to search courses
            }}
          >
            <ArrowRight />
          </Button>
        </div>
        {filterOptions.length > 0 && (
          <div className="flex gap-2">
            <Select
              value={sortType}
              onValueChange={(val) => {
                setSortType(val);
                setCurrentPage(0);
              }}
            >
              <SelectTrigger className="w-48 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200 focus-visible:ring-2 font-semibold">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="text-sm font-semibold p-2">
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
              onClick={handleReset}
            >
              Reset
            </Button>
            {selectedIds.length > 0 && (
              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={() => onDeleteSelected(selectedIds)}
              >
                <Trash2 />({selectedIds.length})
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold ">
                    <Checkbox
                      checked={selectedIds.includes(getRowId(item))}
                      onCheckedChange={() => handleToggleSelect(getRowId(item))}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.id}>{col.accessor(item)}</TableCell>
                  ))}
                  <TableCell className="text-center">
                    <Button
                      className="rounded-full
                    cursor-pointer"
                      variant={"ghost"}
                    >
                      <EllipsisVertical className="text-black" size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
              className="cursor-pointer"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
               className="cursor-pointer"
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev + 1 < totalPages ? prev + 1 : prev
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
