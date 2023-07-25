import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../../api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(url);
  return res.data;
});

// step 1: creating slice for posts
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  // // reducers
  reducers: {
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    deletePost: (state, action) => {
      const filterPost = [...state.posts].filter(
        (el) => el._id !== action.payload
      );
      state.posts = filterPost;
    },
    likePost: (state, action) => {
      const postId = action.payload; // Assuming the payload is the post ID
      const postIndex = state.posts.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        // If the post is found in the array
        state.posts[postIndex] = {
          ...state.posts[postIndex],
          likeCount: state.posts[postIndex].likeCount + 1,
        };
      }
    },
  },
  // extra reducers
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.payload;
      state.error = null;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.error = true;
    });
  },
});

// export reducers

export const { createPost, deletePost, likePost } = postSlice.actions;

export default postSlice.reducer;
