import express from "express"
import { createPost } from "../controllers/postController.js"
import multer from "multer"
const router=express.Router()
const upload=multer({storage :multer.memoryStorage()})

router.route("/").post(upload.single("post"),createPost)

export default router