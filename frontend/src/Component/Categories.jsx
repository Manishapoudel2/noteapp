import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Categories = ({ noteCategory, setNoteCategory }) => {
  const { user } = useAuth();
  const userObject = user ? JSON.parse(user) : null;
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [noteCategories, setNoteCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories`);
      setNoteCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/categories/${id}`);
      setNoteCategories((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const filterNoteCategory = noteCategories.filter((item) => {
    const term = (noteCategory || "").toLowerCase();
    return item.name?.toLowerCase().includes(term);
  });

  return (
    <div className='w-full bg-gray-50 min-h-screen rounded-sm'>
      <div className='flex flex-col px-4 sm:px-6 md:px-12 mt-6 gap-6'>
        <div className='flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:items-center'>
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-gray-800">
              Categories
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Manage your note categories
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard/addcategories')}
            className="bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold"
          >
            + New Category
          </button>
        </div>
        <div className='flex items-center border border-gray-200 bg-white py-2 px-2 rounded w-full sm:w-1/2'>
          <CiSearch size={18} />
          <input
            value={noteCategory}
            onChange={(e) => setNoteCategory(e.target.value)}
            type="text"
            placeholder='Search Categories'
            className='focus:outline-none w-full ml-2 text-sm'
          />
        </div>
        <div >
          <table className='min-w-full bg-white text-center'>
            <thead className='shadow'>
              <tr className='text-gray-800'>
                <th className='text-sm font-semibold py-3'>CATEGORY NAME</th>
                <th className='text-sm font-semibold py-3'>CREATED AT</th>
                <th className='text-sm font-semibold py-3'>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filterNoteCategory.length > 0 ? (
                filterNoteCategory.map((val) => (
                  <tr
                    key={val.id}
                    className='border-b border-gray-200 text-gray-600 '
                  >
                    <td className='py-3 text-sm font-medium'>
                      {val.name}
                    </td>
                    <td className='text-xs'>
                      {val.created_at
                        ? new Date(val.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className='py-3'>
                      <div className='flex gap-3 justify-center items-center'>
                        <FiEdit2 onClick={() => {
                          navigate(`/dashboard/edit/categories/${val.id}`)
                        }}
                          size={15}
                          color='green'
                          className='cursor-pointer'
                        />
                        <MdOutlineDeleteOutline
                          size={18}
                          color='red'
                          className='cursor-pointer'
                          onClick={() => handleDelete(val.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className='py-6 text-sm text-gray-500'>
                    No Match Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Categories;