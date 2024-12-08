import { useState } from 'react'
import { authApi } from '../api/auth/auth.api'
import { geoUtil, storageUtil } from '../utils/index.utils'

const useLogin = (setLoading) => {
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

  const onSubmit = async () => {
    const { email, password } = credentials

    if (email === '' || password === '') {
      return {
        ok: false,
        toast: 'error',
        title: 'Campos obligatorios',
        message: 'Todos los campos son obligatorios',
      }
    }
    setLoading(true)

    try {
      const loginLocation = await geoUtil.getLoginLocation()

      const res = await authApi.login(email, password, loginLocation)
      const { token, user } = res.data

      if (user) {
        await storageUtil.saveSecureData(
          'user_info',
          JSON.stringify({ user, token })
        )

        return {
          ok: true,
          toast: 'success',
          title: 'Inicio de sesión exitoso',
          message: `Bienvenido ${user.full_name}`,
          role: user.role,
        }
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Error desconocido'

      return {
        ok: false,
        toast: 'error',
        title: 'Error al iniciar sesión',
        message,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    handleChange,
    credentials,
    onSubmit,
  }
}

export default useLogin
