import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import profile from 'assets/profile.png'
import {
  StudentsSlide,
  ClasseSlide,
  CoursesSlide,
} from 'components/slides/index.slides'
import { useDispatch, useSelector } from 'react-redux'
import { saveCourses } from 'redux/slices/teacher.slice'
import {
  saveAllClassesInCourses,
  saveAllStudents,
} from 'redux/slices/teacher.slice'
import { coursesAPI } from 'api/index.api.js'
import { useLoading } from 'context/LoadingContext'
import { storageUtil } from '../../../utils/index.utils'
const Home = () => {
  const { user } = useSelector((state) => state.user)
  const { showLoading, hideLoading } = useLoading()
  const dispatch = useDispatch()

  // const getUserInfo = () => {
  //   storageUtil
  //     .getSecureData('session_info')
  //     .then((res) => {
  //       const { user } = JSON.parse(res)
  //       setUser(user)
  //     })
  //     .catch((err) => {
  //       console.log(err.message)
  //     })
  // }

  useEffect(() => {
    showLoading('Cargando datos de la cuenta. Espera un momento...')
    if (user) {
      coursesAPI
        .getAll(user.id)
        .then((res) => {
          const { courses } = res.data
          dispatch(saveCourses(courses))
          // dispatch(saveAllStudents(courses))
          dispatch(saveAllClassesInCourses(courses))
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          hideLoading()
        })
    }
  }, [])

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 flex-col h-screen gap-10 p-5 bg-[#F5F9FF] ">
        {/* Encabezado */}
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Hola, {user?.full_name}
            </Text>

            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#545454',
              }}
            >
              Bienvenido a Codify UTC
            </Text>
          </View>

          <View className="w-12 h-12 rounded-full bg-red-400 relative overflow-hidden">
            <Image
              source={
                user?.profile_picture ? { uri: user.profile_picture } : profile
              }
              className="absolute w-full h-full object-cover"
            />
          </View>
        </View>

        {/* Sección de cursos */}
        <CoursesSlide />

        {/* Sección de clases */}
        <ClasseSlide />
        {/* Sección de Actividades */}
        <StudentsSlide />
      </View>
    </ScrollView>
  )
}

export default Home
