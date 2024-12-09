import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  classes: [],
  activities: [],
}

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    saveCourses: (state, action) => {
      state.courses = action.payload
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

export const { saveCourses, saveActivities, saveClasses } = teacherSlice.actions

export default teacherSlice.reducer
