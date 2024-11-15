import { uploadFile } from "../utils/uploadFile.js";
import { creatPostValidation } from "../utils/validations.js"
import postHelper from "../helpers/postHelper.js"



export const createPost=async(req,res)=>{
  try {
    creatPostValidation(req)
    const {_id}=req.user
    const folderName = "posts";
    const url=await uploadFile(req.file,folderName)

    // //TODO : authenticated user can only create post
    const newPost=await postHelper.creatNewPost(req.body.title,url,_id)
    return res.json({message:"post created"})
    
  } catch (error) {
    console.log(error)
    return res.json({message:error?.message})
  }
}

