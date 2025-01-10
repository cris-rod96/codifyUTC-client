import { useState } from 'react'
import { usersAPI } from 'api/index.api'

const useChangePassword = (setLoading) => {
  const [data, setData] = useState({
    method: '',
    value: '',
  })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handlePassword = (value) => {
    setPassword(value)
  }

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value)
    validatePasswords(password, value)
  }

  const validatePasswords = (pass, confirmPass) => {
    if (confirmPass.trim().length > 0) {
      if (pass !== confirmPass) {
        setMessage('Las contraseñas no coinciden')
      } else {
        setMessage('')
      }
    } else {
      setMessage('')
    }
  }

  const onSubmit = () => {
    if (password === '' || confirmPassword === '') {
      return {
        ok: false,
        toast: 'error',
        title: 'Error',
        message: 'Las contraseñas no pueden estar vacias',
      }
    }

    if (password !== confirmPassword) {
      return {
        ok: false,
        toast: 'error',
        title: 'Error',
        message: 'Las contraseñas no coinciden',
      }
    }

    setLoading(true)

    return usersAPI
      .changePassword({
        method: data.method,
        value: data.value,
        password,
      })
      .then((res) => {
        const { message } = res.data
        return {
          ok: true,
          toast: 'success',
          title: 'Cambio de contraseña',
          message,
        }
      })
      .catch((err) => {
        const { message } = err.response.data
        return {
          ok: false,
          toast: 'error',
          title: 'Error',
          message,
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const addUserData = (method, value) => {
    setData({
      method,
      value,
    })
  }

  return {
    handlePassword,
    addUserData,
    handleConfirmPassword,
    message,
    onSubmit,
  }
}

export default useChangePassword
