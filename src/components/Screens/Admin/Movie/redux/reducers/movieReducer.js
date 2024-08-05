import {
  SET_SELECTED_MOVIE,
  CLEAR_SELECTED_MOVIE,
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  MOVIE_REFRESH,
} from "../actions/movieActions";

const initialState = {
  movies: [],
  selectedMovie: [],
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
      };
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

export default movieReducer;
