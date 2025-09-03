"use client";
import { DataTable } from "@/components/data-table";

import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import StudentTableFilters from "./student-table-filter";
import { Badge } from "@/components/ui/badge";
import { getStudentTable } from "@/actions/admin/student/get-student";
import { StudentData, StudentTable as StudentTableType } from "@/lib/types/student";

const StudentTable = () => {
  const [feeStatusFilter, setFeeStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");
  const [student,setStudent]  = useState<StudentTableType[] >([])
  const fetchStudent = async() => {
     const res = await getStudentTable()
     if(res.success) {
      console.log(res)
         setStudent(res.data!)
     } else {
      setStudent([])
     }
  }

  useEffect(()=> {
    fetchStudent()
  },[])
  const filteredStudents = useMemo(() => {
    return student.filter((student) => {
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
      accessor: (row: StudentTableType) => row.name,
    },
    {
      id: "email",
      header: "Email",
      accessor: (row: StudentTableType) => row.email,
    },
    {
      id: "phone",
      header: "Phone",
      accessor: (row: StudentTableType) => row.phone,
    },
    {
      id: "gender",
      header: "Gender",
      accessor: (row: StudentTableType) => row.gender,
    },
    {
      id: "joinedAt",
      header: "Joined At",
      accessor: (row: StudentTableType) => row.createdAt,
    },
    {
      id: "feesStatus",
      header: "Fees Status",
      accessor: (row: StudentTableType) => row.feesStatus,
    },
    {
      id: "batches",
      header: "Batches",
      accessor: (row: StudentTableType) => (
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
    return Array.from(new Set(student.map((s) => s.feesStatus)));
  }, []);

  const uniqueGenders = useMemo(() => {
    return Array.from(new Set(student.map((s) => s.gender)));
  }, []);

  const uniqueBatches = useMemo(() => {
    const allBatches = student.flatMap((s) => s.batches || []);
    return Array.from(new Set(allBatches));
  }, []);

  return (
    <>

      <DataTable
        columns={studentTableCol}
        data={filteredStudents}
        getRowId={(row: StudentTableType) => row._id}
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
