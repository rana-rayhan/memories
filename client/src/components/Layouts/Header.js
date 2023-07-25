import React from "react";

import Memories from "../images/memories.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="container  py-2 bg-info text-white d-flex justify-content-center align-items-center shadow-sm rounded my-2">
        <div className=" align-content-center justify-content-center ">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="d-inline text-light mr-3 ps-4 d-none d-md-inline-block">Memories app</h1>
            <img
              src={Memories}
              alt="memories"
              className="img-thumbnail ms-2 d-none d-sm-inline-block "
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        </div>
        <div className="ms-auto justify-content-end text-end">
          {!user && (
            <Link
              style={{ textDecoration: "none" }}
              to="/auth"
              className="px-4 text-end fw-semibold btn btn-outline-light text-black me-1 "
            >
              Sign in
            </Link>
          )}
          {!user ? (
            <Link
              style={{ textDecoration: "none" }}
              to="/login"
              className="px-4 text-end fw-semibold btn btn-outline-light text-black "
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => handleLogout()}
              style={{ textDecoration: "none" }}
              className="px-4 text-end fw-semibold btn btn-outline-light text-black "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
