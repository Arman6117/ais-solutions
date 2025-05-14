import React from 'react'
import ModulesTable from './_components/modules-table'

const ModulesPage = () => {
  return (
    <main className='p-3 w-full'>
    <div className='flex w-full justify-between'>
       <h1 className='text-5xl font-bold'>Manage Modules</h1>
       Create Module Button
    </div>
    <div className='mt-10'>
      <ModulesTable/>
    </div>
  </main>
  )
}

export default ModulesPage