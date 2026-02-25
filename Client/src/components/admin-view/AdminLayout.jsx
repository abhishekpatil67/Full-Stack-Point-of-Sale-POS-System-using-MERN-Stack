import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'
import AdminHearder from './AdminHearder'


const AdminLayout = () => {

  const [openSiderbar, setopenSiderbar] = useState(false)
  
  return (

    <div className='flex w-full min-h-screen'>

      <AdminSideBar open={openSiderbar} setOpen={setopenSiderbar} />

      <div className='flex flex-1 flex-col'>

        <AdminHearder setOpen={setopenSiderbar} />
        <main className='flex-1 flex flex-col bg-muted/40 p-4 md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>


  )
}

export default AdminLayout