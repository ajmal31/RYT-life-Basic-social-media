import express from "express"
import { createPost,getAllPosts,deletePost, likeToggler } from "../controllers/postController.js"
import authentication from "../middlewares/auth.js"
import { creatPostValidation } from "../middlewares/validation.js"
import multerHandler from "../utils/multer.js"
const router=express.Router()


router.use(authentication)

router.route("/")
.post(multerHandler("post"),creatPostValidation,createPost)
.get(getAllPosts)

router.route("/:id")
.delete(deletePost)

router.route("/:id/like")
.post(likeToggler)

export default router