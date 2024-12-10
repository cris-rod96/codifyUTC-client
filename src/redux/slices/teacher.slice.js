import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  classes: [],
  activities: [],
  students: [],
}

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    saveCourses: (state, action) => {
      state.courses = action.payload
    },

    saveAllClassesInCourses: (state, action) => {
      if (action.payload.length > 0) {
        const mapClasses = action.payload.map((course) => course.Classes).flat()
        state.classes = [...mapClasses]
      } else {
        state.classes = []
      }
    },

    saveAllStudents: (state, action) => {
      if (action.payload.length > 0) {
        const mapStudents = action.payload
          .map((course) => course.Students)
          .flat()
        state.students = [...mapStudents]
      } else {
        state.students = []
      }
    },

    saveClasses: (state, action) => {
      const validClasses = action.payload || []
      state.classes = validClasses
    },

    saveActivities: (state, action) => {
      const validActivities = action.payload || []
      state.activities = validActivities
    },
  },
})

export const {
  saveCourses,
  saveActivities,
  saveClasses,
  saveAllStudents,
  saveAllClassesInCourses,
} = teacherSlice.actions

export default teacherSlice.reducer
