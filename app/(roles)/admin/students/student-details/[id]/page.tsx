
import React from "react";
import StudentDetails from "../../_components/student-details";
import { getStudentProfile } from "@/actions/student/profile/get-student-profile";

type StudentDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;
const StudentDetailsPage = async ({ params }: StudentDetailsPageProps) => {
  const id = (await params).id;

  const student = await getStudentProfile(id);
 
  return (
    <>
      <StudentDetails student={student.data} />
    </>
  );
};

export default StudentDetailsPage;
