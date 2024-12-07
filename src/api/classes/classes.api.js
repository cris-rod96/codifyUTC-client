import { instance } from '../base.api'

const model = 'classes'

export const classesAPI = {
  getByCourse: (CourseId) => {
    return instance.get(`${model}/course/${CourseId}`)
  },
}
