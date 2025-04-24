import React from 'react'

const AdminSidebar = () => {
  return (
    <div className='h-full  w-12  md:w-24 fixed bg-primary-bg '>
        <div className='flex flex-col gap-17 items-center justify-center p-10 '>
            <div className='text-white '>Logo</div>
            <div className='flex flex-col gap-6'>List</div>
        </div>
    </div>
  )
}

export default AdminSidebar