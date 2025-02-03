import { Image, ScrollView, Text, View } from 'react-native'
import logoApp from 'assets/logo_codify.png'
import profile from 'assets/profile.png'
import { useEffect, useLayoutEffect, useState } from 'react'
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
  const [userId, setUserId] = useState(null)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userId) {
      coursesAPI.getAll(user.id).then((res) => {
        const { courses } = res.data
        dispatch(saveCourses(courses))
        dispatch(saveAllClassesInCourses(courses))
        dispatch(saveAllStudents(courses))
      })
    }
  }, [userId])

  useFocusEffect(() => {
    setUserId(user.id)
  })

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-3 py-3  border-b border-gray-200 bg-[#741D1D]">
        {/* Logo e info */}
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

      <ScrollView
        className="flex-1 bg-[#F5F9FF]"
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 flex flex-col gap-8 px-4 pt-10">
          <CoursesSlide />
          <ClasseSlide />
          {/* <StudentsSlide /> */}
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
