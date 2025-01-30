import { useState } from 'react'
import { usersAPI } from 'api/index.api'

const useActivationCode = (setLoading) => {
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

    setLoading(true)

    return usersAPI
      .activateAccount({
        email: data.email,
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

export default useActivationCode
