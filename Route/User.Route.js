
const express  = require('express')
const UserController = require('../Controller/User.Controller')
const verifyToken = require('../Middleware/AuthMiddleware')
const router = express.Router()
router.get('/',verifyToken,  UserController.getUser)
router.get('/:id',UserController.getUserById)
router.post('/signup',UserController.createUser)
router.delete('/:id',UserController.deleteUser)
router.post('/signin',UserController.loginUser)
module.exports=router