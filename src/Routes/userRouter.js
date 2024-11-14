import express from "express"
import { login, signup } from "../controllers/userController.js"
const router=express.Router()

// Register a user

router.route("/register").post(signup)

router.route("/login").post(login)

export default router