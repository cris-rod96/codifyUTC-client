import { instance } from '../base.api'

export const authApi = {
  login: (email, password) => {
    return instance.post('/auth/login', { email, password })
  },
}
