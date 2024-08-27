import { createSlice } from '@reduxjs/toolkit'
import { handleCreateUser } from '../config'
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    userInfo: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateUser.pending, (state) => {
        console.log('Pending')
        state.loading = true
        state.error = null
      })
      .addCase(handleCreateUser.fulfilled, (state, action) => {
        console.log('Fulfilled', action.payload)
        toast.success("Đăng ký thành công!");
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(handleCreateUser.rejected, (state, action) => {
        console.log('Rejected', action.payload)
        state.loading = false
        state.error = action.payload
      })
  },
})

export default userSlice.reducer