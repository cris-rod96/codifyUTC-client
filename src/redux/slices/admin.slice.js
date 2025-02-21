import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  courses: [],
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    saveUsers: (state, action) => {
      state.users = action.payload
    },
    saveCourses: (state, action) => {
      state.courses = action.payload
    },
  },
})

export const { saveUsers, saveCourses } = adminSlice.actions
export default adminSlice.reducer
