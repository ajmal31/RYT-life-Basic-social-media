import { PostModel } from "../models/postSchema.js";

export default{
    creatNewPost:async(title,contentURL,userId)=>{
        return await new PostModel({
            title,
            contentURL,
            userId
        }).save()
    }
}