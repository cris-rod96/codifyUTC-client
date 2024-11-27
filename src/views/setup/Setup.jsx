import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import profileLogo from '../../../assets/profile.png'
import { Ionicons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'
import { useEffect, useState } from 'react'
import { userApi } from '../../api/user/user.api'
import Toast from 'react-native-toast-message'

const Setup = ({ route, navigation }) => {
  const initialState = {
    email: '',
    password: '',
    full_name: '',
    dni: '',
    phone: '',
    nick_name: '',
    gender: '',
  }
  const [data, setData] = useState(initialState)
  const { email, password } = route.params

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom',
      bottomOffset: 80,
    })
  }

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value })
  }

  const handleSubmit = () => {
    if (Object.values(data).includes('')) {
      showToast('error', 'Error', 'Todos los campos son obligatorios')
      return
    }

    userApi
      .register(data)
      .then((res) => {
        showToast(
          'success',
          'Registro exitoso',
          'Revisa tu correo para activar tu cuenta.'
        )

        setTimeout(() => {
          navigation.navigate('ActivationCode', {
            email: data.email,
            full_name: data.full_name,
          })
        }, 3500)
      })
      .catch((err) => {
        const { message } = err.response.data
        showToast('error', 'Error', message)
      })
  }

  useEffect(() => {
    setData({ ...data, email, password })
  }, [route])

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={100} // Espacio adicional para evitar que el teclado cubra el campo
      >
        <View className="flex flex-col relative h-full px-5 py-10">
          {/* Foto de perfil */}
          <View className="relative w-[100px] h-[100px] rounded-full bg-red-300 mx-auto border-2 border-gray-300">
            <Image
              source={profileLogo}
              className="absolute w-full h-full object-cover"
            />
            <View className="w-8 h-8 rounded-full bg-[#741D1D] flex items-center justify-center absolute bottom-1 right-1 border-2 border-gray-300">
              <Ionicons name="camera-sharp" color={'white'} size={14} />
            </View>
          </View>

          {/* Formulario */}
          <View className="mt-10 flex flex-col gap-4">
            {/* Inputs */}
            <TextInput
              placeholder="Nombre completo"
              className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 14,
              }}
              onChangeText={(value) => handleChange('full_name', value)}
              autoCapitalize="words"
              defaultValue={data.full_name}
            />
            <TextInput
              placeholder="Nickname"
              className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 14,
              }}
              onChangeText={(value) => handleChange('nick_name', value)}
              autoCapitalize="none"
              defaultValue={data.nick_name}
            />
            <TextInput
              placeholder="Cédula"
              className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 14,
              }}
              keyboardType="numeric"
              onChangeText={(value) => handleChange('dni', value)}
              defaultValue={data.dni}
            />

            <TextInput
              placeholder="Teléfono"
              className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 14,
              }}
              keyboardType="numeric"
              onChangeText={(value) => handleChange('phone', value)}
              defaultValue={data.phone}
            />

            {/* Select */}
            <View className="h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm flex justify-center items-center">
              <RNPickerSelect
                onValueChange={(value) => handleChange('gender', value)}
                items={[
                  { label: 'Femenino', value: 'Femenino' },
                  { label: 'Masculino', value: 'Masculino' },
                  { label: 'Prefiero no decirlo', value: 'Otro' },
                ]}
                placeholder={{
                  label: 'Selecciona tu género',
                  value: null,
                  color: '#9EA0A4',
                }}
                style={{
                  inputIOS: {
                    fontSize: 14,
                    fontFamily: 'Mulish_700Bold',
                    color: '#000',
                  },
                  inputAndroid: {
                    fontSize: 14,
                    fontFamily: 'Mulish_700Bold',
                    color: '#000',
                  },
                  placeholder: {
                    fontSize: 12,
                    fontFamily: 'Mulish_700Bold',
                  },
                }}
              />
            </View>
          </View>

          {/* Botón */}
          <TouchableOpacity
            className="flex flex-row gap-2 items-center justify-center mt-5 bg-[#741D1D] py-4 rounded-full relative"
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
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

export default Setup
