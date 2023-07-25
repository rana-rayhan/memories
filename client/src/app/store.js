import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../components/Redux/Posts/postSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
