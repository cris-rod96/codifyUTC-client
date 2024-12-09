import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import studentReducer from './slices/student.slice'
import teacherReducer from './slices/teacher.slice.js'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    student: studentReducer,
    teacher: teacherReducer,
  },
})

export default store
