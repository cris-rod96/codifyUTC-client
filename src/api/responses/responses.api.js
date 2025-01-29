import { instance } from '../base.api.js'

const model = 'responses'

const responsesAPI = {
  getAll: () => {
    return instance.get(`${model}/all`)
  },
  getByActivity: (activity_id) => {
    return instance.get(`${model}/activity/${activity_id}`)
  },
  getByStudent: (student_id) => {
    return instance.get(`${model}/student/${student_id}`)
  },
}

export default responsesAPI
