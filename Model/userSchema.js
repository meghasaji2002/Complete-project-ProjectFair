//import mongoose
const mongoose = require('mongoose')

//create scheme
const userScheme = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        //if the input value is not a proper email id then it throw the error and return invalid email
        // isEmail is a method in validator which check whether the input is a proper email id or not
        validator(value){
            if(!validator.isEmail(value))
            {throw new Error('Invalid Email')}
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})


//create model
const users = mongoose.model("users",userScheme)

//export
module.exports = users