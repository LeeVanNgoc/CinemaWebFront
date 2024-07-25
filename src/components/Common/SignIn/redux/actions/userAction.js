import { handleLoginApi } from "../../config";
import { toast } from "react-toastify";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REFRESH = "USER_REFRESH";

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_USER_LOGIN" });

    try {
      const res = await handleLoginApi(email.trim(), password);
      console.log("> check res login: ", res);

      if (res && res.errCode === 0) {
        localStorage.setItem("email", email.trim());
        if (email.trim() === "vuyenhoa@gmail.com") {
          localStorage.setItem("role", "admin");
        }
        dispatch({
          type: "FETCH_USER_SUCCESS",
          data: { email: email.trim() },
        });
      } else {
        toast.error("Login failed. Please check your credentials.");
        dispatch({ type: "FETCH_USER_ERROR" });
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(error);
      dispatch({ type: "FETCH_USER_ERROR" });
    }
  };
};

export const handleLogoutRedux = () => {
  return async (dispatch, getState) => {
    toast.success("Đăng xuất thành công!");
    dispatch({ type: USER_LOGOUT });

    localStorage.clear();
  };
};

export const handleRefresh = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_REFRESH });
  };
};
