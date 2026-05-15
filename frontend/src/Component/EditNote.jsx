import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Tiptap from './Tiptap';

const EditNote = () => {
  const { id } = useParams()
  const API = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [edit, setEdit] = useState({
    title: "",
    category_id: "",
    description: ""
  });

  const fetchData = async () => {
    const res = await axios.get(`${API}/note/${id}`);
    setEdit(res.data[0]);

  };


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

    fetchData();
    fetchCategories();

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setEdit({
      ...edit,
      [name]:
        name === "category_id"
          ? Number(value)
          : value
    });

  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      await axios.put(`${API}/note/${id}`, {
        title: edit.title,
        category_id: edit.category_id,
        description: edit.description
      });


    } catch (error) {

      console.log(error);

    }
  };



  return (
    <div className='w-full bg-gray-50 h-full'>
      <div className='px-6 flex flex-col gap-8 mt-6 '>
        <header className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl'>Edit Note</h2>
        </header>

        <form onSubmit={handleUpdate}>
          <div className='mb-6'>
            <label className='text-gray-700 font-semibold'>Title</label>
            <input
              value={edit.title}
              onChange={(e) =>
                setEdit({ ...edit, title: e.target.value })
              }
              type="text"
              className='px-2 w-full border border-gray-400 shadow mt-2 focus:outline-none'
            />
          </div>

          <div className='mb-6'>

            <label className='text-gray-700 font-semibold'>
              Category
            </label>

            <select
              name='category_id'
              value={edit.category_id}
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


          <Tiptap
            value={edit.description}
            onChange={(content) =>
              setEdit({ ...edit, description: content })
            }
          />

          <button
            type='submit'
            className='text-blue-500 mt-4'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;