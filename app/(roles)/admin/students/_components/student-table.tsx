"use client";
import { DataTable } from "@/components/data-table";
import { dummyStudents } from "@/lib/static";
import { DummyStudent } from "@/lib/types";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentTable = () => {
  const [feeStatusFilter, setFeeStatusFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  // Filter the data based on selected filters before passing to DataTable
  const filteredStudents = useMemo(() => {
    return dummyStudents.filter((student) => {
      // Apply fee status filter
      if (feeStatusFilter !== "all" && student.feesStatus !== feeStatusFilter) {
        return false;
      }

    //   Apply gender filter
        if (genderFilter !== 'all' && student.gender !== genderFilter) {
          return false;
        }

      return true;
    });
  }, [feeStatusFilter, genderFilter]);

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
  ];

  const studentTableFilter = [
    {
      label: "Name: A to Z",
      value: "name-asc",
    },
    {
      label: "Name: Z to A",
      value: "name-desc",
    },
    {
      label: "Join Date: Newest",
      value: "joinedAt-desc",
    },
    {
      label: "Join Date: Oldest",
      value: "joinedAt-asc",
    },
  ];

  // Get unique fee statuses from data
  const uniqueFeeStatuses = useMemo(() => {
    const statuses = new Set<string>();
    dummyStudents.forEach((student) => {
      if (student.feesStatus) {
        statuses.add(student.feesStatus);
      }
    });
    return Array.from(statuses);
  }, []);

  //   // Get unique genders from data
  const uniqueGenders = useMemo(() => {
    const genders = new Set<string>();
    dummyStudents.forEach((student) => {
      if (student.gender) {
        genders.add(student.gender);
      }
    });
    return Array.from(genders);
  }, []);

  return (
    <>
      {/* Additional Filter Controls */}

      {/* </div> */}

      {/* DataTable Component */}
      <DataTable
        columns={studentTableCol}
        data={filteredStudents}
        getRowId={(row: DummyStudent) => row.id}
        href="/admin/students/student-details"
        additionalFilter={
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1">
              <Select
                value={feeStatusFilter}
                onValueChange={setFeeStatusFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by fee status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {uniqueFeeStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  {uniqueGenders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
