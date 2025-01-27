import { useState } from 'react'
import { usersAPI } from 'api/index.api'

const useSetup = () => {
  const [contactData, setContactData] = useState({
    email: '',
    full_name: '',
  })
  const initialState = {
    full_name: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    phone: '',
    dni: '',
    nick_name: '',
  }
  const [user, setUser] = useState(initialState)

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    })
  }

  const addRegisterData = (email, nick_name, password, role) => {
    setUser({
      ...user,
      email,
      nick_name,
      password,
      role,
    })
  }

  const onSubmit = (imageUri, setLoading) => {
    if (Object.values(user).includes('')) {
      return {
        ok: false,
        toast: 'error',
        title: 'Campos obligatorios',
        message: 'Todos los campos son obligatorios',
      }
    }

    if (!imageUri) {
      return {
        ok: false,
        toast: 'error',
        title: 'Foto de perfil',
        message: 'La foto de perfil es obligatoria',
      }
    }

    setLoading(true)

    const formData = new FormData()
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key])
    })

    formData.append('profile_picture', {
      uri: imageUri,
      name: `profile_picture_${user.nick_name.replace(/\s/g, '')}.jpg`,
      type: 'image/jpeg',
    })

    return usersAPI
      .register(formData)
      .then((res) => {
        const { message } = res.data
        setContactData({
          email: user.email,
          full_name: user.full_name,
        })
        setUser(initialState)
        return {
          ok: true,
          toast: 'success',
          title: 'Registro exitoso',
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

  return { user, handleChange, addRegisterData, onSubmit, contactData }
}

export default useSetup
