import { instance } from '../base.api'

const model = 'activities'

const activitiesAPI = {
  create: (data) => {
    return instance.post(`${model}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  createLightningActivity: (data) => {
    console.log(data)
    return instance.post(`${model}/lightning`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  getById: (id) => {
    return instance.get(`${model}/${id}`)
  },
  getByClass: (class_id) => {
    return instance.get(`${model}/class/${class_id}`)
  },

  getByTeacher: (user_id) => {
    return instance.get(`${model}/teacher/${user_id}`)
  },

  deleteActivity: (activity_id) => {
    return instance.delete(`${model}/${activity_id}`)
  },
}

export default activitiesAPI
