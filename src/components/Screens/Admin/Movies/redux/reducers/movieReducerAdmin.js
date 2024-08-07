import { SET_SELECTED_MOVIE, CLEAR_SELECTED_MOVIE } from "../actions/movieActions";

const initialState = {
  selectedMovie: [],
  loading: false,
  error: null,
};

const movieReducerAdmin = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
      };
    case CLEAR_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: [],
      };
    default:
      return state;
  }
};

export default movieReducerAdmin;
