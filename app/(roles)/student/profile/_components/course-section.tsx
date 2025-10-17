// components/profile/CoursesSection.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import EnrolledCourseCard from "./enrolled-course-card";
import { Course } from "@/lib/types/student-profile.type";
import { Invoices } from "@/lib/types/student";

interface CoursesSectionProps {
  courses: Course[];
  invoices: Invoices[];
}

const CoursesSection = ({ courses, invoices }: CoursesSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="bg-purple-100 p-3 rounded-2xl">
          <GraduationCap className="w-6 md:w-8 h-6 md:h-8 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Enrolled Courses
          </h2>
          <p className="text-slate-500 mt-1">
            Track your learning journey and progress
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-2 text-sm font-semibold">
          {courses.length} Courses
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {courses.map((course, idx) => {
          const relatedCourse = invoices.filter(
            (invoice) =>
              invoice.courseDetails[0].courseId == course.courseId._id
          );

          const amountPaid = relatedCourse[0].courseDetails[0].amountPaid || 0;
          const totalFee = relatedCourse[0].courseDetails[0].totalFees || 0;
          return (
            <EnrolledCourseCard
              amountPaid={amountPaid}
              totalFee={totalFee}
              course={course}
              key={course.courseId._id || idx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CoursesSection;
