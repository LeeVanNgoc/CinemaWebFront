export const SET_SELECTED_MOVIE = "SET_SELECTED_MOVIE";
export const CLEAR_SELECTED_MOVIE = "CLEAR_SELECTED_MOVIE";

export const setSelectedMovie = (MOVIE) => ({
  type: SET_SELECTED_MOVIE,
  payload: MOVIE,
});

export const clearSelectedMovie = () => ({
  type: CLEAR_SELECTED_MOVIE,
});
