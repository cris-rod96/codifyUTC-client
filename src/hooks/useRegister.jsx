import React, { useState } from 'react'
import { userApi } from '../api/user/user.api'
import { validationService } from '../services/index.services'

const useRegister = () => {
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

    return userApi
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
        const { message } = err.response.data
        return {
          ok: false,
          toast: 'error',
          title: 'Error al validar usuario',
          message,
        }
      })
  }

  return {
    data,
    handleChange,
    onSubmit,
  }
}

export default useRegister