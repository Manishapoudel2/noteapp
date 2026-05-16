import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditCategory = () => {

    const API = import.meta.env.VITE_API_URL;
    const { id } = useParams();

    const [editCategories, setEditCategories] = useState({
        name: ""
    });

    const fetchCategory = async () => {
        try {

            const res = await axios.get(`${API}/categories/${id}`);


            setEditCategories(res.data[0]);

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.put(`${API}/categories/${id}`, {
                name: editCategories.name
            });

            alert("Category Updated Successfully");

            fetchCategory();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>

            <div className='border border-gray-400 p-10 flex flex-col gap-4 rounded w-full max-w-md shadow-xs bg-white'>

                <h2 className='text-xl font-bold text-gray-800 text-center'>
                    Edit Category
                </h2>

                <form
                    onSubmit={handleEdit}
                    className='flex flex-col gap-4'
                >

                    <div className='flex flex-col gap-2'>

                        <label className='font-semibold text-gray-700'>
                            Category Name :
                        </label>

                        <input
                            type="text"
                            value={editCategories.name || ""}
                            onChange={(e) => {
                                setEditCategories({
                                    ...editCategories,
                                    name: e.target.value
                                });
                            }}
                            placeholder='Enter category name'
                            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
                        />

                    </div>

                    <button
                        type='submit'
                        className='bg-blue-600 hover:bg-blue-700 text-white p-2 font-semibold rounded-md transition'
                    >
                        Save Category
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditCategory;