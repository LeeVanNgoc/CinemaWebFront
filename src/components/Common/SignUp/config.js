import { toast } from "react-toastify";
import axios from "../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:6060";

export const handleCreateUser = createAsyncThunk(
  "user/create-new-user",
  async (
    { firstName, lastName, userName, phonenumber, email, password, city },
    { rejectWithValue }
  ) => {
    const birthYear = 0;
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      await axios.post(`${backendURL}/api/user/create-new-user`, null, {
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
        config,
      });
      toast.success("Đăng ký tài khoản thành công!");
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
