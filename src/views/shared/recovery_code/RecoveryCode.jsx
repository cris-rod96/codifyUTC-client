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
import { useRecuperationCode } from 'hooks/index.hooks'
import { codeAPI } from '../../../api/index.api'
import CustomToast from 'components/toast/Toast'

const RecoveryCode = ({ route }) => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const { data, addInfoData, onSubmit } = useRecuperationCode(setLoading)
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

    // Mover el foco al siguiente input si el texto tiene 1 carácter
    if (text.length === 1 && index < 3) {
      const refs = [input2Ref, input3Ref, input4Ref]
      refs[index]?.current?.focus()
    }
  }

  const resendCode = async () => {
    codeAPI
      .resendCode(data.method, data.value, 'Recovery')
      .then((res) => {
        setToast(true)
        setTypeToast('success')
        setTitleToast('Código reenviado')
        setMessageToast('El código fue reenviado con éxito.')
      })
      .catch((err) => {
        setTypeToast('error')
        setTitleToast('Error al enviar')
        setMessageToast('No se pudo reenviar el código')
      })
  }

  const sendCode = async () => {
    const { ok, message } = await onSubmit({
      code: code.join(''),
    })

    if (ok) {
      setToast(true)
      setTypeToast('success')
      setTitleToast('Código verificado')
      setMessageToast(message)
      setTimeout(() => {
        navigation.replace('ChangePassword', {
          method: data.method,
          value: data.value,
        })
      }, 2500)
    } else {
      setToast(true)
      setTypeToast(toast)
      setTitleToast('Código verificado')
      setMessageToast(message)
    }
  }

  useEffect(() => {
    if (route.params) {
      const { method, value } = route.params
      addInfoData(method, value)
    }
  }, [])

  return (
    <View className="flex flex-col relative h-full w-full mx-auto pt-10 bg-[#F5F9FF] justify-center">
      {/* Información de usuario */}
      <View className="w-[90%] mx-auto">
        <View className="flex flex-row my-4 items-center justify-center w-full flex-wrap gap-2">
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#545454',
            }}
          >
            El código fue enviado via
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_800ExtraBold',
              fontSize: 13,
              color: '#741D1D',
            }}
          >
            {data.method}
          </Text>

          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#545454',
            }}
          >
            a
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#741D1D',
            }}
          >
            {data.value}
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

        <TouchableOpacity
          className="flex flex-row gap-2 items-center justify-center my-5  py-4 rounded-full w-full"
          onPress={() => {
            Keyboard.dismiss()
            sendCode()
          }}
          style={{
            backgroundColor: loading ? '#888' : '#741D1D',
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
      <View className="w-full absolute bottom-10 flex justify-center items-center">
        <TouchableOpacity onPress={resendCode}>
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 16,
              color: '#741D1D',
            }}
          >
            Solicitar un nuevo código
          </Text>
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

export default RecoveryCode
