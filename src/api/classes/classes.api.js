import { instance } from '../base.api'

const model = 'classes'

export const classesAPI = {
  getByUser: (user_id) => {
    return instance.get(`${model}/user/${user_id}`)
  },
  getByCourse: (CourseId) => {
    return instance.get(`${model}/course/${CourseId}`)
  },

  create: (data) => {
    return instance.post(`${model}`, data)
  },
}
