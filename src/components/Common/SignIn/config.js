import axios from "../../../axios";

const handleLoginApi = async (userEmail, userPassword) => {
  try {
    const user = new URLSearchParams({
      email: userEmail,
      password: userPassword,
    }).toString();

    const response = await axios.post("/api/user/login-user", user, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(">>>>", response);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      return { error: error.response.data.message || "Login failed" };
    } else if (error.request) {
      // Request was made but no response received
      return { error: "No response from server" };
    } else {
      // Something happened in setting up the request
      return { error: "Error setting up request" };
    }
  }
};

export { handleLoginApi };
