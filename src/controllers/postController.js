import { uploadFile } from "../utils/uploadFile.js";
import postHelper from "../helpers/postHelper.js";

export const createPost = async (req, res) => {
  try {
    const { _id } = req.user;
    const folderName = "posts";
    const url = await uploadFile(req.file, folderName);

    // //TODO : authenticated user can only create post
    const newPost = await postHelper.createNewPost(req.body.title, url, _id);
    return res.json({ message: "post created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error?.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let lastDocId = req.query?.lastId;
    const posts = await postHelper.findAllPosts(lastDocId);
    res.json({ message: "success", data: { posts } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params?.id;
    const { _id } = req.user;
    if (!postId) throw new Error("Request is not valid");

    const post = await postHelper.deletePost(postId, _id);

    if (!post.deletedCount) {
      throw new Error("unAuhtorized request");
    }
    res.json({ message: "post deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likeToggler = async (req, res) => {
  try {
    const { _id } = req?.user;
    const postId = req.params?.id;

    // Find the post
    const post = await postHelper.findOnePost(postId);

    if (!post) throw new Error("Post not found");

    //check user already liked or not
    const isLiked = post.likes.some(
      (like) => like?.userId.toString() === _id.toString()
    );

    if (isLiked) {
      // Remove the like
      post.likes = post.likes.filter(
        (like) => like?.userId.toString() !== _id.toString()
      );
      post.save();
      res.json({
        message: "unliked",
        data: { likesCount: post?.likes.length },
      });
    } else {
      // Add Like
      post.likes.push({ userId: _id });
      post.save();
      res.json({ message: "Liked", data: { likesCount: post?.likes.length } });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "unAuthorized Request" });
    }
    return res.status(400).json({ message: error?.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { _id } = req?.user;
    const postId = req.params?.id;
    const { content } = req.body;
    if (!postId || !content || typeof content !== "string")
      throw new Error("Invalid Request");

    const post = await postHelper.findOnePost(postId);
    if (!post) throw new Error("Invalid Request");
    post.comments.push({ userId: _id, content });
    post.save();
    res.json({ message: "comment Added" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    let { title } = req.body;
    const postId = req.params?.id;
    const { _id } = req.user;
    if ((!title?.trim() && typeof title !== "string") || !postId) {
      throw new Error("Invalid Request");
    }
    const post = await postHelper.findOnePost(postId, _id);

    if (!post) throw new Error("Invalid Request");
    if (post.title === title?.trim())
    throw new Error("please do any changes in title");
    post.title = title;
    post.save();
    return res.json({ message: "post updated" });
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
};
