import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import useRegister from '../../hooks/useRegister'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast.config'
import { useNavigation } from '@react-navigation/native'

const Register = () => {
  const navigation = useNavigation()
  const { data, handleChange, onSubmit } = useRegister()
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  const verifyUser = async () => {
    const { ok, toast, title, message, role } = await onSubmit()

    showToast(toast, title, message)

    if (ok) {
      setTimeout(() => {
        navigation.navigate('Setup', {
          email: data.email,
          password: data.password,
          nick_name: data.nick_name,
          role,
        })
      }, 2500)
    }
  }

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

          {/* Header visible cuando el teclado esta abierto */}
          {keyboardVisible && (
            <View className="bg-[#741D1D] h-[50px] w-full flex justify-center items-center">
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 20,
                  color: '#FFFFFF',
                }}
              >
                Codify UTC
              </Text>
            </View>
          )}

          <View className="flex-1 py-5 bg-[#F5F9FF]">
            {/* Logo Visible */}
            {!keyboardVisible && (
              <View className="w-[90%] mx-auto h-[250px]"></View>
            )}

            <View className="w-[85%] mx-auto py-5 flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 24,
                }}
              >
                ¡Comencemos!
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                }}
              >
                Necesitas crear una cuenta para continuar
              </Text>
              <View className="flex flex-col gap-3 mt-5">
                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                  <View className="w-14 flex flex-row items-center justify-center h-full ">
                    <Ionicons name="mail-outline" size={20} color={'#545454'} />
                  </View>
                  <TextInput
                    defaultValue={data.email}
                    autoCapitalize="none"
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
                  <View className="w-14 flex flex-row items-center justify-center h-full ">
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={'#545454'}
                    />
                  </View>
                  <TextInput
                    autoCapitalize="none"
                    defaultValue={data.nick_name}
                    onChangeText={(text) => handleChange('nick_name', text)}
                    placeholder="Nickname"
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
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Contraseña"
                    defaultValue={data.password}
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

                <TouchableOpacity
                  className="bg-[#741D1D] py-4 rounded-full flex items-center justify-center mt-3"
                  onPress={verifyUser}
                >
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                      color: 'white',
                    }}
                  >
                    Registrarme
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={'white'}
                    className="absolute right-4"
                  />
                </TouchableOpacity>

                <View className="mt-5 flex flex-row justify-center items-center gap-2">
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#545454',
                    }}
                  >
                    ¿Ya tienes una cuenta?
                  </Text>
                  <TouchableOpacity>
                    <Text
                      className="underline"
                      style={{
                        fontFamily: 'Mulish_800ExtraBold',
                        fontSize: 14,
                        color: '#741D1D',
                      }}
                    >
                      Iniciar sesión
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

export default Register
