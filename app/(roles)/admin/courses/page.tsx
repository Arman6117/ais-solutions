import React from 'react'
import CreateCourseButton from './_components/create-course-button'
import CoursesTable from './_components/courses-table'

const CoursesPage = () => {
  return (
    <main className='p-3 w-full'>
      <div className='flex w-full justify-between'>
         <h1 className='text-5xl font-bold'>Manage Courses</h1>
         <CreateCourseButton/>
      </div>
      <div className='mt-10'>
        <CoursesTable/>
      </div>
    </main>
  )
}

export default CoursesPage