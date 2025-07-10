"use client";
import { DataTable } from "@/components/data-table";
import { coursesData } from "@/lib/static";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Grid } from "react-loader-spinner";
// import EditCourseDialog from "./edit-course-dialog";
// import { Course } from "@/lib/types";
import { getAllCoursesTable } from "@/actions/admin/course/get-all-courses";
import { CourseTable } from "@/lib/types";

const CoursesTable = () => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<CourseTable[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const res = await getAllCoursesTable();
      if (res.success) {
        setCourse(res.data!);
      } else {
        toast.error(res.message || "Failed to load courses");
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);
  //TODO:Make API Call for data fetching
  //TODO:Instead of batches and batchesCompleted show price discount and offer price

  {
   ( loading &&  course.length === 0) && (
      <div className="flex items-center justify-center h-fit mt-[30%] w-full">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#5840ba"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }

  return (
    <>
      {course.length === 0 && loading === false ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">No courses available</p>
        </div>
      ) : (
        <DataTable
          href={`/admin/courses/course-details/`}
          data={course}
          columns={[
            {
              id: "name",
              header: "Course Name",
              accessor: (row) => row.courseName,
            },
            {
              id: "createdAt",
              header: "Created On",
              accessor: (row) => row.createdAt,
            },
            {
              id: "student",
              header: "No of Students",
              accessor: (row) => row.numberOfStudents,
            },
            {
              id: "price",
              header: "Price",
              accessor: (row) => row.coursePrice,
            },
            {
              id: "discount",
              header: "Discount",
              accessor: (row) => row.courseDiscount,
            },
            {
              id: "offerPrice",
              header: "Offer Price",
              accessor: (row) =>
                Math.round(
                  row.coursePrice - (row.coursePrice * row.courseDiscount) / 100
                ) || 0,
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
              label: "Price:High to Low",
              value: "price-asc",
            },
            {
              label: "Price:Low to High",
              value: "price-desc",
            },
          ]}
          getRowId={(row) => row._id as unknown as string}
          onDeleteSelected={(ids) => {
            toast.success(`${ids.length} courses deleted successfully`); //TODO: make delete API call
          }}
          searchPlaceholder="Search by Course Name"
          // openDialog={handleDialogOpen}
        />
      )}

      {/* <EditCourseDialog
        open={open}
        onClose={() => setOpen(false)}
        data={currCourse}
      /> */}
    </>
  );
};

export default CoursesTable;
