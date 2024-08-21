import { FETCH_MOVIES_BY_DATE } from "../actions/movieDetailActions";

const initialState = {
  movies: [],
};

const movieDetailActions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_BY_DATE:
      return {
        ...state,
        movies: action.payload.formattedData,
      };
    default:
      return state;
  }
};

export default movieDetailActions;
