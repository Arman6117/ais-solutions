import { School2Icon } from 'lucide-react'
import React from 'react'
import StudentBatchesTab from './student-batches-tab'

const StudentBatches = () => {
  return (
<div className='flex flex-col gap-4 w-full h-[330px] shadow-md bg-white rounded-lg'>
{/* <div className='flex items-center gap-2'>
        <School2Icon className='text-primary-bg size-7'/>
        <h1 className='text-2xl font-semibold'>Your Batches</h1>
     </div> */}
     <div className='flex-1 px-5 py-4 min-h-0'>
        <StudentBatchesTab/>
     </div>
    </div>
  )
}

export default StudentBatches