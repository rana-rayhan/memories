/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import defaultimg from "../images/defaultimg.jpeg";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../Redux/Posts/postSlice";
import { url } from "../../api";
import axios from "axios";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const { title, likeCount, createdAt } = data;
  const [like, setLike] = useState(likeCount);
  const [likeMsg, setLikemsg] = useState(null);

  const showNotification = () => {
    toast.info(likeMsg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const trancateMessage = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deletePost(id));
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      setLike(like + 1);
      setLikemsg("Liked Successfully");
      await axios.put(`${url}/like/${id}`);
      dispatch(likePost(id));
      showNotification();
    } catch (error) {
      setLikemsg(error.response.data.message);
      showNotification();
    }
  };

  return (
    <div key={data._id} className="col-12 col-md-6 col-lg-4 mt-2 ">
      <div className="card h-100 shadow-sm">
        <img
          className="card-img-top  border-bottom"
          style={{ width: "100%", height: "210px" }}
          src={data.selectedFile ? data.selectedFile : defaultimg}
          alt="Loading..."
        />
        <div className="d-flex justify-content-between">
          <p
            style={{ fontSize: "10px", padding: "0px" }}
            className="ms-1 text-muted"
          >
            {data.tag && data.tag.map((el) => " #" + el)}
          </p>
          <p style={{ fontSize: "10px" }} className="text-muted me-1">
            {createdAt &&
              formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
          </p>
        </div>

        <div className="card-body p-0 px-3">
          <h5 className="card-title text-uppercase">{data.title}</h5>
          <p style={{ fontSize: "13px" }} className="card-text text-muted">
            {trancateMessage(data.message, 100)}
            <Link style={{ textDecoration: "none" }} to={title} state={data}>
              Learn more
            </Link>
          </p>
        </div>

        <div className="d-flex justify-content-end px-2">
          <span style={{ fontSize: "10px" }}>Creator: {data.creator}</span>
        </div>

        <div className="d-flex justify-content-between align-content-center p-3">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleLike(data._id)}
            className=""
          >
            <span style={{ fontSize: "13px" }} className=" fw-bold text-center">
              {data.likeCount}
            </span>
            <span
              style={{ fontSize: "20px" }}
              className="ms-1 text-primary text-center"
            >
              <AiOutlineLike />
            </span>
          </div>

          <div className=" text-center pt-1">
            <span style={{ color: "green" }} className="text-info">
              <Link state={data} to="/update-post">
                <FaEdit />
              </Link>
            </span>
          </div>

          <div style={{ cursor: "pointer" }} className="">
            <span
              onClick={() => handleDelete(data._id)}
              className=" fs-5 fw-bold text-danger"
            >
              <MdDelete />
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
