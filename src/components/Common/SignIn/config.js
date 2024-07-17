import axios from "../../../../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login-user", {
    email: userEmail,
    password: userPassword,
  });
};

export default handleLoginApi;
