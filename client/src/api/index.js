import axios from "axios";

// database url for GET or create POST
export const url = "/api/posts";
export const userUrl = "/api/users";

// create a post and store in database
// export const createPostData = async (postData) => {
//   try {
//     const res = await axios.post(url, postData);

//     return res.data;
//   } catch (error) {
//     console.log(error.response.data.message);
//   }
// };
// create a post and store in database
export const updatePostData = async (id, data) => {
  try {
    const res = await axios.put(`${url}/${id}`, { data });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
