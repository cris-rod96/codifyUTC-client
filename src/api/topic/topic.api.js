import { instance } from '../base.api'

const model = 'topics'

const topicsAPI = {
  create: (data) => {
    return instance.post(`${model}`, data)
  },

  getByClass: (class_id) => {
    return instance.get(`${model}/class/${class_id}`)
  },

  getById: (topic_id) => {
    return instance.get(`${model}/${topic_id}`)
  },

  delete: (topic_id) => {
    return instance.delete(`${model}/${topic_id}`)
  },

  update: (topic_id, data) => {
    return instance.put(`${model}/${topic_id}`, data)
  },
}
export default topicsAPI
