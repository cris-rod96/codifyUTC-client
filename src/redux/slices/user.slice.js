const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
    },

    logout: (state) => {
      state.user = null
    },
  },
})

export const { saveUser, logout } = userSlice.actions
export default userSlice.reducer
