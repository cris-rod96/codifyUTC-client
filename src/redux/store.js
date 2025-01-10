import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import studentReducer from './slices/student.slice'
import teacherReducer from './slices/teacher.slice.js'
import userReducer from './slices/user.slice'
import idReducer from './slices/id.slice.js'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    student: studentReducer,
    teacher: teacherReducer,
    user: userReducer,
    ids: idReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
