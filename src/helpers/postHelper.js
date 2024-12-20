import { PostModel } from "../models/postSchema.js";

export default {
  createNewPost: async (title, contentURL, userId) => {
    return await new PostModel({
      title,
      contentURL,
      userId,
      likes: [],
    }).save();
  },
  findAllPosts: async (lastDocId) => {
    const query = lastDocId ? { _id: { $gt: lastDocId } } : {};
    return await PostModel.find(query)
      .sort({ _id: 1 })
      .limit(10)
      .populate("userId", ["username"])
      .populate({
        path: "comments.userId",
        select: "username profilePictureURL",
        options: { strictPopulate: false },
      });
  },
  deletePost: async (postId, userId) => {
    return await PostModel.deleteOne({ _id: postId, userId });
  },
  findOnePost: async (postId, userId) => {
    const query = userId ? { _id: postId, userId: userId } : { _id: postId };
    return PostModel.findOne(query);
  },
  updateLike: async () => {},
};
