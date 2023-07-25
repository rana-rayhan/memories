//
//
// create cookie while user login
const setAccessTokenCookie = (res, token) => {
  res.cookie("accessToken", token, {
    maxAge: 15 * 60 * 1000, // 15 minitue
    httpOnly: true,
    //   secure: true,
    sameSite: "none",
  });
};

//  refre
// const setRefreshTokenCookie = (res, refreshToken) => {
//   res.cookie("refreshToken", refreshToken, {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     httpOnly: true,
//     //   secure: true,
//     sameSite: "none",
//   });
// };

module.exports = {
  setAccessTokenCookie,
};
