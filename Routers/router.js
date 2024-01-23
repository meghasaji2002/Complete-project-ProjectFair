//setup path to resolve request

//1) import express module
const express = require('express')

    //import controller
    const userController = require('../Controllers/userController')

    //import projectController
    const projectController = require('../Controllers/projectController')

    //import jwtMiddleawre
    const jwtMiddleware = require('../Middleware/jwtMiddleware')


//import multerConfig
const multerConfig = require('../Middleware/multerMiddleware')

    //2) create an object for router class inside express module
 const router = new express.Router()

//3)setup path to resolve request
    //syntax-- router.httprequest('path to resolve',()=>{how to resolve})

    //a) register
     router.post('/user/register',userController.register)

     //b)login
     router.post('/user/login',userController.login)

     //c)add project
     router.post('/projects/add',jwtMiddleware,multerConfig.single('image'),projectController.addproject)

     //d)home project
     router.get('/project/home-project',projectController.gethomeproject)

     //e)all project
     router.get('/project/all-project',jwtMiddleware,projectController.getallProject)

     //f)user project
     router.get('/project/user-project',jwtMiddleware,projectController.getuserProject)

     //e)edit project
     router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('image'),projectController.editUserProject)

     //delete project
     router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteProject)

     //edit profile
     router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)

//4)export router
  module.exports = router

