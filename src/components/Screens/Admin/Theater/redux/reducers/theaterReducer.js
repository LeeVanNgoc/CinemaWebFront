import {
  SET_SELECTED_THEATER,
  CLEAR_SELECTED_THEATER,
} from "../actions/theaterActions";

const initialState = {
  selectedTheater: [],
  loading: false,
  error: null,
};

const theaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_THEATER:
      return {
        ...state,
        selectedTheater: action.payload,
      };
    case CLEAR_SELECTED_THEATER:
      return {
        ...state,
        selectedTheater: [],
      };
    default:
      return state;
  }
};

export default theaterReducer;
