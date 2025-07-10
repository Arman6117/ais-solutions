"use client";
import { DataTable } from "@/components/data-table";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Grid } from "react-loader-spinner";
// import EditCourseDialog from "./edit-course-dialog";
// import { Course } from "@/lib/types";
import { getAllCoursesTable } from "@/actions/admin/course/get-courses";
import { CourseTable } from "@/lib/types";

import { useRouter } from "next/navigation";
import { deleteCourses } from "@/actions/admin/course/delete-course";

const CoursesTable = () => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [course, setCourse] = useState<CourseTable[]>([]);
  const [tableKey, setTableKey] = useState(0);
  const router = useRouter();
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
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  //TODO:Make API Call for data fetching
  //TODO:Instead of batches and batchesCompleted show price discount and offer price

  {
    loading && course.length === 0 && (
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

  const handleDelete = async (ids: string[]) => {
    setDeleting(true);
    try {
      const res = await deleteCourses(ids);

      if (res.success) {
        toast.success(res.message || "Courses deleted successfully");
        await fetchCourses()
        setTableKey(prev => prev + 1)
      } else {
        toast.error(res.message || "Failed to delete courses");
      }
    } catch (error) {
      toast.error("Failed to delete courses");
      console.error("Error deleting course:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {course.length === 0 && loading === false ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">No courses available</p>
        </div>
      ) : (
        <DataTable
        key={tableKey}
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
            handleDelete(ids);
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
