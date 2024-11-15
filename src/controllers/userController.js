import userHelper from "../helpers/userHelper.js";
import { passworHash } from "../utils/passwordHash.js";
import { uploadFile } from "../utils/uploadFile.js";

export const signup = async (req, res) => {
  try {
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
    console.warn(error)
    return res.status(400).json({ message: error.message });
  }
};

export const login=async(req,res)=>{

    try {
        //check user exist or not
        //check password valid
        //creat JWT token
        const{password,email}=req.body
        const key="email"
        const user=await userHelper.findUser(key,email)
        if (!user) return res.status(404).json({ message: "Invalid credentials" });

        const isPasswordValid=await user.validatePassword(password)
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        // TODO: genereate JWT token    
        const payload={
            userId:user._id
        }
        const token=user.getJWT(payload)
        res.cookie("token",token,{maxAge:1000*60*60*24*7})
        res.json({message:"login successful",data:{token}})

    } catch (error) {
        res.status(400).json({message:error?.message})
    }
}

export const uploadProfilePicture=async(req,res)=>{
  try {
    const {_id}=req.user
    const file=req?.file
    if(!file) throw new Error("Attach the file")
    const folderName="profilesPictures"
    const url=await uploadFile(file,folderName,_id)
    const key="profilePictureURL"
    const profilePictureUpdated=await userHelper.updateUserFeilds(_id,key,url)
    res.json({message:"profile updated"})

  } catch (error) {
    console.log(error)
    res.status(400).json({message:error.message})
  }
}


