import { instance } from '../base.api'

const model = 'activities'

const activitiesAPI = {
  getByClass: (class_id) => {
    return instance.get(`${model}/class/${class_id}`)
  },
}

export default activitiesAPI
