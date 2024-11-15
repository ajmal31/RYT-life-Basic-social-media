import express from "express"
import { createPost,getAllPosts,deletePost, likeToggler } from "../controllers/postController.js"
import multer from "multer"
import authentication from "../middlewares/auth.js"
import { creatPostValidation } from "../middlewares/validation.js"
const router=express.Router()
const upload=multer({storage :multer.memoryStorage()})

router.use(authentication)

router.route("/")
.post(upload.single("post"),creatPostValidation,createPost)
.get(getAllPosts)

router.route("/:id")
.delete(deletePost)

router.route("/:id/like")
.post(likeToggler)

export default router