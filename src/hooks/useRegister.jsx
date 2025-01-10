import { useState } from 'react'
import { usersAPI } from 'api/index.api'
import { validationService } from 'services/index.services'

const useRegister = (setLoading) => {
  const initialState = {
    nick_name: '',
    email: '',
    password: '',
  }

  const [data, setData] = useState(initialState)
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    })
  }

  const onSubmit = () => {
    const { nick_name, email, password } = data

    if (nick_name === '' || email === '' || password === '') {
      return {
        ok: false,
        toast: 'error',
        title: 'Campos obligatorios',
        message: 'Todos los campos son obligatorios',
      }
    }

    const { isValid, role, message } =
      validationService.determineUserType(email)

    if (!isValid)
      return {
        ok: false,
        toast: 'error',
        title: 'Correo no válido',
        message: message,
      }

    setLoading(true)

    return usersAPI
      .verifyUser(email, nick_name)
      .then((res) => {
        const { exist } = res.data

        if (!exist) {
          return {
            ok: true,
            toast: 'success',
            title: 'Usuario disponible',
            message: 'Email y nick_name disponibles',
            role,
          }
        }

        return {
          ok: false,
          toast: 'error',
          title: 'Error al validar usuario',
          message: 'Email y/o nick_name no disponibles',
        }
      })
      .catch((err) => {
        return {
          ok: false,
          toast: 'error',
          title: 'Error al validar usuario',
          message: 'Email y/o nick_name no disponibles',
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    data,
    handleChange,
    onSubmit,
  }
}

export default useRegister
