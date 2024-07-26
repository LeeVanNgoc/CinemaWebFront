import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from '../config'

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
      .addCase(registerUser.pending, (state) => {
        console.log('Pending')
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Fulfilled', action.payload)
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Rejected', action.payload)
        state.loading = false
        state.error = action.payload
      })
  },
})

export default userSlice.reducer