import { Ionicons, Octicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import Select from 'react-native-picker-select'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast/toast.config'
import { classesAPI } from 'api/index.api'

const ClassModal = ({ isVisible, toggleModal, registerClassSuccess }) => {
  const [loading, setLoading] = useState(false)
  const { courses } = useSelector((state) => state.teacher)
  const [dataClass, setDataClass] = useState({
    topic: '',
    CourseId: '',
  })
  const [items, setItems] = useState([])
  const handleChange = (name, value) => {
    setDataClass((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetData = () => {
    setDataClass({
      topic: '',
      CourseId: '',
    })
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  const registerClass = () => {
    if (dataClass.topic === '' || dataClass.CourseId === '') {
      showToast(
        'error',
        'Campos obligatorios',
        'Todos los datos son necesarios'
      )
      return
    }

    setLoading(true)

    classesAPI
      .create(dataClass)
      .then((res) => {
        resetData()
        const { message } = res.data
        showToast('success', 'Clase creada', message)
        setTimeout(() => {
          registerClassSuccess(true)
          toggleModal()
        }, 2500)
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    const mapItems = courses.map((course) => ({
      label: course.subject,
      value: course.id,
    }))
    setItems(mapItems)
  }, [courses])

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <ScrollView className="pb-20">
        <View className="flex  bg-[#F5F9FF]  px-5 py-5 h-screen">
          {/* Header */}
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity onPressIn={toggleModal}>
                <Ionicons name="arrow-back" size={26} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 21,
                }}
              >
                Agregar clase
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity
                className="w-8 h-8 rounded-full flex justify-center items-center bg-[#741D1D]"
                onPress={resetData}
              >
                <Octicons name="sync" size={15} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-10 flex flex-col">
            {/* Formulario */}
            <View className="flex flex-col gap-6">
              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 17,
                    color: '#202244',
                  }}
                >
                  Curso
                </Text>
                <View className="h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm flex justify-center items-center">
                  <Select
                    key={dataClass.CourseId}
                    onValueChange={(value) => handleChange('CourseId', value)}
                    items={items}
                    placeholder={{
                      label: 'Selecciona el curso',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    style={{
                      inputIOS: {
                        fontSize: 14,
                        fontFamily: 'Mulish_700Bold',
                        color: '#202244',
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

              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 17,
                    color: '#202244',
                  }}
                >
                  Tema principal
                </Text>
                <TextInput
                  onChangeText={(value) => handleChange('topic', value)}
                  value={dataClass.topic}
                  className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                  }}
                />
              </View>

              <TouchableOpacity
                className={`py-4 rounded-full flex flex-row gap-3  items-center justify-center mt-3 ${
                  loading ? 'bg-gray-400' : 'bg-[#741D1D]'
                }`}
                disabled={loading}
                onPress={registerClass}
              >
                {loading && (
                  <ActivityIndicator size={'small'} color={'#FFFFFF'} />
                )}
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: '#FFFFFF',
                  }}
                >
                  {loading ? 'Guardando' : 'Guardar'}
                </Text>
                {!loading && (
                  <Octicons
                    name="chevron-right"
                    className="absolute right-5"
                    size={21}
                    color={'#FFFFFF'}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast config={toastConfig} position="bottom" />
    </Modal>
  )
}

export default ClassModal
