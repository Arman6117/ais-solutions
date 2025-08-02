"use client";
import { DataTable } from "@/components/data-table";
import { dummyStudents } from "@/lib/static";
import { DummyStudent } from "@/lib/types/types";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import StudentTableFilters from "./student-table-filter";
import { Badge } from "@/components/ui/badge";

const StudentTable = () => {
  const [feeStatusFilter, setFeeStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");

  const filteredStudents = useMemo(() => {
    return dummyStudents.filter((student) => {
      if (feeStatusFilter !== "all" && student.feesStatus !== feeStatusFilter) return false;
      if (genderFilter !== "all" && student.gender !== genderFilter) return false;
      if (
        batchFilter !== "all" &&
        !student.batches?.some((batch: string) => batch === batchFilter)
      )
        return false;
      return true;
    });
  }, [feeStatusFilter, genderFilter, batchFilter]);

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
      id: "gender",
      header: "Gender",
      accessor: (row: DummyStudent) => row.gender,
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
    {
      id: "batches",
      header: "Batches",
      accessor: (row: DummyStudent) => (
        <div className="flex flex-wrap gap-1">
          {row.batches?.map((batch: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {batch}
            </Badge>
          ))}
        </div>
      ),
    },
  ];

  const studentTableFilter = [
    { label: "Name: A to Z", value: "name-asc" },
    { label: "Name: Z to A", value: "name-desc" },
    { label: "Join Date: Newest", value: "joinedAt-desc" },
    { label: "Join Date: Oldest", value: "joinedAt-asc" },
  ];

  const uniqueFeeStatuses = useMemo(() => {
    return Array.from(new Set(dummyStudents.map((s) => s.feesStatus)));
  }, []);

  const uniqueGenders = useMemo(() => {
    return Array.from(new Set(dummyStudents.map((s) => s.gender)));
  }, []);

  const uniqueBatches = useMemo(() => {
    const allBatches = dummyStudents.flatMap((s) => s.batches || []);
    return Array.from(new Set(allBatches));
  }, []);

  return (
    <>

      {/* DataTable Component */}
      <DataTable
        columns={studentTableCol}
        data={filteredStudents}
        getRowId={(row: DummyStudent) => row.id}
        href="/admin/students/student-details"
        additionalFilter={
          <StudentTableFilters
          feeStatusFilter={feeStatusFilter}
          genderFilter={genderFilter}
          batchFilter={batchFilter}
          setFeeStatusFilter={setFeeStatusFilter}
          setGenderFilter={setGenderFilter}
          setBatchFilter={setBatchFilter}
          uniqueFeeStatuses={uniqueFeeStatuses}
          uniqueGenders={uniqueGenders}
          uniqueBatches={uniqueBatches}
        />
        }
        filterOptions={studentTableFilter}
        onDeleteSelected={(ids) => {
          toast.success(`${ids.length} students deleted successfully`);
        }}
        searchPlaceholder="Search by student name"
      />
    </>
  );
};

export default StudentTable;
