import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

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
});


userSchema.methods.validatePassword=async function (password){
    
    const isPasswordValid=await bcrypt.compare(password,this.password)
    return isPasswordValid
}

export const UserModel = model("users", userSchema);