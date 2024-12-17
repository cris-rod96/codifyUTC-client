import { instance } from '../base.api'

const model = 'course-students'

const courseStudentAPI = {
  register: (data) => {
    return instance.post(`${model}`, data)
  },

  leaveCourse: ({ course_id, user_id }) => {
    return instance.delete(
      `${model}/?course_id=${course_id}&student_id=${user_id}`
    )
  },
}

export default courseStudentAPI
