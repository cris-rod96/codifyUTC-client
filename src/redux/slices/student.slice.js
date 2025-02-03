import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  classes: [],
  courseStudentId: null,
  userCourse: null,
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

    saveUserCourse: (state, action) => {
      state.userCourse = action.payload
    },

    deleteUserCourse: (state) => {
      state.userCourse = null
    },
  },
})

export const {
  saveAllClassesByCourse,
  setCourseStudentId,
  saveUserCourse,
  deleteUserCourse,
} = studentSlice.actions

export default studentSlice.reducer
