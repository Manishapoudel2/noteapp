import React, { useState } from 'react'
import bg from '../assets/Image/bgimage.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        password: "",
        confirmpassword: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const res = await axios.post(`${API}/user/signup`, formData)

            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                address: "",
                password: "",
                confirmpassword: ""

            })

        } catch (error) {
            console.log("error", error)

        }
    }
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })


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

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:gap-6' >


                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='flex flex-col w-full'>
                            <label className='text-sm'>First Name</label>
                            <input type="text" placeholder='e.g. John' name='firstname' value={formData.firstname} onChange={handleChange}
                                className='w-full border rounded border-gray-300 p-1  text-sm sm:text-base' />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-sm'>Last Name</label>
                            <input type="text" name='lastname' value={formData.lastname} onChange={handleChange} placeholder='e.g. Doe'
                                className='w-full border rounded border-gray-300 p-1 text-sm sm:text-base' />
                        </div>
                    </div>


                    <div>
                        <label className='text-sm'>Email</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='e.g.john.doe@example.com'
                            className='w-full rounded border border-gray-300 p-1 text-sm sm:text-base' />
                    </div>


                    <div>
                        <label className='text-sm'>Address</label>
                        <input type="text" name='address' value={formData.address} onChange={handleChange} placeholder='e.g New york:-10, USA'
                            className='w-full border border-gray-300 p-1 rounded text-sm sm:text-base' />
                    </div>


                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='flex flex-col w-full'>
                            <label className='text-sm'>Password</label>
                            <input type="text" name='password' value={formData.password} onChange={handleChange} placeholder='********'
                                className='w-full border border-gray-300 p-1 rounded text-sm sm:text-base' />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-sm'>Confirm Password</label>
                            <input type="text" name='confirmpassword' value={formData.confirmpassword} onChange={handleChange} placeholder='********'
                                className='w-full border border-gray-300 rounded p-1 text-sm sm:text-base' />
                        </div>
                    </div>

                    <button type='submit'
                        className='bg-blue-600 w-full text-white py-1    text-sm sm:text-base rounded'>
                        Sign Up
                    </button>

                    <span className='text-xs sm:text-sm text-gray-500 text-center'>
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate(-1)}
                            className='text-blue-500 hover:underline cursor-pointer'>
                            Login
                        </span>
                    </span>

                </form>

            </div>
        </div>
    )
}

export default Signup