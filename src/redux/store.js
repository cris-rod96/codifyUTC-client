import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import studentReducer from './slices/student.slice'
import teacherReducer from './slices/teacher.slice.js'
import userReducer from './slices/user.slice'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    student: studentReducer,
    teacher: teacherReducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
