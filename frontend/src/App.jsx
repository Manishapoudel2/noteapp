import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './Context/AuthContext'
import Layout from './Layout/Layout'
import Login from './Component/Login'
import Signup from './Component/Signup'
import ProtectedRoute from './Route/ProtectedRoute'
import Categories from './Component/Categories'
import Notes from './Component/Notes'
import AddNote from './Component/AddNote'
import EditNote from './Component/EditNote'
import { useState } from 'react'

import { Tiptap } from '@tiptap/react'
import AddCategory from './Component/AddCategory'
import EditCategory from './Component/EditCategory'



function App() {
   const [search , setSearch] = useState("")
  const [noteCategory , setNoteCategory] = useState("")
  return (
    
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup />}/>


         
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout search={search} setSearch={setSearch} />
                
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/categories" element={<Categories  noteCategory={noteCategory} setNoteCategory={setNoteCategory}  />} />
            <Route path="/dashboard/mynotes" element={<Notes search={search}  setSearch={setSearch}  noteCategory={noteCategory} />} />
            <Route path="/dashboard/addnote" element={<AddNote />} />
           <Route path="/dashboard/editnote/:id" element={<EditNote />} />
                       <Route path="/dashboard/addcategories" element={<AddCategory />} />
                       <Route path="/dashboard/edit/categories/:id" element={<EditCategory />} />
         
          
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  )
}

export default App