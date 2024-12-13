import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast/toast.config'
import { classesAPI } from '../../api/classes/classes.api'

const AddClass = ({ isVisible, toggleModal, CourseId }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    topic: '',
    CourseId: '',
  })

  const handleChange = (key, value) => {
    value = value.trim()
    setData({
      ...data,
      [key]: value,
    })
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom',
      bottomOffset: 20,
    })
  }

  const resetData = () => {
    setData({
      ...data,
      topic: '',
    })
  }

  const closeModal = () => {
    resetData()
    setLoading(false)
    toggleModal()
  }

  const handleSubmit = async () => {
    if (Object.values(data).includes('')) {
      showToast('error', 'Error', 'Todos los campos son obligatorios')
      return
    }
    setLoading(true)
    classesAPI
      .create(data)
      .then((res) => {
        const { code, message } = res.data
        if (code === 201) {
          showToast('success', 'Clase creada', message)
          setTimeout(() => {
            closeModal()
          }, 2500)
        }
      })
      .catch((err) => {
        const { message } = err.response.data
        showToast('error', 'Error', message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setData({
      ...data,
      CourseId: CourseId,
    })
  }, [])

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="w-[90%] bg-white rounded-lg border border-[#741D1D] overflow-hidden">
          {/* Header */}
          <View className="flex flex-row items-center justify-between py-4 bg-[#741D1D] px-3">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 15,
                color: 'white',
              }}
            >
              Nueva Clase
            </Text>

            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View className="p-4 bg-[#F5F9FF] flex flex-col gap-3">
            <View className="flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                }}
              >
                Curso
              </Text>
              <View className="flex justify-center items-center h-[50px] rounded-lg bg-[#EFEFEF] border border-gray-300">
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#505050',
                  }}
                >
                  Desarrollo Web
                </Text>
              </View>
            </View>
            <View className="flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                }}
              >
                Tema
              </Text>
              <TextInput
                onChangeText={(value) => handleChange('topic', value)}
                defaultValue={data.topic}
                className="px-4 h-[50px] rounded-lg bg-white border border-gray-300"
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#505050',
                }}
              />
            </View>

            <TouchableOpacity
              className={`flex flex-row items-center justify-center gap-3 h-[50px] rounded-lg ${
                loading ? 'bg-gray-400' : 'bg-[#741D1D]'
              }`}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <ActivityIndicator size={'small'} color={'#ffffff'} />
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 15,
                      color: 'white',
                    }}
                  >
                    Guardando
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons name="save" size={20} color="white" />
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 15,
                      color: 'white',
                    }}
                  >
                    Guardar
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Toast config={toastConfig} position="bottom" />
      </View>
    </Modal>
  )
}

export default AddClass
