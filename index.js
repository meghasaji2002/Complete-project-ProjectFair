// 1) import dotenv
//Loads .env file contents into process.env by default.

require('dotenv').config()

//2) import express
const express = require('express')

//3)import cors
const cors = require('cors')

               //import router
               const router = require('./Routers/router')

            //import connection.js file
             require('./DB/connections')

//4) create server
const pfServer = express()

//5) use of cors in server
pfServer.use(cors())

const bodyParser = require("body-parser");
pfServer.use(bodyParser.json({ limit: "200mb"}));
pfServer.use(bodyParser.text({limit:"200mb"}));
pfServer.use(bodyParser.urlencoded({ limit:"200mb", extended:true}));

            //use of router by server
            pfServer.use(router)


//server use uploads folder
//first argument-- the way in which other application should use this folder
//second argument -- export that folder -- express static
pfServer.use('/uploads',express.static('./uploads'))

  
//6)Returns middleware that only parses json -- javascript object
pfServer.use(express.json())


             

//7) customize the port  -- by default -3000
const PORT = 3001 || process.env 

//8) to run server
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

pfServer.get('/',(req,res)=>{
    res.send(`project fair server running successfully and ready to accept requests for client`)
})



//node cant automatically recompile 
// so we use nodemon ---- npm i -g nodemon
// nodemon index.js

//post request
// pfServer.post('/',(req,res)=>{
//     res.send(`post request`)
// })

//post doesnt shows any output bz browser can only shows get so here we use postman


//put request
// pfServer.put('/',(req,res)=>{
//     res.send(`put request`)
// })

//delete request
// pfServer.delete('/',(req,res)=>{
//     res.send(`delete request`)
// })