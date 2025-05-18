import { dummyStudents } from "@/lib/static";
import React from "react";
import StudentDetails from "../../_components/student-details";

type StudentDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const StudentDetailsPage = async ({ params }: StudentDetailsPageProps) => {
  const id = (await params).id;

  const student = dummyStudents.find((stud) => stud.id === id);

  return (
    <>
      <StudentDetails student={student} />
    </>
  );
};

export default StudentDetailsPage;
