import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import Toast from 'react-native-toast-message'
import toastConfig from '../../../config/toast/toast.config'
import useLogin from '../../../hooks/useLogin'
import { CommonActions, useNavigation } from '@react-navigation/native'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const { credentials, handleChange, onSubmit } = useLogin(setLoading)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    })
  }

  const login = async () => {
    const { ok, toast, title, message, role } = await onSubmit()
    showToast(toast, title, message)

    if (ok) {
      const home =
        role === 'Estudiante' ? 'TabStudentNavigator' : 'TabsTeacherNavigator'
      setTimeout(() => {
        navigation.navigate(home)
      }, 1500)
    }
  }

  const goToRegister = () => {
    navigation.navigate('Register')
  }

  const goToRecoveryPassword = () => {
    navigation.navigate('RecoveryPassword')
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )

    // Clean up listeners
    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar
            barStyle={keyboardVisible ? 'light-content' : 'dark-content'}
            backgroundColor={keyboardVisible ? '#741D1D' : '#F5F9FF'}
          />
          {/* Header visible cuando el teclado está abierto */}
          {keyboardVisible && (
            <View className="bg-[#741D1D] h-[50px] w-full flex justify-center items-center ">
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 20,
                  color: 'white',
                }}
              >
                Codify UTC
              </Text>
            </View>
          )}

          <View className="flex-1 py-5 bg-[#F5F9FF]">
            {/* Logo visible cuando el teclado no está visible */}
            {!keyboardVisible && (
              <View className="w-[90%] mx-auto h-[250px] "></View>
            )}

            <View className="w-[85%] mx-auto py-5 flex flex-col ">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 24,
                  color: '#000000',
                }}
              >
                Inicio de sesión.
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#000000',
                }}
              >
                Accede a tu cuenta para continuar
              </Text>

              {/* Formulario */}
              <View className="flex flex-col gap-3 mt-5">
                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                  <View className="w-14 flex flex-row items-center justify-center h-full ">
                    <Ionicons name="mail-outline" size={20} color={'#545454'} />
                  </View>
                  <TextInput
                    autoCapitalize="none"
                    defaultValue={credentials.email}
                    onChangeText={(text) => handleChange('email', text)}
                    placeholder="Correo electrónico"
                    className="flex-1 bg-white  px-1 "
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#505050',
                    }}
                  />
                </View>

                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                  {/* Icono del candado */}
                  <View className="w-14 flex items-center justify-center h-full">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={'#545454'}
                    />
                  </View>

                  {/* Campo de contraseña */}
                  <TextInput
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    defaultValue={credentials.password}
                    onChangeText={(text) => handleChange('password', text)}
                    className="flex-1 bg-white px-1"
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#505050',
                    }}
                  />

                  {/* Icono del ojo */}
                  <TouchableOpacity
                    className="px-4"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <Ionicons
                        name="eye-outline"
                        size={22}
                        color={'#545454'}
                      />
                    ) : (
                      <Ionicons
                        name="eye-off-outline"
                        size={22}
                        color={'#545454'}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row justify-end">
                  <TouchableOpacity onPress={goToRecoveryPassword}>
                    <Text
                      style={{
                        fontFamily: 'Mulish_800ExtraBold',
                        fontSize: 12,
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className={`py-4 rounded-full flex flex-row gap-3  items-center justify-center mt-3 ${
                    loading ? 'bg-gray-400' : 'bg-[#741D1D]'
                  }`}
                  onPress={login}
                >
                  {loading && (
                    <ActivityIndicator size="small" color={'#ffffff'} />
                  )}
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                      color: 'white',
                    }}
                  >
                    {loading ? 'Validando' : 'Iniciar sesión'}
                  </Text>

                  {!loading && (
                    <Ionicons
                      name="chevron-forward"
                      size={22}
                      color={'white'}
                      className="absolute right-4"
                    />
                  )}
                </TouchableOpacity>

                <View className="mt-5 flex flex-row justify-center items-center gap-2">
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#545454',
                    }}
                  >
                    ¿No tienes una cuenta?
                  </Text>
                  <TouchableOpacity onPress={goToRegister}>
                    <Text
                      className="underline"
                      style={{
                        fontFamily: 'Mulish_800ExtraBold',
                        fontSize: 14,
                        color: '#741D1D',
                      }}
                    >
                      Registrate
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast config={toastConfig} position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default Login
