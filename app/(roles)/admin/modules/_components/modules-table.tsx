"use client";
import { deleteModules } from "@/actions/admin/modules/delete-module";
import { getAllModulesTable } from "@/actions/admin/modules/get-modules";
import { DataTable } from "@/components/data-table";
import { dummyModules } from "@/lib/static";
import { Column, FilterOption } from "@/lib/types/types";
import { format } from "date-fns";
import { BookOpen, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiStarFill } from "react-icons/pi";
import { toast } from "sonner";

// Sample data

type ModuleTableData = {
  _id: string;
  name: string;
  course: string[];
  price: number;
  discount: number;
  offerPrice?: number;
  createdAt: string;
  rating: number;
};
const columns: Column<ModuleTableData>[] = [
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
    accessor: (row) => `₹${row.price - (row.price * row.discount) / 100}`,
  },
  {
    id: "createdAt",
    header: "Date Created",
    accessor: (row) => format(row.createdAt, "PP"),
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
  { value: "rating-asc", label: "Rating: Low to High" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export default function ModulesDataTable() {
  const [modules, setModules] = useState<ModuleTableData[] | []>([]);
  const [tableKey, setTableKey] = useState(0);

  const handleDeleteSelected = async (selectedIds: string[] | string) => {
    try {
      const res = await deleteModules(selectedIds);
      if (res.success) {
        toast.success(res.message);
        await fetchModules(); 
        setTableKey((prev) => prev + 1);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete modules");
      console.error("Error deleting modules:", error);
    }
  };
  const fetchModules = async () => {
    try {
      const res = await getAllModulesTable();
      if (res.success) {
        setModules(res.data!);
      } else {
        console.error(res.message);
        setModules([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);
  return (
    <>
      <DataTable
      key={tableKey}
        data={modules}
        columns={columns}
        searchPlaceholder="Search modules..."
        filterOptions={filterOptions}
        onDeleteSelected={handleDeleteSelected}
        getRowId={(row) => row._id}
        href={`/admin/modules/module-details/`}
      />
    </>
  );
}
