import axios from "../../../../axios";

const handleGetListUsers = async () => {
  try {
    const response = await axios.get("/api/user/get-all-users");
    return response;
  } catch (error) {
    console.error("Error getting list of users:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetUserById = async (userId) => {
  try {
    const response = await axios.get("/api/user/get-user-by-id", {
      params: { userId: userId },
    });
    return response;
  } catch (error) {
    console.error("Error getting user by id:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreateUser = async (
  email,
  password,
  firstName,
  lastName,
  birthYear,
  userName,
  phonenumber
) => {
  try {
    const response = await axios.post("/api/user/create-new-user/", null, {
      params: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthYear: birthYear,
        userName: userName,
        phonenumber: phonenumber,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleEditUser = async (
  userId,
  firstName,
  lastName,
  userName,
  phonenumber,
  birthYear
) => {
  try {
    const response = await axios.put("/api/user/edit-user/", null, {
      params: {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        phonenumber: phonenumber,
        birthYear: birthYear,
      },
    });
    console.log(">>> edit user res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing user:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleDeleteUser = async (userId) => {
  try {
    const response = await axios.delete("/api/user/delete-user", {
      params: {
        id: userId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export {
  handleGetListUsers,
  handleGetUserById,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
};
