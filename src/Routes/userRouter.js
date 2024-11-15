import express from "express"
import { login, signup,uploadProfilePicture } from "../controllers/userController.js"
import authentication from "../middlewares/auth.js"
import { loginValidation,userSignupValidation } from "../middlewares/validation.js"
import multerHandler from "../utils/multer.js"
const router=express.Router()

// REGISTER USER
router.route("/register").post(userSignupValidation,signup)

// LOGIN USER
router.route("/login").post(loginValidation,login)

// UPLOAD USER PROFILE PICTURE
router.route('/profilePicture')
.patch(authentication,multerHandler("profile"),uploadProfilePicture)

export default router