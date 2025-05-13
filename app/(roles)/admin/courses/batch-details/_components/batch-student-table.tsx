import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DummyStudent } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

const studentTableCol = [
  {
    id: "name",
    header: "Student Name",
    accessor: (row: DummyStudent) => row.name,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row: DummyStudent) => row.email,
  },
  {
    id: "phone",
    header: "Phone",
    accessor: (row: DummyStudent) => row.phone,
  },
  {
    id: "joinedAt",
    header: "Joined At",
    accessor: (row: DummyStudent) => row.joinedAt,
  },
  {
    id: "feesStatus",
    header: "Fees Status",
    accessor: (row: DummyStudent) => row.feesStatus,
  },
];
const studentTableFilter = [
  {
    label: "Student:High to Low",
    value: "student-asc",
  },
  {
    label: "Student:Low to High",
    value: "student-desc",
  },
  {
    label: "Batches:High to Low",
    value: "batches-asc",
  },
  {
    label: "Batches:Low to High",
    value: "batches-desc",
  },
];
const BatchStudentTable = ({
  mode,
  dummyStudents,
  courseId,
  batchId,
}: {
  mode: "view" | "edit" |'create';
  dummyStudents: DummyStudent[];
  courseId: string;
  batchId: string;
}) => {
  return (
    <>
      <Card className="border-0 w-full shadow-md p-0 mb-10 overflow-hidden mt-">
        <CardHeader
          className={cn(
            "px-8 py-6 flex justify-between",
            mode === "view"
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
              : "bg-gray-50 border-b"
          )}
        >
          <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
            Students of the Batch
          </CardTitle>

          <div>
            <Button className="bg-white hover:bg-purple-50 text-black cursor-pointer">
              Add Student
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={dummyStudents}
            columns={studentTableCol}
            href={`/admin/courses/batch-details/${courseId}/batch/${batchId}`}
            searchPlaceholder="Search by email or name"
            getRowId={(row) => row.id}
            onDeleteSelected={(ids) => {
              toast.success(`${ids.length} courses deleted successfully`); //TODO: make delete API call
            }}
            openDialog={() => {}}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default BatchStudentTable;
