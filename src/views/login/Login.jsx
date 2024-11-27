import React, { useRef, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { userApi } from '../../api/user/user.api'
import { authApi } from '../../api/auth/auth.api'
import toastConfig from '../../config/toast.config'

const Login = () => {
  const navigation = useNavigation()
  const initialState = {
    email: '',
    password: '',
  }
  const [data, setData] = useState(initialState)

  // Referencias para cada input
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  // Referencia para el ScrollView
  const scrollRef = useRef(null)

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value })
  }

  const showToast = (toastType, title, message) => {
    Toast.show({
      type: toastType,
      text1: title,
      text2: message,
      position: 'bottom',
      bottomOffset: 80,
    })
  }

  const handleSubmit = () => {
    if (data.email === '' || data.password === '') {
      showToast('success', 'Login Exitoso', 'Todos los campos son obligatorios')
      return
    }

    authApi
      .login(data.email, data.password)
      .then((res) => {
        const { message } = res.data
        showToast('success', 'Login exitoso', message)

        setTimeout(() => {
          navigation.navigate('Landing')
        }, 3500)
      })
      .catch((err) => {
        const { message } = err.response.data
        showToast('error', 'Error', message)
      })
  }

  // Función para hacer scroll automático
  const handleFocus = (inputRef) => {
    setTimeout(() => {
      inputRef.current?.measureLayout(
        scrollRef.current,
        (x, y, width, height) => {
          scrollRef.current?.scrollTo({ y: y - 100, animated: true })
        }
      )
    }, 100)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#F5F9FF' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col gap-3 py-5 px-5 relative h-full">
            <View className="w-full h-[200px] bg-red-400" />

            <View className="my-5">
              <Text style={{ fontFamily: 'Jost_600SemiBold', fontSize: 24 }}>
                ¡Bienvenido de vuelta!
              </Text>
              <Text style={{ fontFamily: 'Mulish_700Bold', fontSize: 14 }}>
                Ingresa tus datos para continuar
              </Text>

              <View className="flex flex-col gap-3 my-5">
                <TextInput
                  placeholder="example@utc.edu.ec"
                  className="bg-[#FFFFFF] border border-[#E0E0E0] px-3 py-5 rounded-lg"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#555555',
                  }}
                  onChangeText={(e) => handleChange('email', e)}
                  autoCapitalize="none"
                  defaultValue={data.email}
                  ref={emailRef}
                  onFocus={() => handleFocus(emailRef)} // Desplaza hacia la posición del primer input
                />
                <TextInput
                  secureTextEntry
                  placeholder="****************"
                  className="bg-[#FFFFFF] border border-[#E0E0E0] px-3 py-5 rounded-lg"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#555555',
                  }}
                  onChangeText={(e) => handleChange('password', e)}
                  autoCapitalize="none"
                  defaultValue={data.password}
                  ref={passwordRef}
                  onFocus={() => handleFocus(passwordRef)} // Desplaza hacia la posición del segundo input
                />

                <TouchableOpacity
                  className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-4 rounded-full relative"
                  onPressIn={handleSubmit}
                >
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 15,
                      color: '#FFFFFF',
                    }}
                  >
                    Iniciar sesión
                  </Text>

                  <View className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-white absolute right-5">
                    <Ionicons
                      name="chevron-forward-sharp"
                      size={20}
                      color={'#741D1D'}
                    />
                  </View>
                </TouchableOpacity>

                {/* ¿Olvidaste tu contraseña? */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('RecoveryPassword')}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_800ExtraBold',
                      fontSize: 13,
                      color: '#741D1D',
                      textAlign: 'center',
                      marginBottom: 5, // Reducido el margen inferior
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="absolute bottom-7 left-5 flex flex-row gap-2 items-center justify-center w-full">
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 13,
                }}
              >
                ¿No tienes cuenta?
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_800ExtraBold',
                  fontSize: 13,
                  color: '#741D1D',
                }}
                onPress={() => navigation.navigate('Register')}
              >
                Regístrate
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast config={toastConfig} position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default Login
