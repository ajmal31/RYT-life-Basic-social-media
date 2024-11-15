import { UserModel } from "../models/userSchema.js";

export default {

  createNewUser: async (username, email, password) => {
    return await new UserModel({
      username,
      email,
      password,
    }).save();
  },
  
  findUser:async(key,value)=>{
    return await UserModel.findOne({[key]:value})
  },
  updateUserFeilds:async(userId,key,value)=>{
    return await UserModel.
    updateOne(
      {_id:userId},
      {[key]:value},
      {upsert:true,new:true}
    )
  }
};
