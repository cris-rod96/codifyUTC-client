import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import logoApp from 'assets/logo_codify.png'
import profile from 'assets/profile.png'
import { NewsSlide } from 'components/slides/index.slides'
import { storageUtil } from 'utils/index.utils'
import { saveUser } from 'redux/slices/user.slice'
import { activitiesAPI, courseStudentsAPI } from 'api/index.api'
import { saveUserCourse } from 'redux/slices/student.slice'
import StudentRanking from 'components/ranking/StudentRanking'
import CurrentActivities from 'components/current-activities/CurrentActivities'

const Home = ({ route }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { userCourse } = useSelector((state) => state.student)

  useEffect(() => {
    if (!user) {
      // Evita cargar desde storage si el usuario ya está en Redux
      storageUtil
        .getSecureData('session_info')
        .then((res) => {
          if (res) {
            const { user } = JSON.parse(res)
            dispatch(saveUser(user))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [dispatch, user])

  useEffect(() => {
    if (user && !userCourse) {
      // Evita repetir la petición si el curso ya está en Redux
      const { id } = user
      courseStudentsAPI
        .getByStudent(id)
        .then((res) => {
          const { course } = res.data
          dispatch(saveUserCourse(course))
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    }
  }, [dispatch, user, userCourse])

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      {/* Header */}
      <View className="flex flex-row items-center justify-between p-3 border-b border-gray-200 bg-[#741D1D]">
        {/* Logo e Info */}
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
              {user?.full_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#F5F9FF',
              }}
            >
              {user?.role}
            </Text>
          </View>
        </View>

        <View className="w-[45px] h-[45px] rounded-full bg-white relative overflow-hidden">
          <Image
            source={
              user?.profile_picture ? { uri: user?.profile_picture } : profile
            }
            className="w-full h-full object-contain"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Body */}

      <ScrollView
        className="flex-1 bg-[#F5F9FF]"
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-1 flex-col gap-8 px-6 pt-5">
          <NewsSlide />
          <StudentRanking />
          <CurrentActivities />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
