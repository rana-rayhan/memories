const Post = require("../models/postModels");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
//
//
// get all posts by GET request
const viewPosts = async (req, res, next) => {
  try {
    // Use Mongoose sort() method to retrieve posts in descending order based on createdAt field
    const posts = await Post.find().sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      throw createError(404, "No posts found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Get all posts by users",
      payload: posts,
    });
  } catch (error) {
    // If any error occurs, pass it to the next middleware (error handler in app.js)
    next(error);
  }
};

//
//
// create posts by
const createPosts = async (req, res, next) => {
  try {
    const { title, message, creator, tag, likeCount, selectedFile } = req.body;

    if (!title || !message || !creator || !tag)
      throw createError(403, "All filed must be filed");

    const newPost = await Post.create({
      title,
      message,
      creator,
      tag,
      likeCount,
      selectedFile,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Post created successfully",
      payload: newPost,
    });
  } catch (error) {
    // if any error then catch the error into next(error) -- app.js
    next(error);
  }
};
//
//
// delete posts by G
const deletePosts = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) throw createError(404, "Post not found");

    successResponse(res, {
      statusCode: 200,
      message: "Post deleted successfully",
      payload: deletePost,
    });
  } catch (error) {
    // if any error then catch the error into next(error) -- app.js
    next(error);
  }
};
//
//
// update all posts by
const updatePostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    // find a user by id ---***
    await findWithId(Post, postId);

    // find and update a user
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { ...req.body },
      {
        new: true,
      }
    );

    // return users into response controller--**
    return successResponse(res, {
      statusCode: 200,
      message: "Post was updated seccessfully",
      payload: updatePost,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Like all posts by
const likePostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    console.log(postId);
    // find a user by id ---***
    const post = await findWithId(Post, postId);
    if (!post) throw createError(404, "Post not found");
    // find and update a user
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { likeCount: post.likeCount + 1 },
      {
        new: true,
      }
    ).select("-selectedFile");

    // return users into response controller--**
    return successResponse(res, {
      statusCode: 200,
      message: "Post was Like seccessfully",
      payload: updatePost,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// exports moduel
module.exports = {
  viewPosts,
  createPosts,
  deletePosts,
  updatePostById,
  likePostById,
};
