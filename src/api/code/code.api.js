import { instance } from '../base.api'

const model = 'codes'

const codeAPI = {
  verifyUserAndSendCode: (email) => {
    return instance.get(`${model}/request/${email}`)
  },

  resendCode: (method, value, type) => {
    console.log(method, value, type)
    return instance.put(
      `${model}/resend?method=${method}&value=${value}&type=${type}`
    )
  },
}

export default codeAPI
