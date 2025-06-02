import { Calendar } from 'lucide-react'
import React from 'react'
import LectureScheduleTab from './lecture-schedule-tab'

const LectureSchedule = () => {
  return (
    <div className='flex flex-col gap-7'>
     <div className='flex items-center gap-2'>
        <Calendar className='text-primary-bg size-8'/>
        <h1 className='text-3xl font-bold'>Your Schedule</h1>
     </div>
     <div className=' px-5 py-2 w-fit rounded-md '>
        <LectureScheduleTab/>
     </div>
    </div>
  )
}

export default LectureSchedule