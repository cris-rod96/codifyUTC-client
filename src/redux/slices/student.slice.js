import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  classes: [],
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    saveAllClassesByCourse: (state, payload) => {
      state.classes = payload
    },
  },
})

export const { saveAllClassesByCourse } = studentSlice.actions

export default studentSlice.reducer
