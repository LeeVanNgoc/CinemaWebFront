import { SET_THEATER, REFRESH_THEATER } from "../actions/headerActions";

const initialState = {
  theater: "T001",
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEATER:
      return {
        ...state,
        theater: action.payload.theaterCode,
      };
    case REFRESH_THEATER:
      return {
        ...state,
        theater: localStorage.getItem("theater"),
      };
    default:
      return state;
  }
};

export default headerReducer;
