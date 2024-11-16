import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    contentURL: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "users",
      required: true,
    },
    likes: [
      {
        userId: {
          type: Schema.ObjectId,
          ref: "users",
          unique: true,
        },
      },
    ],
    comments: [
      {
        content: {
          type: String,
          required: true,
        },
        userId: { type: Schema.ObjectId, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.index({ _id: 1, userId: 1 });

export const PostModel = model("posts", postSchema);
