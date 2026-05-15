import axios from 'axios'
import React, { useState } from 'react'

const AddCategory = () => {
    const API = import.meta.env.VITE_API_URL
    const [newCategory , setNewCategory] = useState({
        name:""
    })
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/categories`, newCategory);

      setNewCategory({
        name: ""
      });

      alert("Category added successfully");

    } catch (error) {
      console.log(error);
    }
  }

    const handleChange = async(e)=>{
        const {name , value} = e.target
        setNewCategory({...newCategory , [name]:value})
    }
return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>

      <div className='border border-gray-400 p-10 flex flex-col gap-4 rounded w-full max-w-md shadow-xs bg-white'>

        <h2 className='text-xl font-bold text-gray-800 text-center'>
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        
          <div className='flex flex-col gap-2'>

            <label className='font-semibold text-gray-700'>
              Category Name :
            </label>

            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              placeholder='Enter category name'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
            />

          </div>

        
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white p-2 font-semibold rounded-md transition'
          >
            Add Category
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddCategory