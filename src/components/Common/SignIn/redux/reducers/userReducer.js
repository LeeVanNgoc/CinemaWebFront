import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH,
} from "../actions/userAction";
import jwtDecode from "jwt-decode";

const INITIAL_STATE = {
  account: { email: "", token: "", auth: null },
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isError: false,
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
      };

    case FETCH_USER_ERROR:
      return {
        ...state,
        account: { auth: false },
        isError: true,
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
