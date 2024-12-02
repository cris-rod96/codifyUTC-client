import { useState } from 'react'
import { userApi } from '../api/user/user.api'

const useRecuperationCode = () => {
  const [data, setData] = useState({
    method: '',
    value: '',
  })

  const addInfoData = (method, value) => {
    setData({
      method,
      value,
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
      .verifyCode({
        method: data.method,
        value: data.value,
        code,
      })
      .then((res) => {
        const { message } = res.data
        return {
          ok: true,
          toast: 'success',
          title: 'Código de recuperación',
          message,
        }
      })
      .catch((err) => {
        const { message } = err.response.data

        return {
          ok: false,
          toast: 'error',
          title: 'Código de recuperación',
          message,
        }
      })
  }

  return { data, addInfoData, onSubmit }
}

export default useRecuperationCode
