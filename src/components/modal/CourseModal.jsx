import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
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

import { codeUtil, pickerImagesUtil, storageUtil } from 'utils/index.utils'
import Toast from 'react-native-toast-message'
import toastConfig from 'config/toast/toast.config'
import { coursesAPI } from 'api/index.api'
import { useSelector } from 'react-redux'
import {
  SelectSectionModal,
  SelectCourseModal,
} from 'components/modal/index.modals'

const CourseModal = ({ isVisible, toggleModal, onContinue }) => {
  const { user } = useSelector((state) => state.user)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageUri, setImageUri] = useState(null)

  const [showSectionModal, setShowSectionModal] = useState(false)
  const [showSelectCourseModal, setShowSelectCourseModal] = useState(false)

  const toggleShowSectionModal = () => setShowSectionModal((prev) => !prev)
  const toggleShowSelectCourseModal = () =>
    setShowSelectCourseModal((prev) => !prev)

  const initialState = {
    semester: '',
    subject: '',
    section: '',
    access_code: '',
    TeacherId: '',
  }

  const [course, setCourse] = useState(initialState)

  const handleChange = (name, value) => {
    setCourse({ ...course, [name]: value })
  }

  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) setImageUri(uri)
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

  const handleSubmit = () => {
    if (Object.values(course).includes('')) {
      showToast('error', 'Error', 'Todos los campos son obligatorios')
      return
    }
    showToast('info', 'Creando curso', 'Espere un momento...')

    const formData = new FormData()
    Object.keys(course).forEach((key) => {
      formData.append(key, course[key])
    })

    if (imageUri) {
      formData.append('poster', {
        uri: imageUri,
        name: `course_picture_${course.subject.replace(/\s/g, '')}_${
          course.section
        }.jpg`,
        type: 'image/jpeg',
      })
    }

    coursesAPI
      .create(formData)
      .then((res) => {
        showToast(
          'success',
          'Curso creado',
          'El curso ha sido creado exitosamente'
        )
        setCourse(initialState)
        setImageUri(null)
        setTimeout(() => {
          toggleModal()
          onContinue()
        }, 2500)
      })
      .catch((err) => {
        const { message } = err.response.data
        showToast('error', 'Error', message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const generateAccessCode = () => {
    const code = codeUtil.generateAccessCode()
    setCourse((prev) => ({ ...prev, access_code: code }))
  }

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true)
      generateAccessCode() // Genera un código al abrir el modal
      setCourse((prev) => ({
        ...prev,
        TeacherId: user.id,
      }))
    } else {
      setTimeout(() => setIsMounted(false), 300)
    }
  }, [isVisible])

  return !isLoading ? (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
    >
      {isMounted && (
        <View className="flex h-full  bg-[#F5F9FF]">
          {/* Header */}
          <View className="flex flex-row justify-between items-center border-b border-gray-300 py-5 px-3">
            <SelectSectionModal
              visible={showSectionModal}
              onClose={toggleShowSectionModal}
              handleChange={handleChange}
            />
            <SelectCourseModal
              visible={showSelectCourseModal}
              onClose={toggleShowSelectCourseModal}
              handleChange={handleChange}
            />
            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="arrow-back" size={26} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 21,
                }}
              >
                Nuevo Curso
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-[#741D1D] flex flex-row  items-center justify-center shadow-sm "
                onPress={handleSubmit}
              >
                <Ionicons name="save" color="white" size={18} />
              </TouchableOpacity>
              <TouchableOpacity className="flex flex-row  items-center justify-center w-10 h-10 rounded-full bg-[#383838]">
                <Ionicons name="reload" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView className="px-5 pb-10">
            <View className="mt-5 flex flex-col gap-3">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 18,
                  color: '#202244',
                }}
              >
                Añade una imagen de portada
              </Text>
              <TouchableOpacity
                className="w-full h-[200px] bg-[#FFFEFE] flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-xl relative shadow-lg shadow-gray-300 overflow-hidden"
                onPress={pickImage}
              >
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <>
                    <Ionicons name="cloud-upload" size={40} color={'#741D1D'} />
                    <Text
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 14,
                        color: '#545454',
                      }}
                    >
                      Presiona aquí para subir
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Formulario */}
              <View className="flex flex-col gap-3">
                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative">
                  <View className="w-14 flex flex-row items-center justify-center h-full ">
                    <MaterialCommunityIcons
                      name="clock"
                      size={20}
                      color={'#545454'}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#505050',
                    }}
                  >
                    {course.section || 'Periodo'}
                  </Text>

                  <TouchableOpacity
                    className="absolute right-5"
                    onPress={toggleShowSectionModal}
                  >
                    <Octicons name="chevron-down" size={18} color={'#202244'} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  placeholder="Materia"
                  onChangeText={(value) => handleChange('subject', value)}
                  className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                  }}
                  defaultValue={course.subject}
                />

                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative">
                  <View className="w-14 flex flex-row items-center justify-center h-full ">
                    <MaterialCommunityIcons
                      name="room-service"
                      size={20}
                      color={'#545454'}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#505050',
                    }}
                  >
                    {course.semester || 'Semestre'}
                  </Text>

                  <TouchableOpacity
                    className="absolute right-5"
                    onPress={toggleShowSelectCourseModal}
                  >
                    <Octicons name="chevron-down" size={18} color={'#202244'} />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-col gap-2 mt-3">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                    }}
                  >
                    Código de acceso
                  </Text>
                  <View
                    className="py-10 flex justify-center items-center bg-white rounded-lg
                  border border-dashed border-gray-200 shadow-sm shadow-gray-300"
                  >
                    <Text
                      style={{
                        fontFamily: 'PressStart2P_400Regular',
                        fontSize: 20,
                      }}
                      className="text-gray-400"
                    >
                      {course.access_code}
                    </Text>
                  </View>
                </View>

                {/* <TouchableOpacity
                  className="flex flex-row items-center justify-center bg-[#741D1D] py-4 mt-2 gap-2 relative rounded-full mb-10"
                  onPressOut={handleSubmit}
                >
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: '#FFFFFF',
                    }}
                  >
                    Guardar
                  </Text>
                  <Ionicons
                    name="chevron-forward-circle-sharp"
                    className="absolute right-3"
                    size={24}
                    color={'#FFFFFF'}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      <Toast position="bottom" config={toastConfig} />
    </Modal>
  ) : (
    <Modal
      visible={isLoading}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            color: '#FFFFFF',
            fontFamily: 'Jost_600SemiBold',
          }}
        >
          Creando curso...
        </Text>
      </View>
    </Modal>
  )
}

export default CourseModal
