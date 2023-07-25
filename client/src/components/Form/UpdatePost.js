import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { url } from "../../api";
import axios from "axios";

const UpdatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { _id, creator, title, message, tag, selectedFile } = location.state;

  const [updateData, setPostData] = useState({
    creator: creator,
    title: title,
    message: message,
    tag: tag,
    selectedFile: selectedFile,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${url}/${_id}`, updateData).then(() => navigate("/"));

    setPostData({
      creator: "",
      title: "",
      message: "",
      tag: "",
      selectedFile: "",
    });
  };

  return (
    <div className="row justify-content-center mt-4">
      <form onSubmit={handleSubmit} className="w-25">
        <h5 className="text-center mb-3">Update Post</h5>

        <div className="form-row">
          <div className="form-group col-md-12">
            <input
              value={updateData.creator}
              onChange={(e) =>
                setPostData({ ...updateData, creator: e.target.value })
              }
              required
              placeholder="Creator"
              type="text"
              name="creator"
              className="form-control mb-2"
            />
          </div>

          <div className="form-group col-md-12">
            <input
              required
              value={updateData.title}
              onChange={(e) =>
                setPostData({ ...updateData, title: e.target.value })
              }
              placeholder="Title"
              type="text"
              name="title"
              className=" form-control mb-2"
            />
          </div>

          <div className="form-group col-md-12">
            <textarea
              required
              style={{ resize: "none" }}
              placeholder="Message"
              rows="3"
              value={updateData.message}
              onChange={(e) =>
                setPostData({ ...updateData, message: e.target.value })
              }
              name="message"
              className="form-control mb-2"
            />
          </div>

          <div className="form-group col-md-12">
            <input
              required
              placeholder="Tag"
              value={updateData.tag}
              onChange={(e) =>
                setPostData({ ...updateData, tag: e.target.value.split(",") })
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
                setPostData({ ...updateData, selectedFile: base64 })
              }
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-primary col-md-6 me-1">
            UPDATE
          </button>
          <button type="submit" className="btn btn-danger col-md-6 ms-1">
            CLEAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
