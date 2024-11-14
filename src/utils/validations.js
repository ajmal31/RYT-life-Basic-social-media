import validator from "validator";

export const userSignupValidation = (req) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password))
    throw new Error("Please provide neccessory values");
  else {

      if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
      }
      if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
      }
      if(!validator.isLength(username,{max:10})){
        throw new Error("username length exceeds")
      }
  }
};
