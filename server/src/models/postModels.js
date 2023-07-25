const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    message: String,
    creator: String,
    tag: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    selectedFile: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
