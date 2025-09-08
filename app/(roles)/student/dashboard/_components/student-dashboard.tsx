import Greetings from "@/components/greetings";
import React from "react";
import LectureSchedule from "./lecture-schedule";
import StudentBatches from "./student-batches";
import StudentCard from "./student-card";
import StudentCourseDataCard from "./student-course-data-card";
import StudentCourseSelector from "./student-course-selector";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { getStudentCourses } from "@/actions/student/courses/get-student-courses";
import Link from "next/link";
export const revalidate = 60;
const StudentDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const courses = await getStudentCourses(session?.user.email as string);

  if (courses.data.length === 0) {
    return (
      <div className="flex w-screen h-full items-center justify-center  py gap-">
        <Button>
          <Link href={"/student/courses"} className="cursor-pointer">
            Browse Courses
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-full  py-1 gap-">
      <div className="flex flex-col">
        <Greetings>Arman</Greetings>
        <StudentCourseSelector courses={courses.data} />
        <div className="mt-5">
          <LectureSchedule />
        </div>
      </div>
      <div className="bg-soft-white flex flex-col gap-5 pb  w-full h-dvh rounded-lg p-5">
        <div className="flex gap-8">
          <StudentCard />
          <StudentCourseDataCard />
        </div>
        <StudentBatches />
      </div>
    </div>
  );
};

export default StudentDashboard;
