import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, ScrollView, View, TextInput } from 'react-native'
import Course from '../../../components/cards/Course'
import LottieView from 'lottie-react-native'
import emptyData from '../../../../assets/no-data.json'
import CourseModal from '../../../components/modal/CourseModal'
import { useCourseModal } from '../../../context/CourseModalContext'
import { coursesAPI } from '../../../api/courses/courses.api'
import { storageUtil } from '../../../utils/index.utils'
import { useDispatch, useSelector } from 'react-redux'
import { saveCourses } from '../../../redux/slices/teacher.slice'

const Courses = () => {
  const { isVisible, toggleModal } = useCourseModal()
  const dispatch = useDispatch()
  const { courses } = useSelector((state) => state.teacher)

  // useEffect(() => {
  //   storageUtil
  //     .getSecureData('user_info')
  //     .then((res) => {
  //       if (res) {
  //         const { user } = JSON.parse(res)
  //         coursesAPI
  //           .getAll(user.id)
  //           .then((res) => {
  //             const { code, courses: allCourses } = res.data
  //             dispatch(saveCourses(allCourses))
  //           })
  //           .catch((err) => console.log(err))
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }, [isVisible])

  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] px-5 py-5">
      {/* Mostrar barra de búsqueda solo si hay cursos */}
      {courses.length > 0 && (
        <View className="flex flex-col gap-5">
          {/* Buscador */}
          <View className="flex flex-row items-center bg-white rounded-3xl border border-gray-200 shadow-lg shadow-gray-300">
            <View className="w-10 h-10 flex items-center justify-center">
              <Ionicons name="search" size={20} color={'#DCDCDC'} />
            </View>
            <TextInput
              placeholder="Buscar curso"
              className="bg-transparent py-5 flex-1"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 16,
                color: '#B4BDC4',
              }}
            />
          </View>
        </View>
      )}

      {/* Área desplazable para cursos */}
      {courses.length > 0 ? (
        <ScrollView className="flex-1 mt-5">
          {courses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
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

      <CourseModal isVisible={isVisible} toggleModal={toggleModal} />
    </View>
  )
}

export default Courses
