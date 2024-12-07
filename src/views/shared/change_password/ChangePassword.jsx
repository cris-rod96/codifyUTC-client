import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
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
import useChangePassword from '../../../hooks/useChangePassword'
import Toast from 'react-native-toast-message'
import toastConfig from '../../../config/toast/toast.config'

const ChangePassword = ({ route, navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const {
    message,
    handlePassword,
    handleConfirmPassword,
    addUserData,
    onSubmit,
  } = useChangePassword()

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  const changePassword = async () => {
    const { ok, toast, title, message } = await onSubmit()
    console.log(ok, toast, title, message)
    showToast(toast, title, message)

    if (ok) {
      setTimeout(() => {
        navigation.navigate('Login')
      }, 2500)
    }
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

  useEffect(() => {
    if (route.params) {
      const { method, value } = route.params
      addUserData(method, value)
    }
  }, [route])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F5F9FF]"
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

          <View className="flex-1 pb-5 w-[90%] mx-auto">
            {!keyboardVisible && (
              <View className="w-full mx-auto h-[200px] mb-10"></View>
            )}

            <View className=" flex flex-col">
              {!keyboardVisible && (
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 19,
                    color: '#202244',
                  }}
                >
                  Crear nueva contraseña
                </Text>
              )}

              <View className="mt-8 flex flex-col gap-5">
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
                    // defaultValue={credentials.password}
                    onChangeText={(text) => handlePassword(text)}
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
                    placeholder="Confirmar contraseña"
                    // defaultValue={credentials.password}
                    onChangeText={(text) => handleConfirmPassword(text)}
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
                    onPress={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? (
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
                {message && (
                  <View className="flex flex-col items-center ">
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 13,
                        color: '#741D1D',
                      }}
                    >
                      Las contraseñas no coinciden
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  className="bg-[#741D1D] py-4 rounded-full flex items-center justify-center mt-3"
                  onPress={changePassword}
                >
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                      color: 'white',
                    }}
                  >
                    Continuar
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={'white'}
                    className="absolute right-4"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast config={toastConfig} position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default ChangePassword
