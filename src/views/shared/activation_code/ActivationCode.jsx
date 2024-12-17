import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect, useRef } from 'react'
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { userApi } from '../../api/user/user.api'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

import { toastConfig } from 'config/index.config'
import { useActivationCode } from 'hooks/index.hooks'

const ActivationCode = ({ route }) => {
  const { data, addInfoData, onSubmit } = useActivationCode()
  const navigation = useNavigation()

  // Estado para los segundos del temporizador
  const [seconds, setSeconds] = useState(59)

  // Efecto para iniciar el temporizador
  useEffect(() => {
    if (seconds === 0) return // Si el temporizador ya llegó a 0, no hacer nada más

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    // Limpiar el intervalo cuando el temporizador llegue a 0 o el componente se desmonte
    return () => clearInterval(timer)
  }, [seconds])

  // Referencias para los inputs de código
  const input1Ref = useRef(null)
  const input2Ref = useRef(null)
  const input3Ref = useRef(null)
  const input4Ref = useRef(null)

  // Estado para los valores de los inputs
  const [code, setCode] = useState(['', '', '', ''])

  // Manejar el cambio de valor de los inputs y el cambio de foco
  const handleChange = (text, index) => {
    const newCode = [...code]
    newCode[index] = text

    setCode(newCode)

    // Mover el foco al siguiente input si el texto tiene 1 carácter
    if (text.length === 1 && index < 3) {
      const refs = [input2Ref, input3Ref, input4Ref]
      refs[index]?.current?.focus()
    }
  }

  const activateAccount = async () => {
    const { ok, toast, title, message } = await onSubmit({
      code: code.join(''),
    })
    showToast(toast, title, message)

    if (ok) {
      setTimeout(() => {
        navigation.navigate('Login')
      }, 2500)
    }
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  useEffect(() => {
    if (route.params) {
      const { email, full_name } = route.params
      addInfoData(email, full_name)
    }
  }, [])

  return (
    <View className="flex flex-col relative h-full w-full mx-auto pt-10 bg-[#F5F9FF] justify-center">
      {/* Información de usuario */}
      <View className="w-[90%] mx-auto">
        <View className="flex flex-row my-5 items-center justify-center w-full">
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 16,
              color: '#000000',
            }}
          >
            Hola,{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 15,
              color: '#741D1D',
            }}
          >
            {data.full_name}
          </Text>
        </View>

        <View className="flex flex-row my-4 items-center justify-center w-full flex-wrap">
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#545454',
            }}
          >
            El código fue enviado a{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#741D1D',
            }}
          >
            {data.email}
          </Text>
        </View>

        {/* Box Codes */}
        <View className="flex flex-row justify-between w-full gap-3">
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            value={code[0]}
            onChangeText={(text) => handleChange(text, 0)}
            ref={input1Ref}
            className="flex-1 h-16 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
            style={{
              fontFamily: 'Mulish_800ExtraBold',
              fontSize: 22,
              color: '#505050',
            }}
          />
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            value={code[1]}
            onChangeText={(text) => handleChange(text, 1)}
            ref={input2Ref}
            className="flex-1 h-16 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
            style={{
              fontFamily: 'Mulish_800ExtraBold',
              fontSize: 22,
              color: '#505050',
            }}
          />
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            value={code[2]}
            onChangeText={(text) => handleChange(text, 2)}
            ref={input3Ref}
            className="flex-1 h-16 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
            style={{
              fontFamily: 'Mulish_800ExtraBold',
              fontSize: 22,
              color: '#505050',
            }}
          />
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            value={code[3]}
            onChangeText={(text) => handleChange(text, 3)}
            ref={input4Ref}
            className="flex-1 h-16 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
            style={{
              fontFamily: 'Mulish_800ExtraBold',
              fontSize: 22,
              color: '#505050',
            }}
          />
        </View>

        <View className="flex flex-row my-4 items-center justify-center">
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#545454',
            }}
          >
            Reenviando código en{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_800ExtraBold',
              fontSize: 17,
              color: '#741D1D',
            }}
          >
            {seconds < 10 ? `0${seconds}` : seconds}{' '}
            {/* Mostrar el tiempo con 2 dígitos */}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
              color: '#545454',
            }}
          >
            s
          </Text>
        </View>

        <TouchableOpacity
          className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-4 rounded-full w-full"
          onPress={() => {
            Keyboard.dismiss()
            activateAccount()
          }}
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
      <Toast position="bottom" config={toastConfig} />
    </View>
  )
}

export default ActivationCode
