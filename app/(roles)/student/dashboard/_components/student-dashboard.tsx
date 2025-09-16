import Greetings from '@/components/greetings';
import React, { Suspense } from 'react'; // Import Suspense
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardSkeleton from '@/components/skeletons/student-dashboard-skeleton';
import CoursesDisplay from './course-display';

export const revalidate = 60;

const StudentDashboard = async ({courseId}:{courseId:string}) => {
  const session = await auth.api.getSession({ headers: await headers() });

  // Authentication check remains at the top level
  if (!session?.user?.email) {
    redirect('/auth/login/student');
  }

  


  return (
    <div className="flex flex-col  h-full py-1 gap-4">
      {/* This component renders immediately */}
      <Greetings>{session.user.name.split(" ")[0]}</Greetings>

      {/* Suspense will show the skeleton while CoursesDisplay is fetching data */}
      <Suspense fallback={<DashboardSkeleton />}>
        <CoursesDisplay courseId={courseId} userEmail={session.user.email} />
      </Suspense>
    </div>
  );
};

export default StudentDashboard;