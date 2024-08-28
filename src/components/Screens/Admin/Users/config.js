import { toast } from "react-toastify";
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

const handleGetUserByCode = async (userCode) => {
  try {
    const response = await axios.get("/api/user/get-user-by-code", {
      params: { userCode: userCode },
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
  phonenumber,
  city
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
        city: city,
      },
    });
    toast.success(response.message);
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
  userCode,
  firstName,
  lastName,
  userName,
  phonenumber,
  birthYear,
  city
) => {
  try {
    const response = await axios.put("/api/user/edit-user/", null, {
      params: {
        userCode: userCode,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        phonenumber: phonenumber,
        birthYear: birthYear,
        city: city,
      },
    });
    toast.success("Cập nhật thông tin thành công!");
    console.log(">>> edit user res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing user:", error);
    if (error.response) {
      toast.success(error.response.data.message);
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleDeleteUser = async (userCode) => {
  try {
    const response = await axios.delete("/api/user/delete-user", {
      params: {
        code: userCode,
      },
    });
    toast.success("Xóa người dùng thành công!");
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      toast.success(error.response.data.message);
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
  handleGetUserByCode,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
};
