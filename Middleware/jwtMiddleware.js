//import jwt
const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware', req.headers);
    
    const token = req.headers['authorization'].split('Bearer ')[1]
    console.log(token);

    try{
       const jwtResponse = jwt.verify(token,"supersecretkey12345")
       console.log(jwtResponse);
       req.payload = jwtResponse.userId 
       next()

    } catch(err){
        res.status(401).json('Authorization Failed ... Please Login')
    }

   
}



module.exports =jwtMiddleware