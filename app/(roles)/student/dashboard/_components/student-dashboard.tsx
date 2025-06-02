import Greetings from '@/components/greetings'
import React from 'react'
import LectureSchedule from './lecture-schedule'
import StudentBatches from './student-batches'

const StudentDashboard = () => {
  return (
    <div className='flex w-2/3 flex-col py-1 gap-10'>
      <Greetings>Arman</Greetings>
      <div className='mt-5'>
        <LectureSchedule/>
      </div>
      <div className='mt-5'>
        <StudentBatches/>
      </div>
    </div>
  )
}

export default StudentDashboard