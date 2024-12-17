import { instance } from '../base.api'

const model = 'courses'

const coursesAPI = {
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

  getAllWithStudents: () => {
    return instance.get(`${model}/with_students`)
  },

  deleteCourse: (id) => {
    return instance.delete(`${model}/${id}`)
  },
}

export default coursesAPI
