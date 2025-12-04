"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AddStudentsDialog } from "./add-student-dialog";
import { getStudentsByBatch } from "@/actions/admin/batches/get-student-by-batch-id";
import { removeStudentFromBatch } from "@/actions/admin/batches/remove-student";

// Define table row type matching Server Action output
type StudentRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  feesStatus: string;
};

const studentTableCol = [
  {
    id: "name",
    header: "Student Name",
    accessor: (row: StudentRow) => row.name,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row: StudentRow) => row.email,
  },
  {
    id: "phone",
    header: "Phone",
    accessor: (row: StudentRow) => row.phone,
  },
  {
    id: "joinedAt",
    header: "Joined At",
    accessor: (row: StudentRow) => row.joinedAt,
  },
  {
    id: "feesStatus",
    header: "Fees Status",
    accessor: (row: StudentRow) => row.feesStatus,
  },
];

const BatchStudentTable = ({
  mode,
  batchId,
}: {
  mode: "view" | "edit" | "create";
  courseId: string;
  batchId: string;
}) => {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getStudentsByBatch(batchId);
      if (res.success) {
        setStudents(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  },[batchId]);

  useEffect(() => {
    if (batchId) {
      fetchStudents();
    }
  }, [batchId,fetchStudents]);

  const handleDelete = async (ids: string[]) => {
    try {
      
      const promises = ids.map((id) => removeStudentFromBatch(id, batchId));
      const results = await Promise.all(promises);
      
      const failures = results.filter(r => !r.success);
      
      if (failures.length > 0) {
         toast.error(`Failed to remove ${failures.length} student(s)`);
      } else {
         toast.success("Students removed successfully");
      }
      
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("Error removing students");
    }
  };

  return (
    <>
      <Card className="border-0 w-full shadow-md p-0 mb-10 overflow-hidden mt-6">
        <CardHeader
          className={cn(
            "px-8 py-6 flex flex-row items-center justify-between", // Fixed layout
            mode === "view"
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
              : "bg-gray-50 border-b"
          )}
        >
          <CardTitle className="text-2xl md:text-3xl font-bold mb-0">
            Students of the Batch
          </CardTitle>

          <div>
            <AddStudentsDialog onAdd={() => {
                toast.success("Student added");
                fetchStudents(); // Refresh list after adding
            }} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
             <div className="p-8 text-center text-gray-500">Loading students...</div>
          ) : (
            <DataTable
                data={students}
                columns={studentTableCol}
                href={`/admin/students/student-details`} // Adjusted link pattern
                searchPlaceholder="Search by email or name"
                getRowId={(row) => row.id}
                onDeleteSelected={handleDelete}
                openDialog={() => {}}
                
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default BatchStudentTable;
