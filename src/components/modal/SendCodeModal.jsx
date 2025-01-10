import { Octicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, Text, TouchableOpacity, View, TextInput } from 'react-native'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast/toast.config'
import { codeAPI } from '../../api/index.api'
import EmailSentModal from './EmailSentModal'

const SendCodeModal = ({ isVisible, toggleModal }) => {
  const [email, setEmail] = useState('')
  const handleChange = (value) => setEmail(value)

  const [showEmailSentModal, setShowEmailSentModal] = useState(false)
  const toggleEmailSentModal = () => setShowEmailSentModal((prev) => !prev)
  const [userData, setUserData] = useState({})

  const showToast = (type, title, message) =>
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })

  const handleSubmit = () => {
    if (email.trim().length === 0) {
      showToast(
        'error',
        'Email obligatorio',
        'El correo electrónico es obligatorio.'
      )
    }

    codeAPI
      .verifyUserAndSendCode(email)
      .then((res) => {
        const { message, userData } = res.data
        setUserData({
          email: userData.email,
          full_name: userData.fullName,
        })

        toggleEmailSentModal()
      })
      .catch((err) => {
        if (err.response.data) {
          const { message } = err.response.data
          showToast('error', 'Error', message)
        } else {
          showToast(
            'error',
            'Error desconocido',
            'Ha ocurrido un error inesperado. Intente de nuevo.'
          )
        }
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
              className="py-3 rounded-full bg-[#741D1D] mb-4"
              onPress={handleSubmit}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                Enviar código
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <EmailSentModal
        isVisible={showEmailSentModal}
        toggleModal={toggleEmailSentModal}
        user={userData}
      />
      <Toast config={toastConfig} position="bottom" />
    </>
  )
}

export default SendCodeModal
