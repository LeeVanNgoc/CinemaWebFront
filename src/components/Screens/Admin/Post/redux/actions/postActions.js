export const SET_SELECTED_POST = "SET_SELECTED_POST";
export const CLEAR_SELECTED_POST = "CLEAR_SELECTED_POST";

export const setSelectedPost = (post) => ({
  type: SET_SELECTED_POST,
  payload: post,
});

export const clearSelectedPost = () => ({
  type: CLEAR_SELECTED_POST,
});
