export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";

export const setSelectedUser = (user) => ({
  type: SET_SELECTED_USER,
  payload: user,
});

export const clearSelectedUser = () => ({
  type: CLEAR_SELECTED_USER,
});
