import { Ionicons, Octicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useRecoveryPassword from '../../../hooks/useRecoveryPassword'
import LottieView from 'lottie-react-native'
import forget from 'assets/forget_password.json'
import CustomToast from 'components/toast/Toast'

const RecoveryPassword = () => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)

  const [loading, setLoading] = useState(false)
  const { handleChange, onSubmit } = useRecoveryPassword(setLoading)
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const navigation = useNavigation()

  const sendCode = async () => {
    const { ok, toast, title, message, method, value } = await onSubmit()

    if (ok) {
      setToast(true)
      setTypeToast(toast)
      setTitleToast(title)
      setMessageToast(message)

      setTimeout(() => {
        navigation.replace('RecoveryCode', {
          method,
          value,
        })
      }, 2500)
    } else {
      setToast(true)
      setTypeToast(toast)
      setTitleToast(title)
      setMessageToast(message)
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F5F9FF] "
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View className="w-[90%] mx-auto">
            {!keyboardVisible && (
              <LottieView
                source={forget}
                autoPlay
                loop
                style={{
                  width: 250,
                  height: 250,
                  margin: 'auto',
                }}
              />
            )}

            {/* Formulario */}
            <View className="flex flex-gol gap-3 justify-center items-center">
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#545454',
                  textAlign: 'center',
                }}
              >
                Seleccione el método de recuperación para restablecer su
                contraseña
              </Text>

              {/* Caja de métodos de recuperación */}
              <View className="flex flex-col gap-5 w-full">
                {/* Email */}
                <View className="flex flex-row items-center bg-white w-full h-24 px-5 gap-2 rounded-xl overflow-hidden shadow-md shadow-gray-300">
                  <View className="w-12 h-12 border-2 border-[#741D1D] rounded-full flex items-center justify-center bg-[#741D1D]/40">
                    <Ionicons
                      name="mail-outline"
                      size={22}
                      className="font-bold"
                    />
                  </View>
                  <View className="flex-1 flex-col gap-1 ">
                    <Text
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 12,
                        color: '#505050',
                      }}
                    >
                      Verificar por correo
                    </Text>
                    <TextInput
                      autoCapitalize="none"
                      onChangeText={(text) => handleChange('email', text)}
                      className="w-full"
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 12,
                        color: '#202244',
                      }}
                      placeholder="Escriba su correo"
                    />
                  </View>
                </View>

                {/* SMS */}
                <View className="flex flex-row items-center bg-white w-full h-24 px-5 gap-2 rounded-xl overflow-hidden shadow-md shadow-gray-300">
                  <View className="w-12 h-12 border-2 border-[#741D1D] rounded-full flex items-center justify-center bg-[#741D1D]/40">
                    <Ionicons
                      name="phone-portrait-outline"
                      size={22}
                      className="font-bold"
                    />
                  </View>
                  <View className="flex-1 flex-col gap-1 ">
                    <Text
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 12,
                        color: '#505050',
                      }}
                    >
                      Verificar por SMS
                    </Text>
                    <TextInput
                      keyboardType="phone-pad"
                      onChangeText={(text) => handleChange('phone', text)}
                      className="w-full"
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 12,
                        color: '#202244',
                      }}
                      placeholder="Escriba su teléfono"
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                className={`w-full py-4 rounded-full flex flex-row gap-3  items-center justify-center mt-3 ${
                  loading ? 'bg-gray-400' : 'bg-[#741D1D]'
                }`}
                onPress={sendCode}
              >
                {loading && (
                  <ActivityIndicator size={'small'} color="#FFFFFF" />
                )}
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 18,
                    color: '#FFFFFF',
                  }}
                >
                  {loading ? 'Verificando' : 'Verificar'}
                </Text>

                {!loading && (
                  <Octicons
                    name="chevron-right"
                    size={21}
                    color="white"
                    className="absolute right-5"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      {toast && (
        <CustomToast
          setToast={setToast}
          type={typeToast}
          title={titleToast}
          message={messageToast}
        />
      )}
    </KeyboardAvoidingView>
  )
}

export default RecoveryPassword
