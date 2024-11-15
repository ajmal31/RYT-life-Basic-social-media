import validator from "validator";

export const userSignupValidation = (req) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password))
    throw new Error("Please provide neccessory values");

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
  if (!validator.isLength(username, { max: 10 })) {
    throw new Error("username length exceeds");
  }
};

export const loginValidation = (req) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Please provide neccessory values");
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  //if it's not a strong password there is no chance match this password
  if (!validator.isStrongPassword(password)) {
    throw new Error("invalid credentials");
  }
};

export const creatPostValidation = (req) => {
  const { title } = req.body;
  const { file } = req;
  const maxFileSize=2 * 1048576
  
  const contentAcceptedTypes = ["jpeg", "jpg", "png"];
  const { user } = req;

  if (!title || !file||!user) throw new Error("Please provide neccesory values");
  const type = file.mimetype?.split("/")[1];
  if(!contentAcceptedTypes.includes(type)) throw new Error("Content type is not acceptable")
   
  if(!validator.isLength(title,{max:200})) throw new Error("Title length must be under 200 chars")
  if(file.size >maxFileSize) throw new Error("File size exceeds")
};
