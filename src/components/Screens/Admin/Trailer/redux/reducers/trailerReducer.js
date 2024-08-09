import { SET_SELECTED_TRAILER, CLEAR_SELECTED_TRAILER } from "../actions/trailerActions";

const initialState = {
  selectedTrailer: [],
  loading: false,
  error: null,
};

const trailerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TRAILER:
      return {
        ...state,
        selectedTrailer: action.payload,
      };
    case CLEAR_SELECTED_TRAILER:
      return {
        ...state,
        selectedTrailer: [],
      };
    default:
      return state;
  }
};

export default trailerReducer;
