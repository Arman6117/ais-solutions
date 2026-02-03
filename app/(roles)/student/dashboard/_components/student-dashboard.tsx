import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardSkeleton from '@/components/skeletons/student-dashboard-skeleton';
import CoursesDisplay from './course-display';
export const revalidate = 60;

const StudentDashboard = async ({ courseId }: { courseId: string }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  // Authentication check
  if (!session?.user?.email) {
    redirect('/auth/login/student');
  }

  
  // Find student by email directly - it's more efficient than getting ID first
 

  return (
    <div className="flex flex-col h-full py-1 gap-4">
       <h1 className="font-semibold text-[45px] xl:text-7xl">
       Learn and Grow 🎓🚀
       </h1>
      {/* Suspense will show the skeleton while CoursesDisplay is fetching data */}
      <Suspense fallback={<DashboardSkeleton />}>
        <CoursesDisplay courseId={courseId} userEmail={session.user.email} />
      </Suspense>
    </div>
  );
};

export default StudentDashboard;
