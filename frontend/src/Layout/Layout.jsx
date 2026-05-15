import React from 'react'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = ({ search, setSearch }) => {
  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <div className="flex">
        <Sidebar />


        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout