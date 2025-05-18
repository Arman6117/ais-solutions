import React from 'react'
import ModulesTable from './_components/modules-table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ModulesPage = () => {
  return (
    <main className='p-3 w-full'>
    <div className='flex w-full justify-between'>
       <h1 className='text-5xl font-bold'>Manage Modules</h1>
       <Link href={'/admin/modules/create-module'} className='cursor-pointer'>
        <Button className='bg-primary-bg cursor-pointer' >
          Create Module
        </Button>
       </Link>
    </div>
    <div className='mt-10'>
      <ModulesTable/>
    </div>
  </main>
  )
}

export default ModulesPage