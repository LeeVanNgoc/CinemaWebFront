export const SET_SELECTED_TRAILER = "SET_SELECTED_TRAILER";
export const CLEAR_SELECTED_TRAILER = "CLEAR_SELECTED_TRAILER";

export const setSelectedTrailer = (trailer) => ({
  type: SET_SELECTED_TRAILER,
  payload: trailer,
});

export const clearSelectedTrailer = () => ({
  type: CLEAR_SELECTED_TRAILER,
});
