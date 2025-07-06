import Greetings from '@/components/greetings'
import React from 'react'
import StudentDashboard from './_components/student-dashboard'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const StudentDashboardPage =async () => {
  const session = await auth.api.getSession({headers:await headers()})
  if(!session) {
    redirect('/auth/login/student')
  }
  return (
    <>
   <StudentDashboard/>
    </>
  )
}

export default StudentDashboardPage