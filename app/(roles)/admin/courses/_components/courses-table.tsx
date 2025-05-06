"use client";
import { DataTable } from "@/components/data-table";
import { coursesData } from "@/lib/static";
import React, { use, useState } from "react";
import { toast } from "sonner";
// import EditCourseDialog from "./edit-course-dialog";
import { Course } from "@/lib/types";

const CoursesTable = () => {
  const [open, setOpen] = useState(false);
  const [currCourse, setCurrCourse] = useState<Course>();
  const handleDialogOpen = (course: Course) => {
    setOpen((prev) => !prev);
    setCurrCourse(course);
  };

  //TODO:Make API Call for data fetching
  //TODO:Instead of batches and batchesCompleted show price discount and offer price
  return (
    <>
      <DataTable
        href={`/admin/courses/course-details/`}
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
          {
            id: "price",
            header: "Price",
            accessor: (row) => row.price,
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
        getRowId={(row) => row.id}
        onDeleteSelected={(ids) => {
          toast.success(`${ids.length} courses deleted successfully`); //TODO: make delete API call
        }}
        searchPlaceholder="Search by Course Name"
        openDialog={handleDialogOpen}
      />
      {/* <EditCourseDialog
        open={open}
        onClose={() => setOpen(false)}
        data={currCourse}
      /> */}
    </>
  );
};

export default CoursesTable;
