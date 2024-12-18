import { useState } from 'react'
import { usersAPI } from 'api/index.api'

const useSetup = () => {
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

  const onSubmit = (imageUri) => {
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
        console.log(res)
        const { message } = res.data
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
  }

  return { user, handleChange, addRegisterData, onSubmit }
}

export default useSetup
