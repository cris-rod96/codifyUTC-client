import { instance } from '../base.api'

const authAPI = {
  login: (email, password, loginLocation) => {
    console.log(email, password, loginLocation)
    return instance.post('/auth/login', { email, password, loginLocation })
  },
}

export default authAPI
