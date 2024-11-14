import userHelper from "../helpers/userHelper.js";
import { userSignupValidation } from "../utils/validations.js";
import bcrypt from "bcrypt"

export const signup = async(req, res) => {
  try {

    userSignupValidation(req)
    const {username,password,email}=req.body
    const hashedPassword=await bcrypt.hash(password,10)

    // const newUser=userHelper.signup(username,email,hashedPassword)


   
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
