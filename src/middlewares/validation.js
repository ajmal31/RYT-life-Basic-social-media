import validator from "validator";

export const userSignupValidation = (req,res,next) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password)){
      return res.status(400).json({message:"Please provide neccessory values"})
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({message:"Email is not valid"})
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({message:"Please enter a strong password"})
  }
  if (!validator.isLength(username, { max: 10 })) {
    return res.status(400).json({message:"username length exceeds"})
  }
  next()
};

export const loginValidation = (req,res,next) => {
  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({message:"Please provide neccessory values"})
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({message:"Email is not valid"})
  }
  //if it's not a strong password there is no chance match this password
  if (!validator.isStrongPassword(password)) {
    return res.status(401).json({message:"Invalid credentials"})
  }
  next()
};

export const creatPostValidation = (req) => {
  const { title } = req.body;
  const { file } = req;
  const maxFileSize=2 * 1048576
  
  const contentAcceptedTypes = ["jpeg", "jpg", "png"];
  const { user } = req;

  if (!title || !file||!user){ 
    return res.status(400).json({message:"Please provide neccesory values"})
  }
  const type = file.mimetype?.split("/")[1];
  if(!contentAcceptedTypes.includes(type)) {
    return res.status(400).json({message:"Content type is not acceptable"})
  }
   
  if(!validator.isLength(title,{max:200})){
    return res.status(400).json({message:"Title length must be under 200 chars"})
  }
  if(file.size >maxFileSize){
    return res.status(400).json({message:"File size exceeds"})
  }
  next()
};
