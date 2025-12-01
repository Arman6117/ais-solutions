import Greetings from '@/components/greetings';
import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardSkeleton from '@/components/skeletons/student-dashboard-skeleton';
import CoursesDisplay from './course-display';
import { connectToDB } from '@/lib/db'; // Ensure you import your DB connection
import { Student } from '@/models/student.model';

export const revalidate = 60;

const StudentDashboard = async ({ courseId }: { courseId: string }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  // Authentication check
  if (!session?.user?.email) {
    redirect('/auth/login/student');
  }

  // Fetch Name Logic (Direct Database Call)
  // You don't need a separate function marked 'use server' here
  await connectToDB();
  
  // Find student by email directly - it's more efficient than getting ID first
  const studentData = await Student.findOne({ email: session.user.email })
    .select("name")
    .lean<{name:string}>();

  const name = studentData?.name || "Student";

  return (
    <div className="flex flex-col h-full py-1 gap-4">
      <Greetings>{name}</Greetings>

      {/* Suspense will show the skeleton while CoursesDisplay is fetching data */}
      <Suspense fallback={<DashboardSkeleton />}>
        <CoursesDisplay courseId={courseId} userEmail={session.user.email} />
      </Suspense>
    </div>
  );
};

export default StudentDashboard;
