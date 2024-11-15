import jwt from "jsonwebtoken";
import constants from "../utils/constants.js";
import userHelper from "../helpers/userHelper.js";
const authentication = async(req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
        return res.staus(404).json({ message: "Token not found. Please login" });
    }
    //Verifying Token
    const data = jwt.verify(token, constants.JWT_SECRET_KEY);
    const key="_id"

    const user=await userHelper.findUser(key,data?.userId)
    if(!user) return res.status(404).json({message:"Please login"})
    req.user = user;
    next();
  } catch (error) {
    if (error?.name === "TokenExpiredError"){

        return res.status(401).json({ message: "Token Expired. Please login" });
    }
    return res.status(401).json({ message: "Please Login" });
  }
};

export default authentication;
