import React from 'react'
import CourseCards from './course-cards'

const OngoingBatches = () => {
  return (
    <div className="h-full w-full rounded-4xl px-4 py-4 bg-white">
        <h1 className='text-xl font-bold'>Ongoing Courses</h1>
        <div className='flex flex-col overflow-y-scroll no-scrollbar'>
            <CourseCards/>
        </div>
    </div>
  )
}

export default OngoingBatches