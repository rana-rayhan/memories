const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { jwtActivationKey } = require("../secret");

//
//
// login middleware
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) throw createError(400, "Please log in or register first");
    const decoded = jwt.verify(token, jwtActivationKey);
    if (!decoded)
      throw createError(400, "Invalid access token, please login again");
    req.user = decoded.user;
    next();
  } catch (error) {
    return next(error);
  }
};
//
//
// logout middleware
const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (token) throw createError(400, "User is already logged in");
    // const refreshToken = req.cookies.refreshToken;
    // if (refreshToken) throw createError(400, "User is already logged in");

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
