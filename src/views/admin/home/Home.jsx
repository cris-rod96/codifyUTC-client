import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import logoApp from 'assets/logo_codify.png'
import profile from 'assets/profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { storageUtil } from 'utils/index.utils'
import { saveCourses, saveUsers } from '../../../redux/slices/admin.slice'
import { useEffect, useState, useCallback } from 'react'
import SlideUsers from '../slides/SlideUsers'
import SlideCourses from '../slides/SlideCourses'
import { adminApi } from 'api/index.api'
import { Octicons } from '@expo/vector-icons'

const Home = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = useCallback(async () => {
    setRefreshing(true)
    try {
      const sessionData = await storageUtil.getSecureData('session_info')
      if (sessionData) {
        const { token } = JSON.parse(sessionData)
        const res = await adminApi.getUsers(token)
        dispatch(saveUsers(res.data.users))
        const resCourses = await adminApi.getCourses(token)
        dispatch(saveCourses(resCourses.data.courses))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setRefreshing(false)
    }
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <View className="flex-1 bg-[#F5F9FF] relative">
      <TouchableOpacity
        className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
        onPress={fetchData}
      >
        <Octicons name="sync" size={20} color={'white'} />
      </TouchableOpacity>

      {/* Header */}
      <View className="flex flex-row items-center justify-between p-3 border-b border-gray-200 bg-[#741D1D]">
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
        <View className="w-[45px] h-[45px] rounded-full bg-white overflow-hidden">
          <Image
            source={
              user?.profile_picture ? { uri: user.profile_picture } : profile
            }
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Body */}
      <ScrollView
        className="flex-1 bg-[#F5F9FF]"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <View className="flex flex-1 flex-col gap-8 px-6 pt-5">
          <SlideUsers />
          <SlideCourses />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
