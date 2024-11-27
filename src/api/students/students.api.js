import { instance } from '../base.api'

const model = 'users'

export const studentsAPI = {
  getAllStudents: () => {
    return instance.get(`${model}/students/all`)
  },

  getAllStudentsByCourse: (CourseId) => {
    return instance.get(`${model}/students/course/${CourseId}`)
  },
}
