export const SET_SELECTED_ROOM = "SET_SELECTED_ROOM";
export const CLEAR_SELECTED_ROOM = "CLEAR_SELECTED_ROOM";

export const setSelectedRoom = (room) => ({
  type: SET_SELECTED_ROOM,
  payload: room,
});

export const clearSelectedRoom = () => ({
  type: CLEAR_SELECTED_ROOM,
});
