import express from "express"
import { signup } from "../controllers/userController.js"
const router=express.Router()

// Register a user

router.route("/register").post(signup)

export default router