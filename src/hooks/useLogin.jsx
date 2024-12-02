import { useState } from 'react'
import { authApi } from '../api/auth/auth.api'
import { storageUtil } from '../utils/index.utils'

const useLogin = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const [credentials, setCredentials] = useState(initialState)

  const handleChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  const onSubmit = () => {
    const { email, password } = credentials

    if (email === '' || password === '') {
      return {
        ok: false,
        toast: 'error',
        title: 'Campos obligatorios',
        message: 'Todos los campos son obligatorios',
      }
    }

    return authApi
      .login(credentials.email, credentials.password)
      .then((res) => {
        const { token, user } = res.data
        if (user) {
          storageUtil.saveSecureData(
            'user_info',
            JSON.stringify({
              user,
              token,
            })
          )

          return {
            ok: true,
            toast: 'success',
            title: 'Inicio de sesión exitoso',
            message: `Bienvenido ${user.full_name}`,
          }
        }
      })
      .catch((err) => {
        const { message } = err.response.data
        return {
          ok: false,
          toast: 'error',
          title: 'Error al iniciar sesión',
          message,
        }
      })
  }
  return {
    handleChange,
    credentials,
    onSubmit,
  }
}

export default useLogin
