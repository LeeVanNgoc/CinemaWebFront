import axios from "../../../axios";

const handleLoginApi = async (userEmail, userPassword) => {
  try {
    const user = new URLSearchParams({
      email: userEmail,
      password: userPassword,
    }).toString();

    const response = await axios.post("/api/user/login-user", user, {
      params: {
        "Content-Type": "application/x-www-form-urlencoded",
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
