import React from "react";
import StudentDashboard from "./_components/student-dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
type StudentDashboardPageProps = {
  searchParams: Promise<{ courseId: string }>;
};
export const revalidate = 60;
const StudentDashboardPage = async ({
  searchParams,
}: StudentDashboardPageProps) => {
  const courseId = (await searchParams).courseId;
  console.log(courseId)
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      redirect("/auth/login/student");
    }
  } catch (err) {
    console.log(err);
    redirect("/auth/login/student");
  }
  return (
    <>
      <StudentDashboard courseId={courseId} />
    </>
  );
};

export default StudentDashboardPage;
