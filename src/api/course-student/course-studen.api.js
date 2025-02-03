import { instance } from '../base.api'

const model = 'course-students'

const courseStudentsAPI = {
  register: (data) => {
    return instance.post(`${model}`, data)
  },

  bannedStudent: ({
    course_id,
    student_id,
    course_name,
    reason,
    teacher_name,
    student_name,
    student_email,
  }) => {
    return instance.delete(
      `${model}/banned?course_id=${course_id}&student_id=${student_id}&student_name=${encodeURIComponent(
        student_name
      )}&teacher_name=${encodeURIComponent(
        teacher_name
      )}&course_name=${encodeURIComponent(
        course_name
      )}&reason=${encodeURIComponent(
        reason
      )}&student_email=${encodeURIComponent(student_email)}`
    )
  },

  leaveCourse: ({ course_id, user_id }) => {
    return instance.delete(
      `${model}/?course_id=${course_id}&student_id=${user_id}`
    )
  },

  getByStudent: (student_id) => {
    return instance.get(`${model}/student/${student_id}`)
  },
}

export default courseStudentsAPI
