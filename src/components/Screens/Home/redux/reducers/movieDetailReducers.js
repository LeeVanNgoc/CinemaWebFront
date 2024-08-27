import {
  FETCH_MOVIES_BY_THEATER,
  FETCH_MOVIES_BY_DATE_AND_THEATER,
  FETCH_MOVIES_ERROR,
  CLEAR_MOVIES,
} from "../actions/movieDetailActions";

const initialState = {
  moviesInTheater: [],
  movieScreens: [],
  errorMessage: "",
};

const movieDetailActions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_BY_THEATER:
      return {
        ...state,
        moviesInTheater: action.payload.formattedData,
      };
    case FETCH_MOVIES_BY_DATE_AND_THEATER:
      return {
        ...state,
        movieScreens: action.payload.formattedData,
      };
    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movieScreens: [],
      };
    default:
      return state;
  }
};

export default movieDetailActions;
