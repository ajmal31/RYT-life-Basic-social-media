import express from "express"
import { createPost } from "../controllers/postController.js"
import multer from "multer"
import authentication from "../middlewares/auth.js"
const router=express.Router()
const upload=multer({storage :multer.memoryStorage()})

router.use(authentication)

router.route("/").post(upload.single("post"),createPost)

export default router