import { SET_SELECTED_POST, CLEAR_SELECTED_POST, GET_POSTS_SUCCESS, } from "../actions/postActions";

const initialState = {
  posts: [],
  selectedPost: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
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
