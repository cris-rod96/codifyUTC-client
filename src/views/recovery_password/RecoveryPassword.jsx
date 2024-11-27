import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from 'react-native'
import { userApi } from '../../api/user/user.api'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

const RecoveryPassword = () => {
  const [selectedField, setSelectedField] = useState(null)
  const [email, setEmail] = useState('')
  const [sms, setSms] = useState('')
  const scrollViewRef = useRef(null) // Referencia para ScrollView

  const navigation = useNavigation()

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value)
    if (field === 'sms') setSms(value)

    if (value.trim().length > 0) {
      setSelectedField(field)
    } else {
      setSelectedField(null) // Habilitar ambos si el campo queda vacío
    }
  }

  const handleFocus = (yOffset) => {
    // Desplaza el ScrollView para dejar visible el campo
    scrollViewRef.current?.scrollTo({
      y: yOffset,
      animated: true,
    })
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom',
    })
  }

  const handleSubmit = () => {
    if (selectedField === 'email' && email.trim() === '') {
      Alert.alert('Error', 'Por favor, ingrese un correo electrónico válido.')
      return
    }

    if (selectedField === 'sms' && sms.trim() === '') {
      Alert.alert('Error', 'Por favor, ingrese un número de teléfono válido.')
      return
    }

    const data =
      selectedField === 'email'
        ? { method: 'Email', value: email }
        : { method: 'SMS', value: sms }

    userApi
      .recoveryPassword(data)
      .then((res) => {
        showToast('success', 'Código enviado', res.data.message)

        setTimeout(() => {
          navigation.navigate('RecoveryCode', {
            method: data.method,
            value: data.value,
          })
        }, 3500)
      })
      .catch((err) => {
        showToast('error', 'Error', err.response.data.message)
      })
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef} // Asignamos la referencia
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex flex-col relative h-full px-5 w-full py-5">
          <View className="w-full h-[250px] bg-red-400" />

          <View className="flex my-5 gap-3 items-center">
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 14,
                color: '#545454',
                textAlign: 'center',
              }}
            >
              Seleccione qué datos de contacto debemos utilizar para restablecer
              su contraseña
            </Text>

            <View className="flex gap-5 w-full">
              {/* Vía Email */}
              <View className="w-full h-24 bg-white rounded-2xl px-5 items-center gap-3 flex-row">
                <View className="w-12 h-12 rounded-full bg-[#741D1D] flex justify-center items-center">
                  <Ionicons name="mail" size={24} color={'#FFFFFF'} />
                </View>

                <View className="flex gap-1">
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 12,
                      color: '#505050',
                    }}
                  >
                    Vía Email
                  </Text>
                  <TextInput
                    placeholder="example@utc.edu.ec"
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#202244',
                    }}
                    onFocus={() => handleFocus(200)} // Desplazar al foco
                    onChangeText={(value) => handleInputChange('email', value)}
                    editable={
                      selectedField === null || selectedField === 'email'
                    }
                  />
                </View>
              </View>

              {/* Vía SMS */}
              <View className="w-full h-24 bg-white rounded-2xl px-5 items-center gap-3 flex-row">
                <View className="w-12 h-12 rounded-full bg-[#741D1D] flex justify-center items-center">
                  <Ionicons name="call" size={24} color={'#FFFFFF'} />
                </View>

                <View className="flex gap-1">
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 12,
                      color: '#505050',
                    }}
                  >
                    Vía SMS
                  </Text>
                  <TextInput
                    placeholder="0981135286"
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#202244',
                    }}
                    keyboardType="numeric"
                    maxLength={10}
                    onFocus={() => handleFocus(300)} // Desplazar al foco
                    onChangeText={(value) => handleInputChange('sms', value)}
                    editable={selectedField === null || selectedField === 'sms'}
                  />
                </View>
              </View>
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
      <Toast position="bottom" bottomOffset={10} />
    </KeyboardAvoidingView>
  )
}

export default RecoveryPassword
