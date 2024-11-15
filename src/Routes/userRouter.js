import express from "express"
import { login, signup,uploadProfilePicture } from "../controllers/userController.js"
import multer from "multer"
import authentication from "../middlewares/auth.js"
const upload=multer({storage :multer.memoryStorage()})
const router=express.Router()

// Register a user

router.route("/register").post(signup)

router.route("/login").post(login)

router.route('/profilePicture')
.patch(authentication,upload.single("profile"),uploadProfilePicture)

export default router