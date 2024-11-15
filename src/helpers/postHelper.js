import { PostModel } from "../models/postSchema.js";

export default{
    creatNewPost:async(title,contentURL,userId)=>{
        return await new PostModel({
            title,
            contentURL,
            userId
        }).save()
    },
    findAllPosts:async(lastDocId)=>{
        const query=lastDocId ? {_id:{$gt:lastDocId}} : {}
        return await PostModel.find(query)
        .sort({_id:1})
        .limit(10)
        .populate("userId",["username"])
    },
    deletePost:async(postId,userId)=>{
      return await PostModel.deleteOne({_id:postId,userId})
    }
}