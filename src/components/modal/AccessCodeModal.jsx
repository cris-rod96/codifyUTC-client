import { Ionicons, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import { courseStudentsAPI } from 'api/index.api'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast/toast.config'

const AccessCodeModal = ({
  isVisible,
  toggleModal,
  toggleUpdateClass,
  user_id,
  course_id,
  successRegister,
  handleContinue,
}) => {
  const [accessCode, setAccessCode] = useState('')
  const [loading, setLoading] = useState(false)

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  const resetData = () => {
    setAccessCode('')
    setLoading(false)
    setTimeout(() => {
      handleContinue()
    }, 2500)
  }

  const handleClose = () => {
    setAccessCode('')
    toggleModal()
  }

  const handleChange = (value) => {
    setAccessCode(value)
  }

  const handleSubmit = async () => {
    if (accessCode.trim() === '') {
      showToast('error', 'Error', 'El código de acceso es obligatorio')
      return
    }

    if (accessCode.trim().length !== 6) {
      showToast('error', 'Error', 'El código de acceso es de 6 números')
      return
    }

    setLoading(true)

    courseStudentsAPI
      .register({
        CourseId: course_id,
        StudentId: user_id,
        access_code: accessCode,
      })
      .then((res) => {
        const { message } = res.data
        showToast('success', 'Código verificado', message)
        resetData()
      })
      .catch((err) => {
        if (err.response.data) {
          const { message } = err.response.data
          showToast('error', 'Código incorrecto', message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    console.log(course_id)
  }, [course_id])

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}
    >
      {/* Fondo semitransparente */}
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        {/* Contenedor del Modal */}
        <View className="w-[80%] bg-white rounded-2xl p-6 shadow-lg relative">
          {/* Botón de cierre */}
          <TouchableOpacity
            className="absolute top-3 right-3"
            onPress={handleClose}
          >
            <Octicons name="x-circle-fill" size={20} color="#741D1D" />
          </TouchableOpacity>

          {/* Título */}
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
              textAlign: 'center',
            }}
            className="mb-4"
          >
            Código de Acceso
          </Text>

          {/* Input para el código */}
          <TextInput
            keyboardType="numeric"
            onChangeText={(value) => handleChange(value)}
            placeholder="Introduce el código"
            placeholderTextColor="#9E9E9E"
            className={`w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black mb-3`}
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
            }}
          />

          {/* Botón de acceso */}
          <TouchableOpacity
            className="w-full  flex-row items-center justify-center py-3 rounded-full gap-2"
            style={{
              backgroundColor: loading ? '#888' : '#741D1D',
            }}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  Verificando
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  Acceder
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="white"
                  className="absolute right-5"
                />
              </>
            )}
          </TouchableOpacity>
        </View>
        <Toast config={toastConfig} position="bottom" />
      </View>
    </Modal>
  )
}

export default AccessCodeModal
