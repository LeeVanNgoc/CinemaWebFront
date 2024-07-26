import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:6060'

export const registerUser = createAsyncThunk(
  'user/create-new-user',
  async ({ firstName, lastName, userName, phonenumber, email, password }, { rejectWithValue }) => {
    const birthYear = 2000;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }

      await axios.post(
        `${backendURL}/api/user/create-new-user`,
        { firstName, lastName, userName, phonenumber, email, password, birthYear },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)