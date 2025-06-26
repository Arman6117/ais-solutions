import React from 'react'
import CourseCards from './course-cards'

const OngoingCourses = () => {
  return (
    <div className=" w-full   overflow-y-scroll no-scrollbar  rounded-4xl px-4 py-4 bg-white">
        <h1 className='text-xl font-bold'>Ongoing Batches</h1>
        <div className='flex flex-col '>
          {/* //TODO:Add auto scroll */}
            <CourseCards/>
        </div>
    </div>
  )
}

export default OngoingCourses