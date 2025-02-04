import { Octicons } from '@expo/vector-icons'
import React, { useState, useCallback } from 'react'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { CourseCard } from 'components/cards/index.cards'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import CourseModal from 'components/modal/CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveCourses,
  saveAllClassesInCourses,
  saveAllStudents,
} from 'redux/slices/teacher.slice'
import { coursesAPI } from 'api/index.api'

const Courses = ({ route }) => {
  const { user } = useSelector((state) => state.user)
  const { courses } = useSelector((state) => state.teacher)
  const [showModal, setShowModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useDispatch()

  // Cargar cursos desde el API
  const fetchCourses = async () => {
    setRefreshing(true)
    try {
      const res = await coursesAPI.getAll(user.id)
      const { courses } = res.data
      dispatch(saveCourses(courses))
      dispatch(saveAllClassesInCourses(courses))
      dispatch(saveAllStudents(courses))
    } catch (err) {
      console.error('Error al cargar los cursos:', err)
    } finally {
      setRefreshing(false)
    }
  }

  // Llamar fetchCourses cuando la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      fetchCourses()
    }, [user.id]) // Esto asegura que se vuelve a cargar cuando cambia el usuario
  )

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const onCourseAdded = () => {
    fetchCourses() // Actualizar la vista después de agregar un curso
    toggleModal() // Cerrar el modal
  }

  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] relative">
      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
        onPress={toggleModal}
      >
        <Octicons name="plus" size={25} color={'white'} />
      </TouchableOpacity>

      {courses.length === 0 ? (
        // Vista cuando no hay cursos
        <View className="flex-1 justify-center items-center px-5">
          <LottieView
            autoPlay
            loop
            source={emptyData}
            style={{ width: 200, height: 200 }}
          />
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 18,
              color: '#202244',
              marginTop: 20,
            }}
          >
            Aún no has agregado cursos
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 14,
              color: '#545454',
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            Agrega los cursos en los que impartes clases para que tus
            estudiantes puedan encontrarlos fácilmente.
          </Text>
        </View>
      ) : (
        // Lista de cursos con Pull to Refresh
        <ScrollView
          className="flex-1 px-3"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchCourses} />
          }
        >
          <View className="flex flex-col gap-5 px-3 py-5">
            {/* Buscador */}
            <View className="flex flex-row items-center bg-white border border-gray-200 shadow-lg shadow-gray-300 h-[45px]">
              <View className="w-12 h-full flex items-center justify-center">
                <Octicons name="search" size={20} color={'#202244'} />
              </View>
              <TextInput
                placeholder="Buscar curso"
                className="bg-transparent flex-1"
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 13,
                  color: '#B4BDC4',
                }}
              />
            </View>
          </View>

          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onContinue={fetchCourses} // Puedes mantener esta lógica si es necesario
            />
          ))}
        </ScrollView>
      )}

      <CourseModal
        isVisible={showModal}
        toggleModal={toggleModal}
        onCourseAdded={onCourseAdded} // Pasar la función para actualizar la vista
      />
    </View>
  )
}

export default Courses
