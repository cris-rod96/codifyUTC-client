import { instance } from '../base.api'

const model = 'codes'

const codeAPI = {
  verifyUserAndSendCode: (email) => {
    return instance.get(`${model}/request/${email}`)
  },
}

export default codeAPI
