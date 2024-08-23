import { handleGetListPosts } from "../../config";

export const SET_SELECTED_POST = "SET_SELECTED_POST";
export const CLEAR_SELECTED_POST = "CLEAR_SELECTED_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";

export const setSelectedPost = (post) => ({
  type: SET_SELECTED_POST,
  payload: post,
});

export const clearSelectedPost = () => ({
  type: CLEAR_SELECTED_POST,
});

export const getPosts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "GET_POSTS" });
    try {
      let res = await handleGetListPosts();
      console.log("res list posts >>>", res);
      if (res && res.posts) {
        const formattedData = res.posts.map((item) => ({
          postCode: item.postCode,
          title: item.title,
          content: item.content,
          postDate: item.postDate,
          image: item.image,
          link: item.link,
        }));
        dispatch({
          type: "GET_POSTS_SUCCESS",
          payload: { posts: formattedData },
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
};