import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import LottieView from 'lottie-react-native'
import forget from 'assets/forget_password.json'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../../config/index.config'
import { useSelector } from 'react-redux'
import { usersAPI } from 'api/index.api'
import CustomToast from 'components/toast/Toast'

const NewPassword = ({ route, navigation }) => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)
  const { user } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const handlePassword = (value) => {
    setPassword(value)
  }

  const handleConfirmPasword = (value) => {
    setConfirmPassword(value)
    validatePasswords(password, value)
  }
  const validatePasswords = (pass, confirmPass) => {
    if (confirmPass.trim().length > 0) {
      if (pass !== confirmPass) {
        setMessage('Las contraseñas no coinciden')
        setIsValid(false)
      } else {
        setMessage('')
        setIsValid(true)
      }
    } else {
      setMessage('')
    }
  }

  const resetData = () => {
    setIsValid(false)
    setPassword('')
    setConfirmPassword('')
    setNewPasswordVisible(false)
    setConfirmPassword(false)

    setTimeout(() => {
      navigation.goBack()
    }, 2500)
  }

  const changePassword = () => {
    if (!isValid) {
      showToast('error', 'Error', 'Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    usersAPI
      .newPassword(user.id, password)
      .then((res) => {
        setToast(true)
        setTypeToast('success')
        setTitleToast('Contraseña actualizada')
        setMessageToast('Se ha actualizado su contraseña.')
        resetData()
      })
      .catch((err) => {
        setToast(true)
        setTypeToast('errior')
        setTitleToast('Error al actualizar')
        setMessageToast('No se pudo actualizar su contraseña')
      })
      .finally(() => {
        setLoading(false)
      })
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
      className="flex-1 bg-[#F5F9FF]"
    >
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-[#F5F9FF]"
          contentContainerStyle={{
            paddingVertical: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 bg-[#F5F9FF] flex flex-col w-[90%] mx-auto">
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

            <View className="mt-4 flex flex-col mb-4">
              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 mb-4">
                <View className="w-14 flex items-center justify-center h-full">
                  <Octicons name="lock" size={20} color={'#545454'} />
                </View>

                <TextInput
                  secureTextEntry={!newPasswordVisible}
                  className="flex-1 bg-white px-1"
                  placeholder="Nueva contraseña"
                  defaultValue={password}
                  autoCapitalize="none"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#888',
                  }}
                  onChangeText={(value) => handlePassword(value)}
                />

                {/* Icono del ojo */}
                <TouchableOpacity
                  className="px-4"
                  onPress={() => setNewPasswordVisible(!newPasswordVisible)}
                >
                  {newPasswordVisible ? (
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
              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 mb-4">
                <View className="w-14 flex items-center justify-center h-full">
                  <Octicons name="lock" size={20} color={'#545454'} />
                </View>

                <TextInput
                  secureTextEntry={!confirmPasswordVisible}
                  className="flex-1 bg-white px-1"
                  placeholder="Confirmar contraseña"
                  defaultValue={confirmPassword}
                  autoCapitalize="none"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#888',
                  }}
                  onChangeText={(value) => handleConfirmPasword(value)}
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

              <TouchableOpacity
                className="w-full py-4 rounded-full flex flex-row items-center justify-center gap-2"
                style={{
                  backgroundColor: loading || !isValid ? '#888' : '#741D1D',
                }}
                disabled={!isValid}
                onPress={changePassword}
              >
                {loading ? (
                  <>
                    <ActivityIndicator size={'small'} color={'white'} />
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 16,
                        color: 'white',
                      }}
                    >
                      Actualizando
                    </Text>
                  </>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    Actualizar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableNativeFeedback>
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

export default NewPassword
