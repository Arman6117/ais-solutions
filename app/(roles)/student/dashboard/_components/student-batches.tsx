import React from 'react'
import StudentModulesTab from './student-modules-tab'
import { ModuleInfo } from '@/lib/types/student-dashboard.type'


export type ModuleProp = {
  module:ModuleInfo[]
}
export const revalidate = 60;
const StudentModules = ({module}:ModuleProp) => {
  const formatted = JSON.parse(JSON.stringify(module))
  return (
<div className='flex flex-col gap-4 sm:w-full w-full mt-10 md:w-full h-[330px] shadow-md bg-white rounded-lg'>
   

     <div className='flex-1 sm:px-5 py-4  min-h-0'>
        <StudentModulesTab module={formatted}/>
     </div>
    </div>
  )
}

export default StudentModules