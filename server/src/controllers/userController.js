const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const { createJsonWebToken } = require("../helper/createJsonWebToken");
const { jwtActivationKey } = require("../secret");
const { setAccessTokenCookie } = require("../helper/setCookie");
//
//
// view all user
const viewUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users) throw createError(403, "Users not found");

    successResponse(res, {
      statusCode: 200,
      message: "Users found successfully",
      payload: users,
    });
  } catch (error) {
    // if any error then catch the error into next(error) -- app.js
    next(error);
  }
};
//
//
// create user
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) throw createError(403, "User is already exist");

    const newUser = await User.create({
      name,
      email,
      password,
    });

    successResponse(res, {
      statusCode: 200,
      message: "User is created successfully",
      payload: newUser,
    });
  } catch (error) {
    // if any error then catch the error into next(error) -- app.js
    next(error);
  }
};
//
//
// login user and athinticate
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, "User not Exist. Please register first");

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    //if password not match
    if (!isPasswordMatch)
      throw createError(401, "Password or Email did not match");

    // creating access token for user verification
    const token = createJsonWebToken({ user }, jwtActivationKey, "15m");
    setAccessTokenCookie(res, token);

    // // creating refresh token for user verification
    // const refreshToken = createJsonWebToken({ user }, jwtActivationKey, "7d");
    // setRefreshTokenCookie(res, refreshToken);

    return successResponse(res, {
      statusCode: 200,
      message: "User is logged in successfully",
      payload: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Logout user
const handleLogout = async (req, res, next) => {
  try {
    const userToken = req.user;
    res.clearCookie("accessToken");
    // res.clearCookie("refreshToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User is logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
//
//
//
module.exports = {
  viewUsers,
  createUser,
  handleLogin,
  handleLogout,
};
