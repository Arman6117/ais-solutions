"use client";
import { DataTable } from "@/components/data-table";
import { Column, FilterOption } from "@/lib/types";
import { BookOpen, Star } from "lucide-react";
import { PiStarFill } from "react-icons/pi";

// Sample data
const dummyModules = [
  {
    id: "1",
    name: "Module 1",
    createdAt: "2024-06-15",
    course: ["Course 1", "Course 2", "Course 3", "Course 4"],
    price: 1000,
    discount: 10,
    offerPrice: 900,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Module 2",
    createdAt: "2024-06-15",
    course: ["Course 1"],
    price: 1000,
    discount: 10,
    offerPrice: 900,
    rating: 4,
  },
  {
    id: "3",
    name: "Module 3",
    createdAt: "2024-06-15",
    course: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"],
    price: 6000,
    discount: 10,
    offerPrice: 5900,
    rating: 5,
  },
  {
    id: "4",
    name: "Module 1",
    createdAt: "2024-06-15",
    course: ["Course 1", "Course 2"],
    price: 5000,
    discount: 10,
    offerPrice: 4900,
    rating: 2,
  },
];

const columns: Column<(typeof dummyModules)[0]>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
  },
  {
    id: "course",
    header: "Courses",
    accessor: (row) => {
      if (Array.isArray(row.course)) {
        if (row.course.length <= 2) {
          return (
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="size-3 text-primary-bg" />
              <span>{row.course.join(", ")}</span>
            </div>
          );
        } else {
          const remaining = row.course.length - 2;

          return (
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="size-3 text-primary-bg" />
              <span>
                {row.course.slice(0, 2).join(", ")} +{remaining} more
              </span>
            </div>
          );
        }
      }
      return row.course || "-";
    },
  },
  {
    id: "price",
    header: "Price",
    accessor: (row) => `₹${row.price}`,
  },
  {
    id: "discount",
    header: "Discount",
    accessor: (row) => `${row.discount}%`,
  },
  {
    id: "offerPrice",
    header: "Offer Price",
    accessor: (row) => `₹${row.offerPrice}`,
  },
  {
    id: "rating",
    header: "Rating",
    accessor: (row) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <span>{row.rating}</span>
          <PiStarFill className="size-3 text-yellow-500" />
        </div>
      );
    },
  },
];

// Filter options
const filterOptions: FilterOption[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export default function ModulesDataTable() {
  const handleDeleteSelected = (selectedIds: string[]) => {
    // console.log("Delete", selectedIds);
    alert(`Would delete ${selectedIds.length} items`);
  };

  return (
    <>
      <DataTable
        data={dummyModules}
        columns={columns}
        searchPlaceholder="Search modules..."
        filterOptions={filterOptions}
        onDeleteSelected={handleDeleteSelected}
        getRowId={(row) => row.id}
        href={`/admin/courses/module-details/`}
      />
    </>
  );
}
