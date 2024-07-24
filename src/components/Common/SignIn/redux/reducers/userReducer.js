import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: { email: "", auth: null },
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
      console.log(">>> check action: ", action);
      return {
        ...state,
        account: {
          email: action.data.email,

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
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      return {
        ...state,
        account: {
          email: "",
          auth: false,
        },
      };

    case USER_REFRESH:
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          auth: true,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
