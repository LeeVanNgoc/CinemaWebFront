import { handleLoginApi } from "../../config";

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

      if (res) {
        if (res.errCode === 0) {
          localStorage.setItem("email", email.trim());
          localStorage.setItem("userCode", res.userCode);
          localStorage.setItem("role", res.role);

          dispatch({
            type: "FETCH_USER_SUCCESS",
            data: { email: email.trim(), code: res.userCode, role: res.role },
          });
        } else if (res.errCode === 5) {
          dispatch({ type: "FETCH_USER_ERROR" });
          console.error("Mk ko đúng: ", res.message);
          dispatch({ type: "FETCH_USER_ERROR" });
        } else if (res.errCode === 1) {
          dispatch({ type: "FETCH_USER_ERROR" });
          console.error("Không tìm thấy người dùng: ", res.message);
          dispatch({ type: "FETCH_USER_ERROR" });
        } else if (res.errCode === 2) {
          dispatch({ type: "FETCH_USER_ERROR" });
          console.error("Không tìm thấy email: ", res.message);
          dispatch({ type: "FETCH_USER_ERROR" });
        } else if (res.errCode === 3) {
          dispatch({ type: "FETCH_USER_ERROR" });
          console.error("Lỗi khi đăng nhập: ", res.message);
          dispatch({ type: "FETCH_USER_ERROR" });
        }
      }
    } catch (error) {
      console.error("Login error: ", error);
      dispatch({ type: "FETCH_USER_ERROR" });
    }
  };
};

export const handleLogoutRedux = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
    localStorage.clear();
    window.location.reload();
  };
};

export const handleRefreshRedux = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_REFRESH });
  };
};
