import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  classes: [],
  courseStudentId: null,
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    saveAllClassesByCourse: (state, action) => {
      state.classes = action.payload
    },

    setCourseStudentId: (state, action) => {
      state.courseStudentId = action.payload
    },
  },
})

export const { saveAllClassesByCourse, setCourseStudentId } =
  studentSlice.actions

export default studentSlice.reducer
