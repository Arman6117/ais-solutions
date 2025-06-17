import React from 'react'
import CreateCourseBasicInfo from './create-course-basic-info'

const CreateCourse = () => {
  return (
    <main className='flex w-full flex-col gap-3 '>
        <div className='flex flex-col'>
        <h1 className='text-5xl font-medium'>Create  A New Course</h1>
        </div>
        <CreateCourseBasicInfo/>
    </main>
  )
}

export default CreateCourse