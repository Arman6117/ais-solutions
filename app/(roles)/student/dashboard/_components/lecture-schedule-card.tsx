import { Label } from '@/components/ui/label'
import React from 'react'

type LectureScheduleCardProps = {
    day:'today' | "tomorrow"
}
const LectureScheduleCard = ({day}:LectureScheduleCardProps) => {
  return (
    <div className='flex gap-6 mt-5 flex-wrap'>

        <div className='flex flex-col   bg-white rounded-lg shadow-lg w-64'>
            <div className='flex gap-2 items-center rounded-lg p-3 bg-primary-bg'>
                {/* <div className='h-6 w-1 bg-primary-bg rounded-full'></div> */}
                <h1 className='text-lg font-semibold text-white'>Meeting name</h1>
            </div>
            <div className='flex flex-wrap gap-4 justify-between mt-2 rounded-lg bg-white p-3 items-start'>
                <div className='flex flex-col justify-center  '>
                    <Label className='text-sm text-gray-600'>Course</Label>
                    <span className=' font-semibold'>Course name</span>
                </div>
                <div className='flex flex-col justify-center  '>
                    <Label className='text-sm text-gray-600'>Batch</Label>
                    <span className=' font-semibold'>Batch name</span>
                </div>
                <div className='flex flex-col justify-center  '>
                    <Label className='text-sm text-gray-600'>Module</Label>
                    <span className=' font-semibold'>Module name</span>
                </div>
                <div className='flex flex-col justify-center  '>
                    <Label className='text-sm text-gray-600'>Time</Label>
                    <span className=' font-semibold'>11:30pm</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LectureScheduleCard