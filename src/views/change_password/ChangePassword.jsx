import { Ionicons } from '@expo/vector-icons'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useState } from 'react'
import { userApi } from '../../api/user/user.api'
import { useNavigation } from '@react-navigation/native'

const ChangePassword = ({ route }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const { method, value } = route.params
  const navigation = useNavigation()

  const handlePasswordChange = (value) => {
    setPassword(value)
    validatePasswords(value, confirmPassword)
  }

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value)
    validatePasswords(password, value)
  }

  const validatePasswords = (pass, confirmPass) => {
    if (confirmPass.trim().length > 0) {
      if (pass === confirmPass) {
        setMessage('✔ Las contraseñas coinciden')
      } else {
        setMessage('✖ Las contraseñas no coinciden')
      }
    } else {
      setMessage('')
    }
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom',
      bottomOffset: 80,
    })
  }

  const handleSubmit = () => {
    Keyboard.dismiss() // Cierra el teclado al presionar el botón

    if (password !== confirmPassword || password.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Las contraseñas no coinciden o están vacías',
        position: 'bottom',
        bottomOffset: 80,
      })
      return
    }

    userApi
      .changePassword({
        method,
        value,
        password,
      })
      .then((res) => {
        const { message } = res.data
        showToast('success', 'Contraseña cambiada', message)
        setPassword('') // Limpia los campos
        setConfirmPassword('')
        setTimeout(() => {
          navigation.navigate('Login')
        }, 3500)
      })
      .catch((err) => {
        const { message } = err.response.data
        showToast('error', 'Error', message)
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex flex-col relative h-full px-2 w-full">
          <View className="w-full h-[300px] bg-red-400" />

          <View className="flex my-10 gap-4">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 19,
                color: '#000000',
                textAlign: 'left',
              }}
            >
              Crear nueva contraseña
            </Text>

            <View className="flex gap-5">
              <TextInput
                className="rounded-2xl h-16 w-full bg-white border border-gray-300 px-4"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                value={password}
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#202244',
                }}
              />
              <TextInput
                className="rounded-2xl h-16 w-full bg-white border border-gray-300 px-4"
                placeholder="Confirmar Contraseña"
                secureTextEntry={true}
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#202244',
                }}
              />
              {message !== '' && (
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: message.includes('✔') ? 'green' : 'red',
                    marginTop: 5,
                  }}
                >
                  {message}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-5 rounded-full w-full"
            onPress={handleSubmit}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 15,
                color: '#FFFFFF',
              }}
            >
              Continuar
            </Text>

            <View className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-white absolute right-5">
              <Ionicons
                name="chevron-forward-sharp"
                size={20}
                color={'#741D1D'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default ChangePassword
