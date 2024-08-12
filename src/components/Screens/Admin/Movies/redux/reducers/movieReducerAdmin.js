import {
  SET_SELECTED_MOVIE,
  CLEAR_SELECTED_MOVIE,
  GET_MOVIES_SUCCESS,
  MOVIE_REFRESH,
} from "../actions/movieActions";

const initialState = {
  movies: [],
  selectedMovie: [],
  loading: false,
  error: null,
};

const movieReducerAdmin = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.formattedData,
      };
    case SET_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
      };
    case MOVIE_REFRESH:
      return {
        ...state,
        selectedMovie: JSON.parse(localStorage.getItem("selectedMovie")),
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
