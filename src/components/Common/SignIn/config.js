import axios from "../../../axios";

const handleLoginApi = async (userEmail, userPassword) => {
  try {
    const response = await axios.post("/api/user/login-user", null, {
      params: {
        email: userEmail,
        password: userPassword,
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

export { handleLoginApi };
