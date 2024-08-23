export const SET_SELECTED_GENRE = "SET_SELECTED_GENRE";
export const CLEAR_SELECTED_GENRE = "CLEAR_SELECTED_GENRE";

export const setSelectedGenre = (genre) => ({
  type: SET_SELECTED_GENRE,
  payload: genre,
});

export const clearSelectedGenre = () => ({
  type: CLEAR_SELECTED_GENRE,
});
