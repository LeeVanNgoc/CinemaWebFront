export const SET_THEATER = "SET_THEATER";

export const setTheater = (theaterCode) => ({
  type: SET_THEATER,
  payload: { theaterCode },
});
