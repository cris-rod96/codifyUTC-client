import { instance } from '../base.api'

const AdminApi = {
  getUsers: (token) => {
    return instance.get('/users/', {
      headers: {
        'x-token': token,
      },
    })
  },

  getCourses: (token) => {
    return instance.get('/courses/', {
      headers: {
        'x-token': token,
      },
    })
  },

  updateUserRole: (user_id, role, token) => {
    return instance.put(
      `/users/updateRole`,
      { user_id, role },
      {
        headers: {
          'x-token': token,
        },
      }
    )
  },
}

export default AdminApi
