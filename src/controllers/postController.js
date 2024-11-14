import { creatPostValidation } from "../utils/validations.js"



export const createPost=async(req,res)=>{
  try {
    creatPostValidation(req)
    
  } catch (error) {
    return res.json({message:error?.message})
  }
}

