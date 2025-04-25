import React from 'react'
import AdminPanelOverview from '../_components/admin-panel-overview'

const AdminDashboardPage = () => {
  return (
    <div className='ml-12 md:ml-24 flex rounded-4xl px-6 py-7 bg-white h-full'>
       <AdminPanelOverview/>
       <div className='w-[40%] md:flex hidden bg-red-100'>s</div>
    </div>
  )
}

export default AdminDashboardPage