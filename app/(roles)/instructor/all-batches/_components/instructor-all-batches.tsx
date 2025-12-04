"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseBatch } from "@/lib/types/types";
import CourseFilterSelect from "@/app/(roles)/admin/all-batches/_components/course-filter-select";
import InstructorCourseSection from "./instructor-course-section";

type InstructorAllBatchesProps = {
  data: {
    id: string;
    courseName: string;
    batches: CourseBatch[];
  }[];
};
export default function InstructorAllBatches({
  data,
}: InstructorAllBatchesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");

  const filteredCourses = data
    .filter((course) => {
      return courseFilter === "All" || course.courseName === courseFilter;
    })
    .map((course) => {
      const filteredBatches = course.batches.filter((batch) => {
        const matchesSearch =
          batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          batch.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || batch.status === statusFilter;

        return matchesSearch && matchesStatus;
      });

      return {
        ...course,
        batches: filteredBatches,
      };
    })
    .filter((course) => course.batches.length > 0);

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
          <div className="relative w-full sm:w-72">
            <Input
              type="text"
              placeholder="Search batches or instructors..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-bg focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <CourseFilterSelect
              selectedCourse={courseFilter}
              onSelectCourse={(course) => setCourseFilter(course)}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-3">
          <span className="text-sm font-medium text-gray-700 mr-2 self-center">
            Status:
          </span>
          {["All", "Ongoing", "Upcoming", "Completed"].map((status) => (
            <Button
              key={status}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-primary-bg text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <InstructorCourseSection key={course.id} course={course} />
        ))
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <div className="text-gray-500 mb-2">
            No batches found matching your criteria.
          </div>
          <Button
            className="text-primary-bg hover:underline"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
              setCourseFilter("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
