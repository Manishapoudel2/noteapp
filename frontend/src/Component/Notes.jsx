import { AiOutlineFileAdd } from "react-icons/ai";
import { MdKeyboardArrowDown, MdOutlineDeleteOutline, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Notes = ({ search, setSearch , noteCategory  }) => {
  const { user } = useAuth();
  const userObject = user ? JSON.parse(user) : null;
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(3);
          const [categories, setCategories] = useState([]);





  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchData = async (user_id) => {
    try {
      const res = await axios.get(`${API}/note/user/${user_id}`);
      setNotes(res.data);

    } catch (err) {
      console.log(err);
    }
  };

         const fetchCategories = async () => {
            try {
              const res = await axios.get(`${API}/categories`);
              setCategories(res.data);
            } catch (err) {
              console.log(err);
            }
          };
  const handleDelete = async (id) => {
    const res = await axios.delete(`${API}/note/${id}`)
    window.location.reload()
  }

  useEffect(() => {
    fetchData(userObject.user_id);
    fetchCategories()
  }, [])







  const filterNotes = notes.filter((item) => {
    const plainDescription = item.description
  ?.replace(/<[^>]+>/g, "")
  .toLowerCase();
    const term = (search || "").toLowerCase();
    const matchSearch =
      item.title?.toLowerCase().includes(term) ||
      item.name?.toLowerCase().includes(term) ||
      
       plainDescription?.includes(term);
const matchCategory =
  category === "" ||
  category === "All" ||
  item.Name?.toLowerCase() === category.toLowerCase();

    return matchSearch && matchCategory
  })
  const totalPages = Math.ceil(
    filterNotes.length / notesPerPage
  );

  const indexOfLastNote = currentPage * notesPerPage;

  const indexOfFirstNote =
    indexOfLastNote - notesPerPage;

  const currentNotes = filterNotes.slice(
    indexOfFirstNote,
    indexOfLastNote
  );
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col px-6 py-8">

      <div className="flex justify-between items-center max-w-5xl w-full mx-auto mb-8">
        <div>
          <h2 className="font-bold text-2xl text-gray-800">My Notes </h2>
          <p className="text-gray-500 text-sm mt-1">Manage your notes</p>
        </div>

        <button onClick={() => {
          navigate('/dashboard/addnote')
        }} className="bg-blue-700 hover:bg-blue-800 transition text-white flex items-center gap-2 px-4 py-1 rounded shadow-sm">
          <AiOutlineFileAdd className="text-lg " />
          New Note
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full mx-auto gap-4 bg-white p-4 rounded-lg shadow-sm">


        <div className="flex flex-col w-full md:w-1/2 relative" >
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Categories</h2>

          <div
            onClick={() => setOpenCategory(true)}
            className="flex items-center border border-gray-200 rounded-md px-2 bg-gray-50 cursor-pointer"
          >
            <input
              type="text"
              placeholder="Select categories or create new..."
              value={category === "All" ? "" : category}

              className="w-full bg-transparent text-sm px-2 py-1 focus:outline-none cursor-pointer"
            />

            <MdKeyboardArrowDown className="text-gray-500" />
          </div>

       {openCategory && (
            <div className="absolute top-18 bg-white border border-gray-200 w-full rounded">
              {["All", ...categories.map((c) => c.name)].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setOpenCategory(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>


        <div className="flex items-center gap-3 relative">
          <span className="text-sm font-semibold text-black">Sort by:</span>

          <div className="flex items-center gap-2">
            <div
              onClick={() => setOpen(!open)}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm font-semibold cursor-pointer bg-white flex items-center justify-center gap-2"
            >
              Date
              <IoIosArrowDown />
            </div>

            <div className="border flex items-center justify-center gap-2 border-gray-300 px-3 py-2 rounded-md text-sm font-semibold min-w-24">
              <FaArrowDown />
              {sortBy}
            </div>
          </div>

          {open && (
            <div className="absolute top-12 left-14 bg-white border border-gray-200 shadow-md rounded-sm w-32">
              {["Newest", "Oldest"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSortBy(item);
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>


      <div className="mt-6 px-4">

        {currentNotes.length === 0 ? (
          <div className="bg-white flex flex-col sm:w-fit  items-center border-b  justify-center gap-4 py-6 lg:w-5xl mx-auto mt-6 rounded-t-md h-1/2">

            <AiOutlineFileAdd size={26} color="gray" />
            <h1 className="font-semibold">No notes found</h1>
            <p className="text-gray-600 text-sm">Get started by creating your first note</p>
            <button
              onClick={() => {
                navigate('/dashboard/addnote')
              }} className="bg-blue-700  text-white flex items-center gap-2 px-4 py-1 rounded  shadow-sm">
              <AiOutlineFileAdd className="text-lg" />
              Create Note
            </button>
          </div>
        ) : (
          currentNotes.map((val, i) => (
            <div key={i} className="flex flex-col bg-white w-full mb-4 py-6 gap-4 rounded px-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{val.title}</p>
                <div className="flex items-center gap-3">
                  <FiEdit2 size={12} color='blue' onClick={() => {
                    navigate(`/dashboard/editnote/${val.id}`)
                  }} className="cursor-pointer" />
                  <MdOutlineDeleteOutline size={16} color='red' onClick={() => {
                    handleDelete(val.id)
                  }} />
                </div>
              </div>
              <p className="text-xs">{val.Name}</p>
              <div dangerouslySetInnerHTML={{ __html: val.description }} />
              <hr />
            </div>

          ))

        )}
        <div className="flex justify-around items-center mt-4">
          <p className="text-xs text-gray-600">
            Showing{" "}
            {filterNotes.length === 0
              ? 0
              : indexOfFirstNote + 1}{" "}
            -{" "}
            {Math.min(
              indexOfLastNote,
              filterNotes.length
            )}{" "}
            of {filterNotes.length} results
          </p>

          <div className="flex items-center gap-3 text-sm">
            <label>Rows:</label>

            <input
              type="number"
              min="1"
              value={notesPerPage}
              onChange={(e) => {
                setNotesPerPage(
                  Number(e.target.value)
                );


              }}
              className="border w-14 rounded-sm border-gray-400 px-1"
            />
          </div>

          <div className="flex  gap-2">
            <MdOutlineKeyboardArrowLeft onClick={() => {
              handlePrev()
            }} className={`border border-gray-400 rounded-sm text-2xl cursor-pointer ${currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : ""
              }`}
            />
            <h1>{currentPage}</h1>
            <MdOutlineKeyboardArrowRight onClick={() => {
              handleNext()
            }} className={`border border-gray-400 rounded-sm text-2xl cursor-pointer ${currentPage === totalPages ||
                totalPages === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
              }`}
            />
          </div>
        </div>

      </div>


    </div>

  );
};

export default Notes;