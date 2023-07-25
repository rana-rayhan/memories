import React from "react";
import { useLocation } from "react-router-dom";

const Blog = () => {
  const location = useLocation();
  const { creator, title, message, selectedFile, tag } = location.state;

  return (
    <div className=" container">
      <div className="row bg-body-tertiary p-2 pt-3">
        <div className="col-12 col-md-8 rounded ">
          <h4 className="text-center pt-2 mb-2 mb-md-5 text-uppercase fw-bold">{title}</h4>
          <p className="text-muted">
            {message}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam non
            rem velit in pariatur, sunt culpa itaque, eaque debitis unde,
            distinctio adipisci! Alias perferendis ullam rerum eaque sint quo,
            vitae tenetur ex repellendus nulla facilis voluptates modi
            architecto odit assumenda est quibusdam, quas accusantium. Animi
            repellat nesciunt sapiente itaque dolorum!
          </p>
          <p
            style={{ fontSize: "10px" }}
            className=" d-inline-block float-end text-muted fw-bold"
          >
            Creator: {creator}
          </p>
          <span style={{ fontSize: "10px" }} className="text-muted fw-bold">
            Tags: {tag}
          </span>
        </div>

        <div className="col-12 col-md-4 ">
          <img className=" img-fluid rounded" src={selectedFile} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Blog;
