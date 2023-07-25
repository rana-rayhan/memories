require("dotenv").config();

//
//server port
const PORT = process.env.SERVER_PORT || 4001;
//
// mongodb url 
const mongodbUrl =
  process.env.MONGO_ATLAS_URL || "mongodb://localhost:27017/socialapp-P8";
//
//jwt token secret key
const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY ||
  "E7H6VnK42C9s3jBm8FgR5YpXqLwTzD1iU0aO4eN7xJ2yM6vP3oZ5uG8cH5bX9tF6";
//
// smtp username, password & CLIENT URL
// const smtpUsername = process.env.SMTP_USERNAME || "";
// const smtpPassword = process.env.SMTP_PASSWORD || "";
// const clientUrl = process.env.CLIENT_URL;

module.exports = {
  PORT,
  mongodbUrl,
  jwtActivationKey,
};
