import { instance } from '../base.api'

const model = 'topics'

const topicsAPI = {
  create: (data) => {
    return instance.post(`${model}`, data)
  },

  getByClass: (class_id) => {
    return instance.get(`${model}/class/${class_id}`)
  },
}
export default topicsAPI
