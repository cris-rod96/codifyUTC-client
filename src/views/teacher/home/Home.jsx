import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import profile from 'assets/profile.png'
import { storageUtil } from 'utils/index.utils'
import {
  ActivitiesSlide,
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
const Home = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Obtener todos los datos relacionados al Docente
  // Cursos
  // Clases
  // Actividades

  // Si entra a cursos mostrar todos los cursos
  // Si entra a un determinado curso mostrar las clases y los estudiantes que pertenecen a ese curso

  useEffect(() => {
    storageUtil
      .getSecureData('user_info')
      .then((res) => {
        if (res) {
          const data = JSON.parse(res)
          const { courses, classes, activities } = data.user
          dispatch(saveCourses(courses))
          dispatch(saveClasses(classes))
          dispatch(saveActivities(activities))
          setUser(data.user)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading message={'Cargando información'} />
  }

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
        <ActivitiesSlide />
      </View>
    </ScrollView>
  )
}

export default Home
