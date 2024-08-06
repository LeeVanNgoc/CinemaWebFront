export const SET_SELECTED_THEATER = "SET_SELECTED_THEATER";
export const CLEAR_SELECTED_THEATER = "CLEAR_SELECTED_THEATER";

export const setSelectedTheater = (theater) => ({
  type: SET_SELECTED_THEATER,
  payload: theater,
});

export const clearSelectedTheater = () => ({
  type: CLEAR_SELECTED_THEATER,
});
