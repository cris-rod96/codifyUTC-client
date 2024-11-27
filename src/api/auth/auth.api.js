import { instance } from '../base.api'

export const authApi = {
  login: (email, password) => {
    console.log(email, password)
    return instance.post('/auth/login', { email, password })
  },
}
