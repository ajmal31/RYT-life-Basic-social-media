import userHelper from "../helpers/userHelper.js";
import { userSignupValidation } from "../utils/validations.js";
import { passworHash } from "../utils/passwordHash.js";

export const signup = async (req, res) => {
  try {
    userSignupValidation(req);
    const { username, password, email } = req.body;

    //Hashing password
    const hashedPassword = await passworHash(password)

    //check email is already exist or not
    const key = "email";
    const user = await userHelper.findUser(key, email)
    if (user) return res.status(409).json({ message: "user already exists" });

    const newUser = await userHelper.createNewUser(
      username,
      email,
      hashedPassword
    );
    return res.json({ message: "user created" ,data:{userId:newUser?.id}});

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


