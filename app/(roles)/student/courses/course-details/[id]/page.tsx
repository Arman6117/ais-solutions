import React from "react";
import StudentCourseDetails from "../../../../../../components/student-course-component/student-course-details";
import { getStudentCourseById } from "@/actions/student/courses/get-student-courses";
import { AlertTriangle } from "lucide-react";

type StudentCourseDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const StudentCourseDetailsPage = async ({
  params,
}: StudentCourseDetailsPageProps) => {
  const id = (await params).id;
  const res = await getStudentCourseById(id);

  return (
    <>
      <StudentCourseDetails course={res.data} message={res.message} />
    </>
  );
};

export default StudentCourseDetailsPage;
