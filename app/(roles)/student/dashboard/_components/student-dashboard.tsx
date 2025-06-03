import Greetings from '@/components/greetings'
import React from 'react'
import LectureSchedule from './lecture-schedule'
import StudentBatches from './student-batches'
import StudentCard from './student-card'

const StudentDashboard = () => {
  return (
    <div className='flex w-screen h-full  py-1 gap-'>
      <div className='flex flex-col'>

      <Greetings>Arman</Greetings>
      <div className='mt-5'>
        <LectureSchedule/>
      </div>
      <div className='mt-5'>
        <StudentBatches/>
      </div>
      </div>
      <div className='bg-soft-white w-full h-full rounded-lg p-5'>
        <div className='flex gap-3'>
         <StudentCard/>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard