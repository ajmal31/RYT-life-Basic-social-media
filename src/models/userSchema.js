import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import constants from "../utils/constants.js"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureURL:{
    type:String
  },
  lastActiveToken:{type:String}
},{
  timestamps:true
});


userSchema.methods.validatePassword=async function (password){
    
    const isPasswordValid=await bcrypt.compare(password,this.password)
    return isPasswordValid
}

userSchema.methods.getJWT=function (payload){

    const token=jwt.sign(payload,constants.JWT_SECRET_KEY,{expiresIn:'7d'})
    return token
}

export const UserModel = model("users", userSchema);