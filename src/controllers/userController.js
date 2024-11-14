import userHelper from "../helpers/userHelper.js";
import { loginValidation, userSignupValidation } from "../utils/validations.js";
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

export const login=async(req,res)=>{

    try {
        loginValidation(req)
        //check user exist or not
        //check password valid
        //creat JWT token
        // Bonue : handle multiple brower login/logged out
        const{password,email}=req.body
        const key="email"
        const user=await userHelper.findUser(key,email)
        if(!user) throw new Error("Invalid credentials")

        const isPasswordValid=await user.validatePassword(password)
        if(!isPasswordValid) throw new Error("Invalid credentials")   

        // TODO: genereate JWT token    
        const payload={
            userId:user._id
        }
        const token=user.getJWT(payload)
        res.cookie("token",token,{maxAge:1000*60*60*24*7})
        res.json({message:"login success",data:{token}})

    } catch (error) {
        res.status(400).json({message:error?.message})
    }
}


