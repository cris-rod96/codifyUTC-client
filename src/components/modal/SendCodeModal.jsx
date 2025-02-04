import { Octicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { codeAPI } from '../../api/index.api'
import EmailSentModal from './EmailSentModal'
import CustomToast from '../toast/Toast'
import { useNavigation } from '@react-navigation/native'

const SendCodeModal = ({ isVisible, toggleModal }) => {
  const navigation = useNavigation()
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const handleChange = (value) => setEmail(value)

  const handleSubmit = () => {
    if (email.trim().length === 0) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Email obligatorio')
      setMessageToast('El correo electrónico es obligatorio')
      return
    }

    setLoading(true)

    codeAPI
      .verifyUserAndSendCode(email)
      .then((res) => {
        const { message, userData } = res.data
        setToast(true)
        setTypeToast('success')
        setTitleToast('Email verficado')
        setMessageToast(message)
        setTimeout(() => {
          navigation.navigate('ActivationCode', {
            email: userData.email,
            full_name: userData.full_name,
          })
        }, 2500)
      })
      .catch((err) => {
        if (err.response.data) {
          const { message } = err.response.data
          setToast(true)
          setTypeToast('error')
          setTitleToast('Error al verificar')
          setMessageToast(message)
        } else {
          setToast(true)
          setTypeToast('error')
          setTitleToast('Error desconocido')
          setMessageToast('Ha ocurrido un error inesperado. Intente de nuevo.')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View className="flex-1 bg-black/50 flex flex-col justify-center items-center px-5">
          {/* View */}
          <View className="mt-10 px-5 flex flex-col gap-3 w-full bg-white relative rounded-lg border border-gray-200">
            {/* Icono para cerrar */}

            <TouchableOpacity
              className="w-8 h-8 rounded-full bg-[#741D1D] flex justify-center items-center absolute top-3 right-3"
              onPress={toggleModal}
            >
              <Octicons name="x" size={16} color={'white'} />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 17,
                color: '#202244',
              }}
              className="mt-12"
            >
              Correo electrónico
            </Text>
            <TextInput
              className="w-full border border-gray-200 rounded-lg px-2 py-3"
              value={email}
              onChangeText={(value) => handleChange(value)}
              autoCapitalize="none"
            />

            <TouchableOpacity
              className="py-3 rounded-full  mb-4 flex flex-row items-center justify-center gap-2"
              onPress={handleSubmit}
              style={{
                backgroundColor: loading ? '#888' : '#741D1D',
              }}
              disabled={loading}
            >
              {loading && <ActivityIndicator size={'small'} color={'white'} />}
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {loading ? 'Verificando' : 'Enviar código'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {toast && (
          <CustomToast
            setToast={setToast}
            type={typeToast}
            title={titleToast}
            message={messageToast}
          />
        )}
      </Modal>
    </>
  )
}

export default SendCodeModal
