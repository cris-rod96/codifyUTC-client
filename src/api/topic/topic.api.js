import { instance } from '../base.api'

const model = 'topics'

export const topicsAPI = {
  create: (data) => {
    return instance.post(`${model}`, data)
  },
}
