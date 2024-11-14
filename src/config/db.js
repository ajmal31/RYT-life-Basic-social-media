import mongoose from "mongoose"

export const connectDb=async(URI)=>{

  return await mongoose.connect(URI)    

}
