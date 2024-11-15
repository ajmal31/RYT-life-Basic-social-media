import express from "express"
import { login, signup,uploadProfilePicture } from "../controllers/userController.js"
import authentication from "../middlewares/auth.js"
import { loginValidation,userSignupValidation } from "../middlewares/validation.js"
import multerHandler from "../utils/multer.js"
const router=express.Router()

// Register a user

router.route("/register").post(userSignupValidation,signup)

router.route("/login").post(loginValidation,login)

router.route('/profilePicture')
.patch(authentication,multerHandler("profile"),uploadProfilePicture)

export default router