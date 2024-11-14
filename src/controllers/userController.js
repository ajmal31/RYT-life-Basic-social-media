import userHelper from "../helpers/userHelper.js";
import { userSignupValidation } from "../utils/validations.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    userSignupValidation(req);
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    //check email is already exist or not
    const key = "email";
    const user = await userHelper.findUser(key, email);
    if (user) return res.json({ message: "user already exists" });

    const newUser = await userHelper.createNewUser(
      username,
      email,
      hashedPassword
    );
    return res.json({ message: "user created" });
    
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
