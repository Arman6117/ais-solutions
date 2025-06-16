import React from "react";
import StudentCourseDetails from "../../../../../../components/student-course-component/student-course-details";

type StudentCourseDetailsPageProps = {
  params: {
    id: Promise<{ id: string }>;
  };
};
const StudentCourseDetailsPage = async ({
  params,
}: StudentCourseDetailsPageProps) => {
    const id = (await params).id

  return <>
    <StudentCourseDetails />
  </>;
};

export default StudentCourseDetailsPage;
