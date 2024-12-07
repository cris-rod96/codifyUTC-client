import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Modal,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import Select from 'react-native-picker-select'
import {
  codeUtil,
  pickerImagesUtil,
  storageUtil,
} from '../../utils/index.utils'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast/toast.config'
import { coursesAPI } from '../../api/courses/courses.api'

const CourseModal = ({ isVisible, toggleModal }) => {
  const [imageUri, setImageUri] = useState(null)
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
        }, 2500)
      })
      .catch((err) => {
        const { message } = err.response.data
        showToast('error', 'Error', message)
      })
  }

  const generateAccessCode = () => {
    const code = codeUtil.generateAccessCode()
    setCourse((prev) => ({ ...prev, access_code: code }))
  }

  useEffect(() => {
    if (isVisible) {
      generateAccessCode() // Genera un código al abrir el modal
      storageUtil.getSecureData('user_info').then((res) => {
        const { id } = JSON.parse(res)
        setCourse((prev) => ({ ...prev, TeacherId: id }))
      })
    }
  }, [isVisible])

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
    >
      <ScrollView>
        <View className="flex h-full  bg-[#F5F9FF]  px-5 pt-5">
          {/* Header */}
          <View className="flex flex-row items-center gap-2">
            <Ionicons
              name="arrow-back"
              size={26}
              color="black"
              onPress={toggleModal}
            />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 21,
              }}
            >
              Agregar curso
            </Text>
          </View>

          <View className="mt-10 flex flex-col gap-3">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
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
                  className="w-full h-full absolute object-cover "
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
              <View className="mt-5 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm flex justify-center items-center">
                <Select
                  onValueChange={(value) => handleChange('semester', value)}
                  items={[
                    { label: 'Primero', value: 'Primero' },
                    { label: 'Segundo', value: 'Segundo' },
                    {
                      label: 'Tercero',
                      value: 'Tercero',
                    },
                    {
                      label: 'Cuarto',
                      value: 'Cuarto',
                    },
                    {
                      label: 'Quinto',
                      value: 'Quinto',
                    },
                  ]}
                  placeholder={{
                    label: 'Selecciona el semestre',
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
                      fontSize: 10,
                      fontFamily: 'Mulish_700Bold',
                    },
                  }}
                />
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

              <View className="h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm flex justify-center items-center">
                <Select
                  onValueChange={(value) => handleChange('section', value)}
                  items={[
                    { label: 'Matutina', value: 'Matutina' },
                    { label: 'Vespertina', value: 'Vespertina' },
                    {
                      label: 'Nocturna',
                      value: 'Nocturna',
                    },
                  ]}
                  placeholder={{
                    label: 'Selecciona el periodo',
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
                      fontSize: 10,
                      fontFamily: 'Mulish_700Bold',
                    },
                  }}
                />
              </View>

              <View className="flex flex-col gap-2 mt-3">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    marginLeft: 5,
                  }}
                >
                  Código de acceso
                </Text>
                <TextInput
                  placeholder="Código de acceso"
                  className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                  }}
                  editable={false}
                  defaultValue={course.access_code}
                />
              </View>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast position="bottom" config={toastConfig} />
    </Modal>
  )
}

export default CourseModal
