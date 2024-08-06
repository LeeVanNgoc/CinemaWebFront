export const SET_SELECTED_SEAT = "SET_SELECTED_SEAT";
export const CLEAR_SELECTED_SEAT = "CLEAR_SELECTED_SEAT";

export const setSelectedSeat = (seat) => ({
  type: SET_SELECTED_SEAT,
  payload: seat,
});

export const clearSelectedSeat = () => ({
  type: CLEAR_SELECTED_SEAT,
});
