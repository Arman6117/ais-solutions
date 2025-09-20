import React from "react";
import { getStudentCourses } from "@/actions/student/courses/get-student-courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StudentCourseSelector from "./student-course-selector";
import LectureSchedule from "./lecture-schedule";
import StudentCard from "./student-card";
import StudentCourseDataCard from "./student-course-data-card";
import StudentBatches from "./student-batches";
import { AlertTriangle } from "lucide-react";

import { getStudentDashboard } from "@/actions/student/dashboard/get-student-dashboard-info";
import { getStudentId } from "@/actions/shared/get-student-id";

type CoursesDisplayProps = {
  userEmail: string;
  courseId: string;
};
export const revalidate = 60;
const CoursesDisplay = async ({ userEmail, courseId }: CoursesDisplayProps) => {
  const courses = await getStudentCourses(userEmail);
  const studentId = await getStudentId(userEmail);
  if (!courses.data || courses.data.length === 0) {
    return (
      <div className="flex w-full h-full items-center justify-center pb-20 sm:pb-0">
        <div className="text-center items-center flex flex-col px-4">
          <AlertTriangle className="text-primary-bg w-12 h-12 opacity-60 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            No Courses Found
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Wait for Admin verification and approval.
          </p>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Your request will be accepted within 24 hours.
          </p>
          <Button
            asChild
            className="bg-primary-bg hover:bg-primary-bg/90 text-white"
            >
            <Link href="/student/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const effectiveCourseId = courseId && 
    courses.data.some(course => course._id === courseId) 
    ? courseId 
    : courses.data[0]._id;
  const res = await getStudentDashboard(studentId!, effectiveCourseId);
  
  if (!res.success && !res.data) {
    return (
      <div className="flex w-full h-full items-center justify-center pb-20 sm:pb-0">
        <div className="text-center items-center flex flex-col px-4">
          <AlertTriangle className="text-primary-bg w-12 h-12 opacity-60 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            No Courses Found
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {res.message}
          </p>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Your request will be accepted within 24 hours.
          </p>
          <Button
            asChild
            className="bg-primary-bg hover:bg-primary-bg/90 text-white"
            >
            <Link href="/student/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }
  const { batch, lectureCompleted, meetings, modules, student } = res.data!;

  return (
    <div className="flex h-full pr-2 sm:pr-5 py-1 pb-20 sm:pb-1">
      <div className="flex sm:items-center gap-4 md:items-start flex-col w-full">
        <StudentCourseSelector courses={courses.data} />

        {/* Mobile layout */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 md:hidden">
          <StudentCard student={student} batch={batch} />
          <StudentCourseDataCard
            module={modules}
            lectureCompleted={lectureCompleted}
          />
        </div>

        <div className="mt-3 sm:mt-5 w-full">
          <LectureSchedule meetings={meetings} />
          <div className="md:hidden px-">
            <StudentBatches module={modules}/>
          </div>
        </div>
      </div>

      <div className="bg-soft-white hidden md:flex flex-col gap-5 w-full h-fit rounded-lg p-5">
        <div className="flex gap-7">
          <StudentCard student={student} batch={batch} />
          <StudentCourseDataCard
            module={modules}
            lectureCompleted={lectureCompleted}
          />
        </div>
        <StudentBatches module={modules}/>
      </div>
    </div>
  );
};

export default CoursesDisplay;
