import { instance } from '../base.api'

const model = 'quizz-response'

const quizzResponseAPI = {
  getByResponse: (response_id) => {
    return instance.get(`${model}/byResponse/${response_id}`)
  },
  register: (data) => {
    return instance.post(`${model}/`, data)
  },
}

export default quizzResponseAPI
