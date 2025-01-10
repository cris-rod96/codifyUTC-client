import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courseId: null,
  classId: null,
  userId: null,
  activityId: null,
}

const idSlice = createSlice({
  name: 'ids',
  initialState,
  reducers: {
    saveCourseId: (state, action) => {
      state.courseId = action.payload
    },
  },
})

export const { saveCourseId } = idSlice.actions

export default idSlice.reducer
