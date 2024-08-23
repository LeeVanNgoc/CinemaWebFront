import { SET_SELECTED_GENRE, CLEAR_SELECTED_GENRE } from "../actions/genreActions";

const initialState = {
  selectedGenre: [],
  loading: false,
  error: null,
};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_GENRE:
      return {
        ...state,
        selectedTrailer: action.payload,
      };
    case CLEAR_SELECTED_GENRE:
      return {
        ...state,
        selectedTrailer: [],
      };
    default:
      return state;
  }
};

export default genreReducer;
