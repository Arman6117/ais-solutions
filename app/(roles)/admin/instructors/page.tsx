import React from 'react'
import InstructorTable from './_components/instructor-table'

const InstructorsPage = () => {
  return (
    <main className="p-3 w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-5xl font-bold">Manage Students</h1>
        
              </div>
      <div className="mt-10">

        <InstructorTable />
      </div>
    </main>
  )
}

export default InstructorsPage