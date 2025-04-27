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
  const [selectedIds, setSelectedIds] = useState<String[]>([]);

  const pageSize = 3; //TODO:Later make 10-20

  const filteredData= useMemo(()=> {
    let sorted = [...data]
    
    if(sortType) {
        const [key,order ] = sortType.split('-')
        sorted.sort((a,b) => {
            const aVal = (a as any)[key]
            const bVal= (b as any)[key]
            return order === 'asc' ? aVal - bVal : bVal - aVal
        })
    }
  })
}
