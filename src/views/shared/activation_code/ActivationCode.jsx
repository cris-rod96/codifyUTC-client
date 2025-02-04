import { Ionicons, Octicons } from '@expo/vector-icons'
import { useState, useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useActivationCode } from 'hooks/index.hooks'
import CustomToast from 'components/toast/Toast'

const ActivationCode = ({ route }) => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)

  const [loading, setLoading] = useState(false)
  const { data, addInfoData, onSubmit } = useActivationCode(setLoading)
  const navigation = useNavigation()

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

    if (text.length === 1 && index < 3) {
      const refs = [input2Ref, input3Ref, input4Ref]
      refs[index]?.current?.focus()
    }
  }

  const activateAccount = async () => {
    const { ok, toast, title, message } = await onSubmit({
      code: code.join(''),
    })

    if (ok) {
      setToast(true)
      setTypeToast(toast)
      setTitleToast(title)
      setMessageToast(message)
      setTimeout(() => {
        navigation.replace('Login')
      }, 2500)
    } else {
      setToast(true)
      setTypeToast(toast)
      setTitleToast(title)
      setMessageToast(message)
    }
  }

  useEffect(() => {
    if (route.params) {
      const { email, full_name } = route.params
      addInfoData(email, full_name)
    }
  }, [])

  return (
    <View className="flex flex-col relative h-full w-full mx-auto pt-10 bg-[#F5F9FF] justify-center">
      <View className="w-[90%] mx-auto">
        <View className="flex flex-row items-center justify-center w-full">
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
          {[input1Ref, input2Ref, input3Ref, input4Ref].map((ref, index) => (
            <TextInput
              key={index}
              keyboardType="numeric"
              maxLength={1}
              value={code[index]}
              onChangeText={(text) => handleChange(text, index)}
              ref={ref}
              className="flex-1 h-16 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
              style={{
                fontFamily: 'Mulish_800ExtraBold',
                fontSize: 22,
                color: '#505050',
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          className="flex flex-row gap-2 items-center justify-center my-5  py-4 rounded-full w-full"
          style={{
            backgroundColor: loading ? '#888' : '#741d1d',
          }}
          onPress={() => {
            Keyboard.dismiss()
            activateAccount()
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator size={'small'} color={'white'} />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: '#FFFFFF',
                }}
              >
                Validando
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: '#FFFFFF',
                }}
              >
                Validar
              </Text>

              <Octicons
                name="chevron-right"
                size={21}
                color={'white'}
                className="absolute right-8"
              />
            </>
          )}
        </TouchableOpacity>
      </View>
      {toast && (
        <CustomToast
          setToast={setToast}
          type={typeToast}
          title={titleToast}
          message={messageToast}
        />
      )}
    </View>
  )
}

export default ActivationCode
