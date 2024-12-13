import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import profile from 'assets/profile.png'
import { storageUtil } from 'utils/index.utils'
import {
  StudentSlide,
  ClasseSlide,
  CoursesSlide,
} from 'components/slides/index.slides'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveActivities,
  saveClasses,
  saveCourses,
} from 'redux/slices/teacher.slice'
import Loading from '../../../components/loading/Loading'
import {
  saveAllClassesInCourses,
  saveAllStudents,
} from '../../../redux/slices/teacher.slice'
import { coursesAPI } from '../../../api/courses/courses.api'
const Home = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)

  // Obtener todos los datos relacionados al Docente
  // Cursos
  // Clases
  // Actividades

  // Si entra a cursos mostrar todos los cursos
  // Si entra a un determinado curso mostrar las clases y los estudiantes que pertenecen a ese curso

  useEffect(() => {
    setIsLoading(true)
    // Obtener los cursos del docente
    const { id } = user
    coursesAPI
      .getAll(id)
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
        setIsLoading(false)
      })
  }, [])

  return isLoading ? (
    <Loading message={'Cargando información'} />
  ) : (
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
        <StudentSlide />
      </View>
    </ScrollView>
  )
}

export default Home
