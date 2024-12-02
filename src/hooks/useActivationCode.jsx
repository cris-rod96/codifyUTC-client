import React, { useState } from 'react'
import { userApi } from '../api/user/user.api'

const useActivationCode = () => {
  const [data, setData] = useState({
    full_name: '',
    email: '',
  })

  const addInfoData = (email, full_name) => {
    setData({
      email,
      full_name,
    })
  }

  const onSubmit = ({ code }) => {
    if (!code || code.length !== 4) {
      return {
        ok: false,
        toast: 'error',
        title: 'Código de activación',
        message: 'El código debe tener 4 dígitos',
      }
    }

    return userApi
      .activateAccount({
        email: data.email,
        code,
      })
      .then((res) => {
        const { message } = res.data
        return {
          ok: true,
          toast: 'success',
          title: 'Código de activación',
          message,
        }
      })
      .catch((err) => {
        const { message } = err.response.data

        return {
          ok: false,
          toast: 'error',
          title: 'Código de activación',
          message,
        }
      })
  }

  return { data, addInfoData, onSubmit }
}

export default useActivationCode
