import Greetings from '@/components/greetings'
import React from 'react'
import LectureSchedule from './lecture-schedule'

const StudentDashboard = () => {
  return (
    <div className='flex w-2/3 flex-col py-1 gap-10'>
      <Greetings>Arman</Greetings>
      <div className='mt-5'>
        <LectureSchedule/>
      </div>
    </div>
  )
}

export default StudentDashboard