import { uploadFile } from "../utils/uploadFile.js";
import { creatPostValidation } from "../utils/validations.js"



export const createPost=async(req,res)=>{
  try {
    creatPostValidation(req)
    const folderName = "posts";
    const url=await uploadFile(req.file,folderName)
    console.log(url)
    res.json({message:"post created"})
    
  } catch (error) {
    return res.json({message:error?.message})
  }
}

