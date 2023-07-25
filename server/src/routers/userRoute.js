const {
  viewUsers,
  createUser,
  handleLogin,
  handleLogout,
} = require("../controllers/userController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");


const {
  registerValidationUser,
  loginValidationUser,
} = require("../validator/auth");
const { runValidation } = require("../validator/runValidation");

const userRoute = require("express").Router();

userRoute.get("/", viewUsers);
userRoute.post("/register", registerValidationUser, runValidation, createUser);
userRoute.post("/login", loginValidationUser, runValidation, isLoggedOut, handleLogin);
userRoute.post("/logout", isLoggedIn, handleLogout);
//
//
//
module.exports = userRoute;
