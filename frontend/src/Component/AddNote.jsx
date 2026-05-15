
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Context/AuthContext';

const AddNote = () => {

  const { user } = useAuth();

  const userObject = JSON.parse(user);

  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [note, setNote] = useState({
    user_id: userObject?.user_id,
    title: "",
    category_id: "",
    description: ""
  });



  const fetchCategories = async () => {

    try {

      const res = await axios.get(
        `${API}/categories`
      );

      setCategories(res.data);

    } catch (error) {

      console.log(error);

    }

  };
  useEffect(() => {

    fetchCategories();

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setNote({
      ...note,
      [name]:
        name === "category_id"
          ? Number(value)
          : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const res = await axios.post(`${API}/note`, note)

      setNote({
        user_id: userObject?.user_id,
        title: "",
        category_id: "",
        description: ""
      });
    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className='w-full bg-gray-50 min-h-screen'>

      <div className='px-6 flex flex-col gap-8 mt-6'>

        <header className='flex justify-between items-center'>

          <h2 className='font-semibold text-xl'>
            Note Details
          </h2>

        </header>

        <form onSubmit={handleSubmit}>



          <div className='mb-4'>

            <label
              htmlFor="title"
              className='text-gray-700 font-semibold'
            >
              Title
            </label>

            <input
              type="text"
              name='title'
              value={note.title}
              onChange={handleChange}
              placeholder='New Note'
              className='px-2 w-full shadow-sm border mt-2 font-semibold border-gray-400 text-sm py-2 rounded focus:outline-none'
            />

          </div>



          <div className='mb-4'>

            <label className='text-gray-700 font-semibold'>
              Categories
            </label>

            <select
              name='category_id'
              value={note.category_id}
              onChange={handleChange}
              className='px-2 w-full shadow-sm border mt-2 font-semibold border-gray-400 text-sm py-2 rounded focus:outline-none'
            >

              <option value="">
                Select Category
              </option>

              {
                categories.map((val) => (
                  <option
                    key={val.id}
                    value={val.id}
                  >
                    {val.name}
                  </option>
                ))
              }

            </select>

          </div>



          <div className='flex flex-col gap-2 mt-2'>

            <label
              htmlFor="description"
              className='text-gray-700 font-semibold'
            >
              Content
            </label>

            <textarea
              name='description'
              value={note.description}
              onChange={handleChange}
              className='border w-full h-56 border-gray-500 bg-white focus:outline-none p-2 rounded'
            >

            </textarea>

          </div>



          <button
            type='submit'
            className='text-blue-500 mt-6 cursor-pointer'
          >
            Save
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddNote;