import React from 'react'
import bg from '../assets/Image/bgimage.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const { login } = useAuth()
  const API = import.meta.env.VITE_API_URL;
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //      if (!loginInfo.email || !loginInfo.password) {
    //   toast.error("All fields are required");
    //   return;
    // }

    try {

      const res = await axios.post(`${API}/user/signin`, loginInfo)
      login(res.data)



      setLoginInfo({
        email: "",
        password: ""
      })
      navigate('/dashboard/categories')
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value })
  }


  return (
    <div className='flex justify-center items-center min-h-screen px-4 relative'>

      <div
        className="absolute inset-0 bg-center bg-cover blur-[2px] sm:blur-sm"
        style={{
          backgroundImage: `url(${bg})`
        }}
      ></div>

      <div className='relative flex flex-col gap-2 rounded h-fit w-full max-w-sm sm:max-w-md p-4 sm:p-6 bg-white font-semibold'>

        <header className='text-center mt-5'>
          <h1 className='text-xl sm:text-2xl font-bold'>Note App</h1>
          <h3 className='text-xs sm:text-sm font-normal text-gray-500'>
            Create a new account
          </h3>
        </header>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 sm:gap-6'>

          <div>
            <label htmlFor="email" className='text-sm'>Email</label>
            <input
              type="email"
              name="email"
              placeholder='e.g.john.doe@example.com'
              value={loginInfo.email}
              onChange={handleChange}
              className='w-full rounded border border-gray-300 p-2 text-sm sm:text-base'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password" className='text-sm'>Password</label>
            <input
              type="text"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder='********'
              className='w-full border border-gray-300 p-2 text-sm sm:text-base rounded'
            />
          </div>

          <button
            type='submit'
            className='bg-blue-600 w-full text-white py-2 text-sm sm:text-base rounded'
          >
            Sign In
          </button>

          <span className='text-xs sm:text-sm text-gray-500 text-center'>
            Don't have an account?{" "}
            <span
              onClick={() => navigate('/signup')}
              className='text-blue-500 hover:underline cursor-pointer'
            >
              Sign up
            </span>
          </span>

        </form>

      </div>
    </div>
  )
}

export default Login