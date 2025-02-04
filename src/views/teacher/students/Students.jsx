import React, { useCallback, useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'

import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { coursesAPI } from 'api/index.api'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import { BanStudentModal } from 'components/modal/index.modals'
import {
  saveCourses,
  saveAllStudents,
  saveAllClassesInCourses,
} from 'redux/slices/teacher.slice'
import { useNavigation } from '@react-navigation/native'
import profile from 'assets/profile.png'
import CustomToast from 'components/toast/Toast'

const Students = () => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)
  const navigation = useNavigation()
  const { students, courses } = useSelector((state) => state.teacher)
  const { user } = useSelector((state) => state.user)
  const [nameTeacher, setNameTeacher] = useState(null)
  const [nameCourse, setNameCourse] = useState(null)
  const [currentStudent, setCurrentStudent] = useState(null)
  const [courseId, setCourseId] = useState(null)
  const dispatch = useDispatch()

  // Ban Modal
  const [showBanModal, setShowModal] = useState(false)
  const toggleShowBanModal = () => setShowModal((prev) => !prev)

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: 'bottom',
    })
  }

  const onContinue = (confirm) => {
    toggleShowBanModal()
    setTimeout(() => {
      if (confirm) {
        const updateCourses = courses.map((course) => ({
          ...course,
          Students: course.Students.filter(
            (student) => student.id !== currentStudent.id
          ),
        }))

        dispatch(saveCourses(updateCourses))
        dispatch(saveAllClassesInCourses(updateCourses))
        dispatch(saveAllStudents(updateCourses))

        setToast(true)
        setTypeToast('success')
        setTitleToast('Alumno eliminado')
        setMessageToast('Se ha eliminado al estudiante del curso')
      } else {
        setToast(true)
        setTypeToast('error')
        setTitleToast('Error al eliminar')
        setMessageToast('No se eliminó al estudiante. Intente de nuevo')
      }
    }, 1500)
  }

  const onDelete = (item) => {
    setCurrentStudent(item)
    setNameTeacher(user.full_name)
    setCourseId(item.CourseStudent.CourseId)
    const course = getSubjectCourse(item.CourseStudent.CourseId)
    setNameCourse(course)
    toggleShowBanModal()
  }

  const getSubjectCourse = (course_id) => {
    const course = courses.find((course) => course.id === course_id)
    return `${course.subject}`
  }

  const renderStudent = (item) => {
    return (
      <View className="flex-1 py-5 flex-row border-b border-gray-200 items-center ">
        {/* Foto de perfil */}
        <View className="w-16 lex justify-center items-center  h-full">
          <View className="relative w-[50px] h-[50px] rounded-full border border-gray-400">
            <Image
              source={
                item.profile_picture ? { uri: item.profile_picture } : profile
              }
              className="w-full h-full absolute object-contain rounded-full"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Nombre y curso */}
        <View className="flex-1 flex-col px-2 justify-center">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: '#202244',
            }}
          >
            {item.full_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              color: '#888',
            }}
          >
            {getSubjectCourse(item.CourseStudent.CourseId)}
          </Text>
        </View>

        <TouchableOpacity
          className="w-12 flex justify-center items-center"
          onPress={() => onDelete(item)}
        >
          <Octicons name="trash" size={21} color={'#741d1d'} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View
      className={`flex-1 flex flex-col px-5 py-3 bg-[#F5F9FF]${
        (!courses || courses.length === 0) && 'justify-center items-center'
      }`}
    >
      {toast && (
        <CustomToast
          setToast={setToast}
          type={typeToast}
          title={titleToast}
          message={messageToast}
        />
      )}
      <BanStudentModal
        visible={showBanModal}
        onClose={toggleShowBanModal}
        student={currentStudent}
        course_name={nameCourse}
        course_id={courseId}
        teacher_name={nameTeacher}
        onContinue={onContinue}
      />
      {courses && courses.length > 0 ? (
        students && students.length > 0 ? (
          <View className="flex-1 flex flex-col ">
            <View className="flex flex-row items-center justify-between h-[55px] bg-white rounded-xl overflow-hidden border border-gray-200 pr-2">
              {/* Icono de busqueda */}
              <View className="w-12 flex justify-center items-center">
                <Octicons name="search" size={18} />
              </View>
              {/* Input de busqueda */}
              <TextInput
                style={{
                  fontFamily: 'Mulush_700Bold',
                  fontSize: 16,
                  color: '#B4BDC4',
                }}
                className="flex-1 h-full pl-2"
                // onChangeText={(value) => handleSearch(value)}
                // defaultValue={search}
              />
              {/* Icono de filtros */}
              <TouchableOpacity
                className="w-10 h-10 justify-center items-center rounded-lg"
                // onPress={toggleModal}
              >
                <FontAwesome6 name="sliders" size={17} />
              </TouchableOpacity>
            </View>

            <View className="flex flex-1 flex-col">
              {/* Lista de estudiantes */}
              <FlatList
                style={{
                  flex: 1,
                }}
                data={students}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 20,
                  paddingBottom: 10,
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderStudent(item)}
                // refreshControl={
                //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                // }
              />
            </View>
          </View>
        ) : (
          <View className="flex-1 flex flex-col justify-center items-center w-full">
            <LottieView
              autoPlay
              loop
              source={emptyData}
              style={{ width: 250, height: 250 }}
            />

            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 17,
                color: '#202244',
                textAlign: 'center',
              }}
            >
              Sin alumnos registrados
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_400Regular',
                fontSize: 15,
                color: '#545454',
                marginTop: 20,
                textAlign: 'center',
              }}
            >
              Si ya creaste un curso, comparte el código de acceso con tus
              estudiantes para que puedan ser parte de tu espacio de trabajo
            </Text>
          </View>
        )
      ) : (
        <View className="flex-1 flex flex-col justify-center items-center w-full">
          <LottieView
            autoPlay
            loop
            source={emptyData}
            style={{ width: 250, height: 250 }}
          />

          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 17,
              color: '#202244',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Sin cursos registrados
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 15,
              color: '#545454',
              textAlign: 'center',
            }}
          >
            Crear un curso y comparte el código de acceso con tus estudiantes
            para que puedan ingresar y no perderse de tus clases y actividades.
          </Text>

          <TouchableOpacity
            className="w-full py-4 flex flex-row items-center justify-center gap-2 bg-[#741D1D] mt-4 rounded-full"
            onPress={() => navigation.navigate('TabCourse')}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: 'white',
              }}
            >
              Ir a cursos
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Students
