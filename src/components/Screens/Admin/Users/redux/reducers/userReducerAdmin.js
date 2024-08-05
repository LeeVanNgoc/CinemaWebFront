import { SET_SELECTED_USER, CLEAR_SELECTED_USER } from "../actions/userActions";

const initialState = {
  selectedUser: [],
  loading: false,
  error: null,
};

const userReducerAdmin = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUser: [],
      };
    default:
      return state;
  }
};

export default userReducerAdmin;
