import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"something went wrong while generating refresh and access tokens ")
    }
}

const registerUser=asyncHandler(async(req,res)=>{
    const{name,email,phone,age,password}=req.body;

    if([name,email,phone,age,password].some((field)=>field.trim()==="")){
        throw new ApiError(400,"all fields are required")
    }
    const existedUser=await User.findOne({
        $or:[{email}]
    })
    
    if(existedUser){
        throw new ApiError(409,"User already exists")
    }

    const user=await User.create({
        name,
        email,
        phone,
        age,
        password
    })

    const isCreated=User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!isCreated){
        throw new ApiError(500,"something went wrong while registering the user ")
    }

    return res.status(201).json(
        new ApiResponse(200,isCreated,"user registered successfully")
    )
})


const loginUser=asyncHandler(async(req,res)=>{
    const {identifier,password}=req.body;

    if(!email){
        throw new ApiError(400,"email is required");
    }

    if(!password){
        throw new ApiError(400,"password is required");
    }

    const user=await User.findOne({
        $or:[{email}]
    })

    if(!user){
        throw new ApiError(404,"suer does not exist ")
    }

    const isPassValid=await user.isPasswordCorrect(password)

    if(!isPassValid){
        throw new ApiError(401,"please enter the correct details")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
    }

    console.log("user found");

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "user logged in successfully"
        )
    )
})

export {registerUser,loginUser}