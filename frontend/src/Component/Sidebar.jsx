
import { IoBookOutline } from "react-icons/io5";
import { GoFileDirectory } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const { login } = useAuth();
  const userObject = JSON.parse(user);
  const navigate = useNavigate()
  const [active, setActive] = useState("categories")
  return (
    <div className="min-h-screen w-54 shadow">
      <div className="w-fit p-6 flex gap-4 flex-col">
        <h1 className="font-semibold text-xl   ">Notes App</h1>
        <div className={`flex gap-2 items-center  text-sm py-2 w-44    font-semibold rounded cursor-pointer  ${active === 'mynotes' ? 'bg-blue-50 text-blue-600 ' : 'text-black'}`} onClick={() => {
          setActive('mynotes'); navigate('/dashboard/mynotes')
        }}>
          <IoBookOutline className="ml-2" />
          <h3>My Notes</h3>
        </div>
        <div className={`flex gap-2 items-center text-sm py-2   font-semibold w-44 rounded cursor-pointer  ${active === 'categories' ? 'bg-blue-50 text-blue-600 ' : 'text-black'}`} onClick={() => {
          setActive('categories'); navigate('/dashboard/categories')
        }}>
          <GoFileDirectory className="ml-2" />
          <h3>Categories</h3>
          <MdOutlineKeyboardArrowRight className="ml-12" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;

    