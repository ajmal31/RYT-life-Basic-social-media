import { UserModel } from "../models/userSchema.js";

export default {

  createNewUser: async (username, email, password) => {
    return new UserModel({
      username,
      email,
      password,
    }).save();
  },
  
  findUser:(key,value)=>{
    return UserModel.findOne({[key]:value})
  }
};
