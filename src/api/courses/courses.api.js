import { instance } from '../base.api'

const model = 'courses'

export const coursesAPI = {
  getAll: (teacher_id) => {
    return instance.get(`${model}/teacher/${teacher_id}`)
  },
  create: (formData) => {
    return instance.post(`${model}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
