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
import { useSelector } from 'react-redux'
import { coursesAPI } from 'api/index.api'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { toastConfig } from 'config/index.config'
import { BanStudentModal } from 'components/modal/index.modals'
const Students = () => {
  const { user } = useSelector((state) => state.user)
  const [courses, setCourses] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [allStudents, setAllStudents] = useState(null)
  const [studentId, setStudentId] = useState(null)
  const [nameStudent, setNameStudent] = useState(null)
  const [nameTeacher, setNameTeacher] = useState(null)
  const [nameCourse, setNameCourse] = useState(null)
  const [emailStudent, setEmailStudent] = useState(null)
  const [courseId, setCourseId] = useState(null)

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
        showToast(
          'success',
          'Estudiante eliminado',
          'El estudiante ha sido notificado sobre su eliminación'
        )
      } else {
        showToast(
          'error',
          'Error al eliminar',
          'No se eliminó al estudiante. Intente de nuevo'
        )
      }
      onRefresh()
    }, 1500)
  }

  const onDelete = (item) => {
    setStudentId(item.id)
    setNameStudent(item.full_name)
    setEmailStudent(item.email)
    setNameTeacher(user.full_name)
    setCourseId(item.CourseStudent.CourseId)
    const course = getSubjectCourse(item.CourseStudent.CourseId)
    setNameCourse(course)
    toggleShowBanModal()
  }

  const getSubjectCourse = (course_id) => {
    const course = courses.find((course) => course.id === course_id)
    return `${course.semester} Sistemas - ${course.subject}`
  }

  const renderStudent = (item) => {
    return (
      <View className="flex flex-row border-b border-gray-200 items-center ">
        {/* Foto de perfil */}
        <View className="w-16 py-3 flex justify-center items-center  h-full">
          <View className="relative w-[50px] h-[50px] rounded-full border border-gray-400">
            <Image
              source={{ uri: item.profile_picture }}
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

  const fetchData = () => {
    const { id } = user
    setRefreshing(true)
    coursesAPI
      .getAll(id)
      .then((res) => {
        const { courses } = res.data
        setCourses(courses)
      })
      .catch((err) => {})
      .finally(() => setRefreshing(false))
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData()
  })

  useEffect(() => {
    if (courses) {
      const students = courses.map((course) => course.Students).flat()
      setAllStudents(students)
    }
  }, [courses])

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View className="flex-1 px-5 py-3">
      <Toast config={toastConfig} position="bottom" />
      <BanStudentModal
        visible={showBanModal}
        onClose={toggleShowBanModal}
        student_id={studentId}
        student_name={nameStudent}
        course_name={nameCourse}
        course_id={courseId}
        student_email={emailStudent}
        teacher_name={nameTeacher}
        onContinue={onContinue}
      />
      {allStudents && allStudents.length > 0 ? (
        <View className="flex flex-col">
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

          {/* Lista de estudiantes */}
          <FlatList
            data={allStudents}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: 10,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderStudent(item)}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
          />
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
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
              textAlign: 'center',
              maxWidth: 300,
            }}
          >
            Aún no hay alumnos registrados en tus cursos
          </Text>
        </View>
      )}
    </View>
  )
}

export default Students
