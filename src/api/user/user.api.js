import { instance } from '../base.api'

export const userApi = {
  verifyUser: (email) => {
    return instance.get(`/users/verify?email=${email}`)
  },

  register: (data) => {
    return instance.post('/users', data)
  },

  activateAccount: (data) => {
    return instance.put('/codes/activate-account', data)
  },

  recoveryPassword: ({ method, value }) => {
    return instance.post('/recover/recovery-password', { method, value })
  },

  verifyCode: ({ method, value, code }) => {
    return instance.put('/codes/recovery-password', { method, value, code })
  },

  changePassword: ({ method, value, password }) => {
    return instance.put('/users/change-password', { method, value, password })
  },
}
