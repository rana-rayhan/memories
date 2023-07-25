import React from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";


const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-md-9 col-12 order-md-1 order-2">
          <Posts />
        </div>
        <div className="col-md-3 col-12 order-md-2 order-1 mt-0 mt-md-5">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Home;
