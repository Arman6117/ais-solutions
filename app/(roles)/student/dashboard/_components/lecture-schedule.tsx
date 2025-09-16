import { Calendar } from 'lucide-react'
import React from 'react'
import LectureScheduleTab from './lecture-schedule-tab'
import { MeetingInfo } from '@/lib/types/student-dashboard.type'
export type MeetingProp = {
  meetings:MeetingInfo[]
}
export const revalidate = 60;
const LectureSchedule = ({meetings}:MeetingProp) => {
  return (
    <div className='flex flex-col gap-7'>
     <div className='flex items-center gap-2'>
        <Calendar className='text-primary-bg size-7'/>
        <h1 className='text-2xl font-semibold'>Your Schedule</h1>
     </div>
     <div className='flex items-center  sm:px-5 py-2 w-full rounded-md '>
        <LectureScheduleTab meetings={meetings}/>
     </div>
    </div>
  )
}

export default LectureSchedule