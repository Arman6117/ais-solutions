'use client'
import { DataTable } from "@/components/data-table";
import { coursesData } from "@/lib/static";
import React from "react";

const CoursesTable = () => {
  return (
    <>
      <DataTable
        data={coursesData}
        columns={[
          {
            id: "name",
            header: "Course Name",
            accessor: (row) => row.name,
          },
          {
            id: "createdAt",
            header: "Created On",
            accessor: (row) => row.createdAt,
          },
          {
            id: "student",
            header: "No of Students",
            accessor: (row) => row.students,
          },
          {
            id: "batches",
            header: "No of Batches",
            accessor: (row) => row.batches,
          },
          {
            id: "batchesCompleted",
            header: "Batches Completed",
            accessor: (row) => row.batchesCompleted,
          },
        ]}
        filterOptions={[
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
        ]}
        getRowId={(row)=>row.id}
        onDeleteSelected={(ids)=> {
          console.log("Deleted")
        }}
        searchPlaceholder="Search by Course Name"
        
      />
    </>
  );
};

export default CoursesTable;
