import { SET_SELECTED_POST, CLEAR_SELECTED_POST } from "../actions/postActions";

const initialState = {
  selectedPost: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case CLEAR_SELECTED_POST:
      return {
        ...state,
        selectedPost: [],
      };
    default:
      return state;
  }
};

export default postReducer;
