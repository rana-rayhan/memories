const postRoute = require("express").Router();

const {
  viewPosts,
  createPosts,
  deletePosts,
  updatePostById,
  likePostById,
} = require("../controllers/postControllers");
//
//
// get all posts by GET request
postRoute.get("/", viewPosts);
postRoute.post("/", createPosts);
postRoute.delete("/:id", deletePosts);
postRoute.put("/:id", updatePostById);
postRoute.put("/like/:id", likePostById);
//
//
// exports moduel
module.exports = postRoute;
