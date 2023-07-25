import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Redux/Posts/postSlice";
import { FcPrevious, FcNext } from "react-icons/fc";

import Post from "./Post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const dispatch = useDispatch();

  const { posts, isLoading } = useSelector((state) => state.posts);
  const [filterPosts, setFilterPost] = useState(posts);

  // search memories start --*
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
  };

  useEffect(() => {
    const value = search.toLowerCase();
    const newPost = posts.filter((post) => {
      const postTitle = post.title.toLowerCase();
      const postTag = post.tag.map((tag) => tag.toLowerCase()); // Convert all tags to lowercase

      return (
        postTitle.includes(value) || postTag.some((tag) => tag.includes(value))
      );
    });

    setFilterPost(newPost);
  }, [search, posts]);

  // search memories end --*

  // pagination start--**
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  useEffect(() => {
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    setFilterPost(currentPosts);
  }, [currentPage, posts, indexOfFirstPost, indexOfLastPost]);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  // pagination end--**

  // fetching post data
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // loading notification for post start
  const showNotification = () => {
    toast.info("Loading...", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    });
  };

  useEffect(() => {
    if (isLoading) {
      showNotification();
    } else {
      toast.dismiss();
    }
  }, [isLoading]);
  // loading notification for post end

  return (
    <div className="raw">
      <div className="pagination justify-content-center mt-2">
        <div className="d-flex justify-content-between w-50">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="prev-button btn btn-sm btn-outline-info  text-dark"
          >
            <FcPrevious />
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastPost >= posts.length}
            className="next-button btn btn-sm btn-outline-info  text-dark"
          >
            <FcNext />
          </button>
        </div>
      </div>

      <div className=" d-flex justify-content-center bg-info rounded mt-3 p-2 gap-1">
        <input
          className=" input-group border-0 rounded"
          placeholder="Search item by Title or Tags"
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={handleSearch}
        />
        <button className="btn btn-outline-light text-dark fw-semibold">
          Search
        </button>
      </div>

      <div className="row mt-3">
        {filterPosts.map((el) => (
          <Post key={el._id} data={el} />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Posts;
