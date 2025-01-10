import { Ionicons, Octicons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { CourseCard } from 'components/cards/index.cards'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import CourseModal from 'components/modal/CourseModal'
// import { coursesAPI } from '../../../api/courses/courses.api'
// import { storageUtil } from '../../../utils/index.utils'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { deleteCourse, saveCourses } from 'redux/slices/teacher.slice'
import { coursesAPI } from 'api/index.api'
import {
  saveAllClassesInCourses,
  saveAllStudents,
} from 'redux/slices/teacher.slice'
import { useLoading } from 'context/LoadingContext'
import { storageUtil } from '../../../utils/index.utils'

const Courses = () => {
  const { user } = useSelector((state) => state.user)
  const { showLoading, hideLoading } = useLoading()
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const { courses } = useSelector((state) => state.teacher)

  const handleDeleteCourse = (CourseId) => {
    showLoading('Actualizando cursos. Espere un momento...')
    dispatch(deleteCourse(CourseId))

    setTimeout(() => {
      hideLoading()
    }, 1500)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const updateCourses = () => {
    showLoading('Cargando cursos. Espere un momento...')
    if (courses.length === 0) {
      coursesAPI
        .getAll(user.id)
        .then((res) => {
          const { courses } = res.data
          dispatch(saveCourses(courses))
          dispatch(saveAllStudents(courses))
          dispatch(saveAllClassesInCourses(courses))
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          hideLoading()
        })
    } else {
      hideLoading()
    }
  }

  useEffect(() => {
    updateCourses()
  }, [])

  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] relative">
      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
        onPress={toggleModal}
      >
        <Octicons name="plus" size={25} color={'white'} />
      </TouchableOpacity>

      <View className="flex flex-col gap-1">
        {courses.length > 0 && (
          <View className="flex flex-col gap-5 p-3">
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
        )}
      </View>

      {/* Área desplazable para cursos */}
      {courses.length > 0 ? (
        <ScrollView
          className="flex-1 px-2"
          showsVerticalScrollIndicator={false}
        >
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              deleteCourse={handleDeleteCourse}
            />
          ))}
        </ScrollView>
      ) : (
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
      )}

      <CourseModal
        isVisible={showModal}
        toggleModal={toggleModal}
        updateCourses={updateCourses}
      />
    </View>
  )
}

export default Courses
