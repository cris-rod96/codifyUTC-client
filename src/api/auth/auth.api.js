import { instance } from '../base.api'

export const authApi = {
  login: (email, password, loginLocation) => {
    return instance.post('/auth/login', { email, password, loginLocation })
  },
}
