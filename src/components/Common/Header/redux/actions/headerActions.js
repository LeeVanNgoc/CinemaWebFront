export const SET_THEATER = "SET_THEATER";
export const REFRESH_THEATER = "REFRESH_THEATER";

export const setTheater = (theaterCode) => {
  return async (dispatch, getState) => {
    localStorage.setItem("theater", theaterCode);
    dispatch({ type: SET_THEATER, payload: { theaterCode } });
  };
};

export const refreshTheater = (theaterCode) => {
  return async (dispatch, getState) => {
    dispatch({ type: REFRESH_THEATER });
  };
};
