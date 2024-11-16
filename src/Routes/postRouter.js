import express from "express"
import { createPost,getAllPosts,deletePost, likeToggler,addComment } from "../controllers/postController.js"
import authentication from "../middlewares/auth.js"
import { creatPostValidation } from "../middlewares/validation.js"
import multerHandler from "../utils/multer.js"

const router=express.Router()
router.use(authentication)

router.route("/")
.post(multerHandler("post"),creatPostValidation,createPost)
.get(getAllPosts)

// DELETE POST
router.route("/:id")
.delete(deletePost)

// LIKE/DISLIKE POST
router.route("/:id/like")
.post(likeToggler)

// ADD COMMENT
router.route("/:id/comment").post(addComment)

export default router