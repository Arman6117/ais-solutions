
import React from 'react'
import StudentDashboard from './_components/student-dashboard'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getStudentCourses } from '@/actions/student/courses/get-student-courses'

const StudentDashboardPage =async () => {
  try{
    
    const session = await auth.api.getSession({headers:await headers()})
    // await getStudentCourses(session?.user.id as string);
    console.log(session)
    if(!session) {
      redirect('/auth/login/student')
    }
  }catch(err) {
    console.log(err)
    redirect('/auth/login/student')
  }
  return (
    <>
   <StudentDashboard/>
    </>
  )
}

export default StudentDashboardPage