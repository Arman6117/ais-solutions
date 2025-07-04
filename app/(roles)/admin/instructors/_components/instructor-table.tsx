"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import InstructorTableFilters from "./instructor-table-filters";
import { dummyInstructorTable } from "@/lib/static";
import { DummyInstructor } from "@/lib/types";

const InstructorTable = () => {
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");

  const filteredInstructors = useMemo(() => {
    return dummyInstructorTable.filter((instructor) => {
      if (
        selectedModule !== "all" &&
        !instructor.modules?.includes(selectedModule)
      )
        return false;
      if (
        selectedBatch !== "all" &&
        !instructor.batches?.includes(selectedBatch)
      )
        return false;
      return true;
    });
  }, [selectedModule, selectedBatch]);

  const instructorTableCols = [
    {
      id: "name",
      header: "Instructor Name",
      accessor: (row: DummyInstructor) => row.name,
    },
    {
      id: "email",
      header: "Email",
      accessor: (row: DummyInstructor) => row.email,
    },
    {
      id: "phone",
      header: "Phone",
      accessor: (row: DummyInstructor) => row.phone,
    },
    {
      id: "joinedAt",
      header: "Joined At",
      accessor: (row: DummyInstructor) => row.joinedAt,
    },
    {
      id: "modules",
      header: "Modules Assigned",
      accessor: (row: DummyInstructor) => (
        <div className="flex flex-wrap gap-1">
          {row.modules?.map((mod: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {mod}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: "batches",
      header: "Batches Assigned",
      accessor: (row: DummyInstructor) => (
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

  const instructorTableSortOptions = [
    { label: "Name: A to Z", value: "name-asc" },
    { label: "Name: Z to A", value: "name-desc" },
    { label: "Join Date: Newest", value: "joinedAt-desc" },
    { label: "Join Date: Oldest", value: "joinedAt-asc" },
  ];

  const uniqueModules = useMemo(() => {
    const allModules = dummyInstructorTable.flatMap((ins) => ins.modules || []);
    return Array.from(new Set(allModules));
  }, []);

  const filteredBatches = useMemo(() => {
    if (selectedModule === "all") return [];
    const allBatches = dummyInstructorTable
      .filter((ins) => ins.modules?.includes(selectedModule))
      .flatMap((ins) => ins.batches || []);
    return Array.from(new Set(allBatches));
  }, [selectedModule]);

  return (
    <DataTable
      columns={instructorTableCols}
      data={filteredInstructors}
      getRowId={(row: DummyInstructor) => row.id}
      href="/admin/instructors/instructor-details"
      additionalFilter={
        <InstructorTableFilters
          selectedModule={selectedModule}
          selectedBatch={selectedBatch}
          setSelectedModule={setSelectedModule}
          setSelectedBatch={setSelectedBatch}
          uniqueModules={uniqueModules}
          filteredBatches={filteredBatches}
        />
      }
      filterOptions={instructorTableSortOptions}
      onDeleteSelected={(ids) => {
        toast.success(`${ids.length} instructors deleted successfully`);
      }}
      searchPlaceholder="Search by instructor name"
    />
  );
};

export default InstructorTable;
