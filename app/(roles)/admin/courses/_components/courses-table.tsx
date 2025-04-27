"use client";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ArrowRight, EllipsisVertical, SortDesc } from "lucide-react";
import { coursesData } from "@/lib/static";
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

const CoursesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCourses,setSelectedCourses] = useState<Number[]>([])
  const [toggleSelectAll,setToggleSelectAll] = useState(false)

  const pageSize = 3; //TODO:Later make 10-20

  const filteredCourses = useMemo(() => {
    let sortedCourse = [...coursesData];

    //*Default sort by creation date
    sortedCourse.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    if (sortType === "batch-asc") {
      sortedCourse.sort((a, b) => a.batches - b.batches);
    } else if (sortType === "batch-desc") {
      sortedCourse.sort((a, b) => b.batches - a.batches);
    } else if (sortType === "std-asc") {
      sortedCourse.sort((a, b) => a.students - b.students);
    } else if (sortType === "std-desc") {
      sortedCourse.sort((a, b) => b.students - a.students);
    }

    return sortedCourse.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortType]);
  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const paginatedCourses = filteredCourses.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
  const handleResetFilters = () => {
    setSearchTerm("");
    setSortType("");
    setCurrentPage(0);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-7">
        <div className="flex gap-3 w-full">
          <Input
            value={searchTerm}
            placeholder="Search by Course Name...."
            className="max-w-sm text-lg font-medium focus-visible:ring-1 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200"
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="flex gap-2">
          <Select
            value={sortType}
            onValueChange={(val) => {
              setSortType(val);
              setCurrentPage(0);
            }}
          >
            <SelectTrigger className="w-48 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200 focus-visible:ring-2 font-semibold">
              <SelectValue placeholder="Sort Courses" />
            </SelectTrigger>
            <SelectContent className="text-sm font-semibold p-2">
              <SelectItem value="batch-asc">Batches: Low to High</SelectItem>
              <SelectItem value="batch-desc">Batches: High to Low</SelectItem>
              <SelectItem value="std-asc">Students: Low to High</SelectItem>
              <SelectItem value="std-desc">Students: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead><Checkbox  onCheckedChange={(prev)=>setToggleSelectAll(!!prev)}/></TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>No. of Students</TableHead>
              <TableHead>No. of Batches</TableHead>
              <TableHead>No. of Completed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold ">
                    <Checkbox checked={toggleSelectAll}/>
                  </TableCell>
                  <TableCell className="font-semibold ">
                    {course.name}
                  </TableCell>
                  <TableCell>{course.createdAt}</TableCell>
                  <TableCell className="text-center">
                    {course.students}
                  </TableCell>
                  <TableCell className="text-center">
                    {course.batches}
                  </TableCell>
                  <TableCell className="text-center">
                    {course.batchesCompleted}
                  </TableCell>
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
                  No courses found.
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
};

export default CoursesTable;
