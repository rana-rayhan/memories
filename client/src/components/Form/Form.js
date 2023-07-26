import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../Redux/Posts/postSlice";
import { base, url } from "../../api";
import axios from "axios";

const Form = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tag: "",
    selectedFile: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");

    if (user) {
      try {
        const res = await axios.post(`${base}${url}`, postData);
        dispatch(createPost(postData));
        setError(null);
        setPostData({
          creator: "",
          title: "",
          message: "",
          tag: "",
          selectedFile: "",
        });
        return res.data;
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      setError("Please login first");
    }
  };

  const handleClearData = (e) => {
    e.preventDefault();
    setPostData({
      creator: "",
      title: "",
      message: "",
      tag: "",
      selectedFile: "",
    });
  };

  return (
    <div className="row justify-content-end mt-2 bg-info rounded border p-4 ">
      <form
        onSubmit={handleSubmit}
        className="justify-content-end overflow-hidden"
      >
        <h5 className="text-center mb-2">Create a New Post</h5>
        {error && (
          <span
            style={{ fontSize: "12px" }}
            className="text-danger ms-5 ps-4 mb-3"
          >
            {error}
          </span>
        )}

        <div className="form-row">
          <div className="form-group col-md-12">
            <input
              value={postData.creator}
              onChange={(e) =>
                setPostData({ ...postData, creator: e.target.value })
              }
              placeholder="Creator"
              type="text"
              name="creator"
              className="form-control mb-2"
            />
          </div>

          <div className="form-group col-md-12">
            <input
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              placeholder="Title"
              type="text"
              name="title"
              className=" form-control mb-2"
            />
          </div>

          <div className="form-group col-md-12">
            <textarea
              style={{ resize: "none" }}
              placeholder="Message"
              rows="3"
              type="text"
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
              name="message"
              className=" form-control mb-2"
            />
          </div>

          <div className="form-group col-md-12">
            <input
              placeholder="Tag"
              value={postData.tag}
              onChange={(e) =>
                setPostData({ ...postData, tag: e.target.value.split(",") })
              }
              name="tag"
              className="form-control mb-2"
            />
          </div>

          {/* base64 image upload */}
          <div className="form-group border rounded text-muted btn btn-outline-info col-md-12 mb-3">
            <FileBase
              // className="form-control mb-2"
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            type="submit"
            className="btn btn-primary mb-1 w-100 col-md-6 "
          >
            SUBMIT
          </button>
          <button
            onClick={handleClearData}
            type="submit"
            className="btn btn-danger w-100 mt-1 col-md-6"
          >
            CLEAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
