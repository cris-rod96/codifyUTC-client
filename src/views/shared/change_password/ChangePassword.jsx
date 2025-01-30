import { Ionicons, Octicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
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
import LottieView from 'lottie-react-native'
import forget from 'assets/forget_password.json'

const ChangePassword = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const {
    message,
    handlePassword,
    handleConfirmPassword,
    addUserData,
    onSubmit,
  } = useChangePassword(setLoading)

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
        navigation.replace('Login')
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
          // contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar
            barStyle={keyboardVisible ? 'light-content' : 'dark-content'}
            backgroundColor={keyboardVisible ? '#741D1D' : '#F5F9FF'}
          />

          <View className="flex-1 flex-col w-[90%] mx-auto ">
            <LottieView
              source={forget}
              autoPlay
              loop
              style={{
                width: keyboardVisible ? 150 : 250,
                height: keyboardVisible ? 150 : 250,
                margin: 'auto',
              }}
            />

            <View className="flex flex-col gap-5">
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
                    <Ionicons name="eye-outline" size={22} color={'#545454'} />
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
                    <Ionicons name="eye-outline" size={22} color={'#545454'} />
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
                className={`w-full py-4 rounded-full flex flex-row gap-3  items-center justify-center mt-3 ${
                  loading ? 'bg-gray-400' : 'bg-[#741D1D]'
                }`}
                onPress={changePassword}
              >
                {loading && (
                  <ActivityIndicator size={'small'} color={'#FFFFFF'} />
                )}
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 18,
                    color: 'white',
                  }}
                >
                  {loading ? 'Actualizando' : 'Actualizar'}
                </Text>

                {!loading && (
                  <Octicons
                    name="chevron-right"
                    size={21}
                    color={'white'}
                    className="absolute right-5"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast config={toastConfig} position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default ChangePassword
