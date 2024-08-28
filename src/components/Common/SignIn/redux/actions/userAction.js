import { toast } from "react-toastify";
import { handleLoginApi, handleLoginByOTP } from "../../config";

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
          localStorage.setItem("token", res.token);

          dispatch({
            type: "FETCH_USER_SUCCESS",
            data: { email: email.trim(), token: res.token },
          });
          toast.success("Đăng nhập thành công!");
        } else if (res.errCode === 5) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Mk ko đúng: ", res.message);
        } else if (res.errCode === 1) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Không tìm thấy người dùng: ", res.message);
        } else if (res.errCode === 2) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Không tìm thấy email: ", res.message);
        } else if (res.errCode === 3) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Lỗi khi đăng nhập: ", res.message);
        }
      }
    } catch (error) {
      console.error("Login error: ", error);
      dispatch({ type: "FETCH_USER_ERROR" });
    }
  };
};

export const handleLoginByOtpRedux = (email, otp) => {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_USER_LOGIN" });

    try {
      const res = await handleLoginByOTP(email.trim(), otp);
      console.log("> check res login by otp: ", res);

      if (res) {
        if (res.errCode === 0) {
          localStorage.setItem("email", email.trim());
          localStorage.setItem("token", res.token);

          dispatch({
            type: "FETCH_USER_SUCCESS",
            data: { email: email.trim(), token: res.token },
          });
          toast.success("Đăng nhập thành công!");
        } else if (res.errCode === 5) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Mk không đúng: ", res.message);
        } else if (res.errCode === 1) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Không tìm thấy người dùng: ", res.message);
        } else if (res.errCode === 2) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Không tìm thấy email: ", res.message);
        } else if (res.errCode === 3) {
          dispatch({ type: "FETCH_USER_ERROR" });
          toast.error(res.message);
          console.error("Lỗi khi đăng nhập: ", res.message);
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
    sessionStorage.clear();
  };
};

export const handleRefreshRedux = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_REFRESH });
  };
};
