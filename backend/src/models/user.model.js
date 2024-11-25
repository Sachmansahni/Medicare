import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema)