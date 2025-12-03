import React, { Suspense } from "react";
import StudentProfile from "./_components/student-profile";
import { auth } from "@/lib/auth";
import { getStudentId } from "@/actions/shared/get-student-id";
import { getStudentProfile } from "@/actions/student/profile/get-student-profile";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

// 1. Create a Loading Component for Suspense
const ProfileLoading = () => (
  <div className="min-h-screen w-screen bg-slate-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      <p className="text-slate-500 font-medium">Loading Profile...</p>
    </div>
  </div>
);

async function ProfileFetcher() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const userEmail = session.user.email;
  if (!userEmail) {
    return <div className="p-6 text-red-500">Error: User email not found.</div>;
  }

  const studentId = await getStudentId(userEmail);
  if (!studentId) {
    return (
      <div className="p-6 text-red-500">
        Error: Student ID not found. Please contact support.
      </div>
    );
  }

  const res = await getStudentProfile(studentId);

  return <StudentProfile stdData={res.data} />;
}

// 3. The Main Page Component with Suspense
const StudentProfilePage = () => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileFetcher />
    </Suspense>
  );
};

export default StudentProfilePage;
