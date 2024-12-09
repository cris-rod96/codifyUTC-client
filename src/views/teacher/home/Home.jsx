import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import profile from '../../../../assets/profile.png'
import { storageUtil } from '../../../utils/index.utils'
import CoursesSlide from '../../../components/slides/courses/CoursesSlide'
import {
  ActivitiesSlide,
  ClasseSlide,
} from '../../../components/slides/index.slides'
import { useDispatch, useSelector } from 'react-redux'
import { saveCourses } from '../../../redux/slices/teacher.slice'
const Home = () => {
  const { courses } = useSelector((state) => state.teacher)
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

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
          console.log(data)
          const { courses } = data.user
          dispatch(saveCourses(courses))
          setUser(data.user)
        }
      })
      .catch((err) => {
        console.log(err)
      })
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
        <CoursesSlide courses={courses} />

        {/* Sección de clases */}
        <ClasseSlide classes={[]} />
        {/* Sección de Actividades */}
        <ActivitiesSlide activities={[]} />
      </View>
    </ScrollView>
  )
}

export default Home
