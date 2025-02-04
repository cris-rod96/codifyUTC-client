import {
  Image,
  ScrollView,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import logoApp from 'assets/logo_codify.png'
import profile from 'assets/profile.png'
import { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { coursesAPI } from 'api/index.api'
import {
  saveCourses,
  saveAllClassesInCourses,
  saveAllStudents,
} from 'redux/slices/teacher.slice'
import {
  CoursesSlide,
  ClasseSlide,
  StudentsSlide,
} from 'components/slides/index.slides'

const Home = ({ route }) => {
  const [mounted, setMounted] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const fetchCourses = async () => {
    if (user?.id) {
      setMounted(false)
      setRefreshing(true) // Activa la animación de refresco
      try {
        const res = await coursesAPI.getAll(user.id)
        const { courses } = res.data
        dispatch(saveCourses(courses))
        dispatch(saveAllClassesInCourses(courses))
        dispatch(saveAllStudents(courses))
      } catch (error) {
        console.error('Error al cargar los cursos:', error)
      } finally {
        setMounted(true)
        setRefreshing(false) // Finaliza la animación de refresco
      }
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [user?.id])

  useFocusEffect(
    useCallback(() => {
      fetchCourses()
    }, [])
  )

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-3 py-3 border-b border-gray-200 bg-[#741D1D]">
        <View className="flex flex-row items-center gap-1">
          <Image source={logoApp} className="w-[50px] h-[50px]" />
          <View className="flex flex-col px-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: 'white',
              }}
            >
              {user.full_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#F5F9FF',
              }}
            >
              {user.role}
            </Text>
          </View>
        </View>

        <View className="w-[45px] h-[45px] rounded-full bg-white relative overflow-hidden">
          <Image
            source={
              user?.profile_picture ? { uri: user.profile_picture } : profile
            }
            className="w-full h-full object-contain"
            resizeMode="cover"
          />
        </View>
      </View>
      {mounted ? (
        <ScrollView
          className="flex-1 bg-[#F5F9FF]"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchCourses} />
          }
        >
          <View className="flex-1 flex flex-col gap-8 px-4 pt-10">
            <CoursesSlide />
            <ClasseSlide />
            <StudentsSlide />
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 bg-[#F5F9FF] flex flex-col justify-center items-center px-10 gap-4">
          <ActivityIndicator size={'small'} color={'#741D1D'} />
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 15,
              color: '#202244',
            }}
          >
            Cargando Información...
          </Text>
        </View>
      )}
    </View>
  )
}

export default Home
