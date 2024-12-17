import { instance } from '../base.api'

const model = 'users'

const StudentsAPI = {
  getAllStudents: () => {
    return instance.get(`${model}/students/all`)
  },
  getAllStudentsByCourse: (course_id) => {
    return instance.get(`course-students/course/${course_id}`)
  },
}

export default StudentsAPI
