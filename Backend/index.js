const express = require('express');

require ('dotenv').config()
const cors = require('cors')
const app = express()
const UserRoute = require('./Route/User.Route');
const NoteRoute = require('./Route/Note.Route');
const CategoryRoute = require('./Route/Category.Route')
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use(express.json()); 
app.use('/user',UserRoute)
app.use('/note',NoteRoute)
app.use('/categories',CategoryRoute)

app.listen(3000,()=>{
    console.log("App is running on 3000",`localhost:3000`)
})