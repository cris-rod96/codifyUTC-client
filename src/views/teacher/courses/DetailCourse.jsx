import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import posterDefault from 'assets/bg-tech.jpg'
import { pickerImagesUtil } from 'utils/index.utils'
import { coursesAPI } from 'api/index.api'
import {
  saveCourses,
  saveAllClassesInCourses,
  saveAllStudents,
} from 'redux/slices/teacher.slice'

import {
  SelectSectionModal,
  SelectCourseModal,
  DeleteQuestionModal,
} from 'components/modal/index.modals'
import Toast from 'react-native-toast-message'
import { toastConfig } from 'config/index.config'

const DetailCourse = ({ route, navigation }) => {
  const [courseId, setCourseId] = useState(null)
  const [auxCourses, setAuxCourses] = useState([])
  const { courses } = useSelector((state) => state.teacher)
  const [currentCourse, setCurrentCourse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUri, setImageUri] = useState(null)
  const dispatch = useDispatch()

  const [showSectionModal, setShowSectionModal] = useState(false)
  const [showSelectCourseModal, setShowSelectCourseModal] = useState(false)
  const [showQuestionDelete, setShowQuestionDelete] = useState(false)
  const toggleShowQuestionDelete = () => setShowQuestionDelete((prev) => !prev)

  const toggleShowSectionModal = () => setShowSectionModal((prev) => !prev)
  const toggleShowSelectCourseModal = () =>
    setShowSelectCourseModal((prev) => !prev)

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    })
  }

  const handleChange = (name, value) => {
    setCurrentCourse({ ...currentCourse, [name]: value })
  }

  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) {
      setImageUri(uri)
      if (currentCourse) {
        setCurrentCourse({
          ...currentCourse,
          poster: uri,
        })
      }
    }
  }

  const handleSubmit = () => {
    const { poster, ...data } = currentCourse

    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    if (imageUri) {
      formData.append('poster', {
        uri: imageUri,
        name: `course_picture_${data.subject.replace(/\s/g, '')}_${
          data.section
        }.jpg`,
        type: 'image/jpeg',
      })
    }

    setLoading(true)

    const updateCourse = imageUri
      ? coursesAPI.updateCourseWithImage(courseId, formData)
      : coursesAPI.updateCourseWithoutImage(courseId, formData)

    updateCourse
      .then((res) => {
        showToast(
          'success',
          'Curso actualizado',
          'Se ha actualizado la información de este curso'
        )

        // 🔹 Actualiza auxCourses con el curso editado
        const updatedCourses = auxCourses.map((course) =>
          course.id === courseId ? { ...course, ...currentCourse } : course
        )

        setAuxCourses(updatedCourses)

        // 🔹 Despacha el estado global actualizado
        dispatch(saveCourses(updatedCourses))
        dispatch(saveAllClassesInCourses(updatedCourses))
        dispatch(saveAllStudents(updatedCourses))
      })
      .catch((err) => {
        showToast(
          'error',
          'Error al actualizar',
          'No se pudo actualizar la información de este curso'
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onContinue = (confirm) => {
    toggleShowQuestionDelete()
    if (confirm) {
      showToast('success', 'Curso eliminado', 'Se ha eliminado el curso')
      const updatedCourses = auxCourses.filter(
        (course) => course.id !== courseId
      )
      setAuxCourses(updatedCourses)
      dispatch(saveCourses(updatedCourses))
      dispatch(saveAllClassesInCourses(updatedCourses))
      dispatch(saveAllStudents(updatedCourses))
      navigation.goBack()
    } else {
      showToast('error', 'Error al eliminar', 'No se ha eliminado el curso')
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title: currentCourse?.subject || 'Curso',
    })
  }, [currentCourse])

  useEffect(() => {
    if (courseId) {
      const current = courses.find((course) => course.id === courseId)
      setCurrentCourse(current)
    }
  }, [courseId])

  useEffect(() => {
    if (route.params) {
      const { courseId, courseName } = route.params
      setCourseId(courseId)
      setAuxCourses(courses)
      navigation.setOptions({
        title: courseName,
      })
    }
  }, [route.params])

  return (
    <View className="flex-1 bg-[#F5F9FF] relative">
      {/* Detallea */}
      <ScrollView
        className="flex-1 bg-[#F5F9FF]"
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pb-10 py-3 flex flex-col gap-3">
          {/* Nombre del curso */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Materia
            </Text>

            <TextInput
              className="w-full h-[50px] bg-white border border-gray-200 rounded-lg px-2"
              defaultValue={currentCourse?.subject}
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#888',
              }}
              onChangeText={(value) => handleChange('subject', value)}
            />
          </View>

          {/* Portada */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Portada
            </Text>

            {/* Imagen y boton */}
            <View className="flex flex-col gap-1">
              <View className="w-full h-[180px] bg-white rounded-xl relative overflow-hidden">
                <Image
                  source={
                    currentCourse?.poster
                      ? { uri: currentCourse.poster }
                      : posterDefault
                  }
                  className="w-full h-full absolute object-contain"
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity
                className="flex flex-row bg-[#741D1D] rounded-xl items-center justify-center h-[45px] gap-2"
                onPress={pickImage}
              >
                <MaterialIcons name="photo" size={21} color={'white'} />
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  {currentCourse?.poster ? 'Cambiar portada' : 'Añadir portada'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sección */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Sección
            </Text>

            <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative">
              <Text
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 14,
                  color: '#888',
                }}
                className="px-5"
              >
                {currentCourse?.section || 'Sección'}
              </Text>

              <TouchableOpacity
                className="absolute right-5"
                onPress={toggleShowSectionModal}
              >
                <Octicons name="chevron-down" size={18} color={'#202244'} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Semestre
            </Text>

            <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative">
              <Text
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 14,
                  color: '#888',
                }}
                className="px-5"
              >
                {currentCourse?.semester || 'Semestre'}
              </Text>

              <TouchableOpacity
                className="absolute right-5"
                onPress={toggleShowSelectCourseModal}
              >
                <Octicons name="chevron-down" size={18} color={'#202244'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Código de acceso */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Código de acceso
            </Text>

            <TextInput
              editable={false}
              className="w-full h-[60px] bg-white border text-center border-gray-200 rounded-lg px-2"
              defaultValue={currentCourse?.access_code}
              style={{
                fontFamily: 'Mulish_800ExtraBold',
                fontSize: 18,
                color: '#888',
              }}
            />
          </View>

          <TouchableOpacity
            className="w-full h-[45px]  flex flex-row items-center justify-center gap-2 rounded-xl"
            style={{
              backgroundColor: loading ? '#888' : '#000',
            }}
            disabled={loading}
            onPress={handleSubmit}
          >
            {loading && <ActivityIndicator size={'small'} color={'white'} />}
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: 'white',
              }}
            >
              {loading ? 'Actualizando' : 'Actualizar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

      <DeleteQuestionModal
        title={'¿Realmente desea eliminar este curso?'}
        isVisible={showQuestionDelete}
        onClose={toggleShowQuestionDelete}
        onContinue={onContinue}
        model={'courses'}
        id={courseId}
      />

      <Toast config={toastConfig} position="bottom" />

      <TouchableOpacity
        className="w-[45px] h-[45px] rounded-full bg-[#741D1D] flex justify-center items-center absolute bottom-5 right-4 border-2 border-gray-200"
        onPress={toggleShowQuestionDelete}
      >
        <Octicons name="trash" size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  )
}

export default DetailCourse
