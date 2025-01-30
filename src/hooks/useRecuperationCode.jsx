import { useState } from 'react'
import { usersAPI } from 'api/index.api'

const useRecuperationCode = (setLoading) => {
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
    setLoading(true)

    return usersAPI
      .verifyCode({
        method: data.method,
        value: data.value,
        code,
      })
      .then((res) => {
        const { message } = res.data
        return {
          ok: true,
          message,
        }
      })
      .catch((err) => {
        const { message } = err.response.data

        return {
          ok: false,
          message,
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { data, addInfoData, onSubmit }
}

export default useRecuperationCode
