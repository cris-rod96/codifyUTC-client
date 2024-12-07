import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import studentReducer from './slices/student.slice'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    student: studentReducer,
  },
})

export default store
