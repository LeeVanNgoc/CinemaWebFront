import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: { email: "", token: "", auth: null },
  isError: false,
  isLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        account: {
          email: action.data.email,
          token: action.data.token,
          auth: true,
        },
        isError: false,
        isLoading: false,
      };

    case FETCH_USER_ERROR:
      return {
        ...state,
        account: { auth: false },
        isError: true,
        isLoading: false,
      };

    case USER_LOGOUT:
      return {
        ...state,
        account: {
          email: "",
          token: "",
          auth: false,
        },
      };

    case USER_REFRESH:
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
          auth: true,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
