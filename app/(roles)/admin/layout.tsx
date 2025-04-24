import React from 'react'
import AdminSidebar from './_components/admin-sidebar'

const AdminDashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='h-screen  bg-primary-bg'>
        <AdminSidebar/>
        <section className='h-full  px-2 py-2 md:py-4'>
            {children}
        </section>
    </main>
  )
}

export default AdminDashboardLayout