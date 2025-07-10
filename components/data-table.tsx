"use client";
import React, { useMemo, useState, useEffect } from "react";
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

import { ArrowRight, Menu, PencilIcon, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import DeleteSelectedDialog from "./delete-selected-dialog";
import DeleteDialog from "./delete-selected-dialog";

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder: string;
  filterOptions?: FilterOption[];
  onDeleteSelected: (selectedIds: string[]) => void;
  getRowId: (row: T) => string;
  href: string;
  openDialog?: (item: T) => void;
  additionalFilter?: React.ReactNode;
};

export function DataTable<T>({
  columns,
  data,
  filterOptions,
  getRowId,
  href,
  onDeleteSelected,
  searchPlaceholder = "Search...",
  openDialog,
  additionalFilter,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const pageSize = isMobile ? 5 : 10;

  const filteredData = useMemo(() => {
    let sorted = [...data];

    if ((filterOptions?.length ?? 0) > 0 && sortType) {
      const [key, order] = sortType.split("-");
      if (key && order) {
        sorted.sort((a, b) => {
          const aVal = (a as any)[key];
          const bVal = (b as any)[key];

          if (typeof aVal === "number" && typeof bVal === "number") {
            return order === "asc" ? aVal - bVal : bVal - aVal;
          }

          const aStr = String(aVal).toLowerCase();
          const bStr = String(bVal).toLowerCase();

          return order === "asc"
            ? aStr.localeCompare(bStr)
            : bStr.localeCompare(aStr);
        });
      }
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

  //! Card view for mobile
  const renderCardView = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 border">
              <div className="flex justify-between items-center mb-2">
                <Checkbox
                  checked={selectedIds.includes(getRowId(item))}
                  onCheckedChange={() => handleToggleSelect(getRowId(item))}
                  className="mr-2"
                />
                <div className="flex gap-2">
                  <Button
                    className="flex items-center size-7 justify-center rounded-full cursor-pointer hover:bg-primary-bg hover:text-white"
                    variant="outline"
                    onClick={() =>
                      router.push(`${href}/${getRowId(item)}?mode=edit`)
                    }
                  >
                    <PencilIcon className="size-4" />
                  </Button>
                  <DeleteDialog
                    onDelete={onDeleteSelected}
                    singleId={getRowId(item)}
                  />
                </div>
              </div>
              <Link
                href={`${href}/${getRowId(item)}?mode=view`}
                className="block"
              >
                {columns.map((col, index) => (
                  <div key={col.id} className="py-1 border-b last:border-b-0">
                    <div className="font-medium text-sm text-gray-500">
                      {col.header}
                    </div>
                    <div>{col.accessor(item)}</div>
                  </div>
                ))}
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-muted-foreground">No data found.</p>
          </div>
        )}
      </div>
    );
  };

  //! Table view for desktop
  const renderTableView = () => {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="text-center w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead className="text-center" key={column.id}>
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="text-center w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold text-center">
                    <Checkbox
                      checked={selectedIds.includes(getRowId(item))}
                      onCheckedChange={() => handleToggleSelect(getRowId(item))}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell className="text-center" key={col.id}>
                      <Link href={`${href}/${getRowId(item)}?mode=view`}>
                        {col.accessor(item)}
                      </Link>
                    </TableCell>
                  ))}
                  <TableCell className="text-center flex gap-2 justify-center items-center">
                    <Button
                      className="flex items-center size-7 justify-center rounded-full cursor-pointer hover:bg-primary-bg hover:text-white"
                      variant="outline"
                      onClick={() =>
                        router.push(`${href}/${getRowId(item)}?mode=edit`)
                      }
                    >
                      <PencilIcon className="size-4" />
                    </Button>
                    <DeleteDialog
                      onDelete={onDeleteSelected}
                      singleId={getRowId(item)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="text-center text-muted-foreground h-24"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  //! Render mobile search
  const renderMobileSearch = () => {
    if (isSearchExpanded) {
      return (
        <div className="flex items-center gap-2 w-full mb-4">
          <Input
            value={searchTerm}
            placeholder={searchPlaceholder}
            className="text-base font-medium focus-visible:ring-1 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
            autoFocus
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsSearchExpanded(false)}
            className="shrink-0"
          >
            <X className="size-5" />
          </Button>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center w-full mb-4">
        <Button
          variant="outline"
          className="text-sm px-3"
          onClick={() => setIsSearchExpanded(true)}
        >
          <Search className="mr-2 size-4" />
          Search
        </Button>

        {selectedIds.length > 0 && (
          <DeleteDialog onDelete={onDeleteSelected} selectedIds={selectedIds} />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Desktop controls */}
      {!isMobile && (
        <div className="flex flex-col  gap-3 md:gap-6 md:s-center">
          <div className="flex gap-2 w-full md:w-auto md:flex-1">
            <Input
              value={searchTerm}
              placeholder={searchPlaceholder}
              className="text-base font-medium focus-visible:ring-1 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
            />
            <Button
              className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
              onClick={() => {
                setSearchTerm(searchTerm);
              }}
            >
              <ArrowRight />
            </Button>
          </div>

          {(filterOptions ?? []).length > 0 && (
            <div className="flex gap-2 items-center flex-wrap">
              <Select
                value={sortType}
                onValueChange={(val) => {
                  setSortType(val);
                  setCurrentPage(0);
                }}
              >
                <SelectTrigger className="w-full md:w-48 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200 focus-visible:ring-2 font-semibold">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="text-sm font-semibold p-2">
                  {filterOptions?.map((option) => (
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
              {additionalFilter && <>{additionalFilter}</>}
            </div>
          )}
          {selectedIds.length > 0 && (
            <DeleteDialog
            onDelete={onDeleteSelected}
            selectedIds={selectedIds}
          />
          )}
        </div>
      )}

      {/* Mobile controls */}
      {isMobile && renderMobileSearch()}

      {/* Mobile filters */}
      {isMobile && (filterOptions ?? []).length > 0 && (
        <div className="flex gap-2 mb-4">
          <Select
            value={sortType}
            onValueChange={(val) => {
              setSortType(val);
              setCurrentPage(0);
            }}
          >
            <SelectTrigger className="w-full focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200 focus-visible:ring-2 text-sm">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="text-sm p-2">
              {filterOptions?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80 shrink-0"
            onClick={handleReset}
            size="sm"
          >
            Reset
          </Button>
        </div>
      )}

      {/* Render table or cards based on screen size */}
      {isMobile ? renderCardView() : renderTableView()}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  currentPage === 0 ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              />
            </PaginationItem>
            <div className="text-sm mx-2">
              Page {currentPage + 1} of {totalPages}
            </div>
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  currentPage + 1 >= totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
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
