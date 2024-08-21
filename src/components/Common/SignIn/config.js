import axios from "../../../axios";

const handleLoginApi = async (userEmail, userPassword) => {
  try {
    const response = await axios.post("/api/user/login-user-with-jwt", null, {
      params: {
        userEmail: userEmail,
        userPassword: userPassword,
      },
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.response) {
      return { error: error.response.data.message || "Login failed" };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetOTP = async (userEmail) => {
  try {
    const response = await axios.post("/api/user/forgot-password/", null, {
      params: {
        userEmail: userEmail,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getting otp:", error);
    if (error.response) {
      return { error: error.response.data.message || "Login failed" };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleLoginByOTP = async (userEmail, otpCode) => {
  try {
    const response = await axios.post(
      "/api/user/login-request-password",
      null,
      {
        params: {
          userEmail: userEmail,
          otpCode: otpCode,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.response) {
      return { error: error.response.data.message || "Login failed" };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export { handleLoginApi, handleGetOTP, handleLoginByOTP };
