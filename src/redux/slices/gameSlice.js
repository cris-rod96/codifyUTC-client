import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizzResponses: [],
  activityId: '',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    saveUserAnswers: (state, action) => {
      state.quizzResponses = action.payload
    },
    saveAcitiviTyId: (state, action) => {
      state.activityId = action.payload
    },
  },
})

export const { saveUserAnswers, saveAcitiviTyId } = gameSlice.actions
export default gameSlice.reducer
