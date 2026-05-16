import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const { logout } = useAuth()
  const userobj = JSON.parse(user)
  return (
    <div className='w-full'>

      <nav className='flex items-center w-full px-20 justify-around gap-6 h-10 py-6 shadow bg-white'>
        <div className='flex w-fit   items-center  font-semibold '>
          <h2><span className='w-fit bg-blue-500 rounded mr-1 text-white h-8 p-1'>My</span>Notes</h2>
        </div>
        <div>
          <input type="text" value={search} onChange={(e) => {
            setSearch(e.target.value)

          }} placeholder='Search notes' className=' w-96 text-sm rounded p-1 border-gray-200 border' />
        </div>
        <div className='flex gap-4 items-center'>
          <span className='text-sm font-semibold'> Hello, {" "}
            {userobj?.firstname}{" "}
            {userobj?.lastname}
          </span>
          <button className='text-sm' onClick={() => {
            logout()
            navigate('/')
          }}>Logout</button>
        </div>

      </nav>
    </div>
  )
}

export default Navbar;