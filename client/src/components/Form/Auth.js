import axios from "axios";
import React, { useState } from "react";
import { base, userUrl } from "../../api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${base}${userUrl}/register`, userdata);
      navigate("/login");
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container raw justify-content-center">
      <form
        onSubmit={handleSubmit}
        className=" col-12 col-md-5 border m-auto p-4"
      >
        <span className=" text-danger">{error}</span>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={userdata.name}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={(e) => setUserData({ ...userdata, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            value={userdata.email}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setUserData({ ...userdata, email: e.target.value })
            }
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={userdata.password}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setUserData({ ...userdata, password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn mt-3 btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Auth;
