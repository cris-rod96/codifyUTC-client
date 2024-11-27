import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { userApi } from '../../api/user/user.api'
import { useEffect, useRef, useState } from 'react'

const RecoveryCode = ({ route }) => {
  const { method, value } = route.params
  const navigation = useNavigation()

  const [seconds, setSeconds] = useState(59)

  useEffect(() => {
    if (seconds === 0) return // Si el temporizador ya llegó a 0, no hacer nada más

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds])

  const input1Ref = useRef(null)
  const input2Ref = useRef(null)
  const input3Ref = useRef(null)
  const input4Ref = useRef(null)

  const [code, setCode] = useState(['', '', '', ''])

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

  const handleSubmit = () => {
    userApi
      .verifyCode({
        method,
        value,
        code: code.join(''),
      })
      .then((res) => {
        const { message } = res.data
        showToast('success', 'Código verificado', message)

        setTimeout(() => {
          navigation.navigate('ChangePassword', {
            method,
            value,
          })
        }, 3500)
      })
      .catch((err) => {
        const { message } = err.response.data
        showToast('error', 'Error', message)
      })
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom', // Posiciona el toast en la parte inferior
      bottomOffset: 80,
    })
  }

  return (
    <View className="flex flex-col relative h-full px-5 w-full">
      <View className="flex flex-row my-7 items-center justify-center w-full">
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
          {value}
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
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
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
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
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
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
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
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 22,
            color: '#505050',
          }}
        />
      </View>

      <View className="flex flex-row my-7 items-center justify-center">
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
          {seconds < 10 ? `0${seconds}` : seconds}
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
        className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-5 rounded-full  w-full"
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
          <Ionicons name="chevron-forward-sharp" size={20} color={'#741D1D'} />
        </View>
      </TouchableOpacity>
      <Toast position="bottom" />
    </View>
  )
}

export default RecoveryCode
