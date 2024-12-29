import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import  bcrypt from "bcrypt"

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
    userType:{
        type: String,
        enum: ['admin', 'user', 'guest'], 
        default: 'user',
    }
    ,
    otp:{
        type:Number,
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.pre("save",async function(next){
    let otp=Math.floor(100000 + Math.random() * 900000);;
    this.otp=await bcrypt.hash(this.otp,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.validateOtp=async function(otp){
    return await bcrypt.compare(otp,this.otp)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name,
            phone:this.phone,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIREY
        }
    )
}


userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIREY
        }
    )
}
export const User=mongoose.model("User",userSchema)
