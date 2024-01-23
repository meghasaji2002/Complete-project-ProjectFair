//logic to resolve requests

//import model
const users = require('../Model/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//register request
exports.register = async (req,res)=>{
    //logic
    console.log('inside the controller -- register function',req);
    //extract data from request body bz its already converted from json format to js object using json() method which parses json to js object so we can directly destructure the keys from the req body.
    const {username,email,password} = req.body

    try{const existUser = await users.findOne({email})    // email:email left and right have same key so one email is enough
    if(existUser){
     //if document is present
     res.status(406).json('account already exist.... please login')
    }
    else{
     //need to register
     //1)create an object for the model modelname- users
     const newUser = new users({
         username,
         email,
         password,
         github:"",
         linkedin:"",
         profile:""
     })
     //add to mongodb - use save method in mongoose
     await newUser.save()
 
       //response
       res.status(200).json(newUser)
    }}
   
   //run time errors are resolved by js using try-catch block
   catch(err){
    res.status(401).json(`register request failed due to ${err}`)
   }

   
  
}


//login request
exports.login = async (req,res)=>{
   
    const{email,password} = req.body 


   try{ const existingUser = await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){
        //jwt
        //to generate token -- sign is used
       const token= jwt.sign({userId:existingUser._id},"supersecretkey12345")
       //sending as object bz we have two data 
       res.status(200).json({existingUser,token})
    }
    else{
        res.status(404).json('invalid emailId or password ')
    }}
    catch(err){
        res.status(401).json(`login request failed due to ${err}`)
    }
}

//edit profile
exports.editUser = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body

    const profileImage = req.file?req.file.filename:profile 

    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)
        
    } catch (err) {
        res.status(401).json(err)
    }
}