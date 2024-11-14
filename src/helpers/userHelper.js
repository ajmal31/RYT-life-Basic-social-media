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
  }
};
