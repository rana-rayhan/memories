import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Header from "./components/Layouts/Header";
import Blog from "./components/Pages/Blog";
import UpdatePost from "./components/Form/UpdatePost";
import Auth from "./components/Form/Auth";
import Login from "./components/Form/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:title" element={<Blog />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/update-post" element={<UpdatePost />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
