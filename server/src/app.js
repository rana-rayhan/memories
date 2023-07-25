const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser"); // readme - 3

const postRoute = require("./routers/postRoute");
const { errorResponse } = require("./controllers/responseController");
const userRoute = require("./routers/userRoute");
const app = express();
//
//
//using middlewares
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
//
//
//base routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
//
//
// client error handle
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});
//
//
//server error handle --> handle all error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});
//
//
// export default app
module.exports = app;
