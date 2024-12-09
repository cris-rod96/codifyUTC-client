import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
}

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    saveCourses: (state, action) => {
      state.courses = action.payload
    },
  },
})

export const { saveCourses } = teacherSlice.actions

export default teacherSlice.reducer
