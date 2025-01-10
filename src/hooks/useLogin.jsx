import { useEffect, useState } from 'react'
import { authAPI } from 'api/index.api.js'
import { geoUtil } from 'utils/index.utils'
import { useDispatch } from 'react-redux'
import { saveUser } from 'redux/slices/user.slice'
import { storageUtil } from '../utils/index.utils'

const useLogin = (setLoading) => {
  const initialState = {
    email: '',
    password: '',
  }
  const [credentials, setCredentials] = useState(initialState)
  const dispatch = useDispatch()

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

      const res = await authAPI.login(email, password, loginLocation)
      const { token, user } = res.data
      if (user) {
        await storageUtil.saveSecureData(
          'session_info',
          JSON.stringify({ user, token })
        )

        dispatch(saveUser(user))

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
