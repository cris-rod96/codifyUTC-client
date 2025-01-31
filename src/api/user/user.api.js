import { instance } from '../base.api'

const UserApi = {
  verifyUser: (email, nick_name) => {
    return instance.get(`/users/verify?email=${email}&nick_name=${nick_name}`)
  },

  register: (formData) => {
    return instance.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
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

  updateInfo: (user_id, data) => {
    return instance.patch(`/users/${user_id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  newPassword: (user_id, password) => {
    return instance.patch(`/users/new-password/${user_id}`, { password })
  },
}

export default UserApi
