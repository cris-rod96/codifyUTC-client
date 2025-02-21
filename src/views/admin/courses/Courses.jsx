import { Octicons } from '@expo/vector-icons'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import { useState } from 'react'
import { CourseModal } from 'components/modal/index.modals'
import { storageUtil } from '../../../utils/index.utils'
import { adminApi } from 'api/index.api'
import { saveCourses } from '../../../redux/slices/admin.slice'
import logoDefault from 'assets/bg-tech.jpg'
import { coursesAPI } from 'api/index.api'

const Courses = () => {
  const { courses, users } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const [showCourseModal, setShowCourseModal] = useState(false)
  const toggleShowCourseModal = () => setShowCourseModal((prev) => !prev)

  const deleteCourse = async (id) => {
    const sessionData = await storageUtil.getSecureData('session_info')
    const { token } = JSON.parse(sessionData)
    const res = await coursesAPI.deleteCourse(id, token)
    if (res.data.code === 200) {
      onRefresh()
    }
  }

  const getTeacherName = (id) => {
    const teacher = users.find((usr) => usr.id === id)
    return teacher.full_name
  }

  const onRefresh = async () => {
    const sessionData = await storageUtil.getSecureData('session_info')
    if (sessionData) {
      const { token } = JSON.parse(sessionData)
      const resCourses = await adminApi.getCourses(token)
      console.log(resCourses.data.courses)
      dispatch(saveCourses(resCourses.data.courses))
    }
  }

  const onCourseAdded = () => {
    onRefresh()
  }

  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] relative">
      <View className="flex flex-col gap-2 absolute bottom-4 right-2">
        <TouchableOpacity
          className="w-12 h-12 bg-[#440b0b] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
          onPress={toggleShowCourseModal}
        >
          <Octicons name="plus" size={20} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
          onPress={onRefresh}
        >
          <Octicons name="sync" size={20} color={'white'} />
        </TouchableOpacity>
      </View>

      {courses && courses.length > 0 ? (
        <ScrollView
          className="flex-1 px-3 pt-5 pb-20"
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col gap-5">
            {courses.map((course) => (
              <View
                key={course.id}
                className="w-full bg-white rounded-lg shadow-lg overflow-hidden relative"
              >
                {/* Foto del curso */}
                <View className="w-full h-[180px] relative mb-3">
                  <Image
                    source={
                      course.poster ? { uri: course.poster } : logoDefault
                    }
                    className="w-full h-full absolute object-cover"
                    resizeMode="cover"
                  />
                </View>

                {/* INformacion */}
                <View className="flex flex-col px-3 pb-5">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                      color: '#202244',
                    }}
                  >
                    {course.subject}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 14,
                      color: '#202244',
                    }}
                  >
                    {course.section}
                  </Text>
                  <View className="mt-2 flex flex-row items-center gap-1">
                    <Text
                      style={{
                        fontFamily: 'Jost_700Bold',
                        fontSize: 14,
                        color: '#202244',
                      }}
                    >
                      Docente:
                    </Text>
                    {course.TeacherId ? (
                      <Text
                        style={{
                          fontFamily: 'Mulish_600SemiBold',
                          fontSize: 13,
                          color: '#202244',
                        }}
                      >
                        {getTeacherName(course.TeacherId)}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: 'Mulish_700Bold',
                          fontSize: 13,
                          color: '#741D1D',
                        }}
                      >
                        No asignado
                      </Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  className="py-3 flex flex-row items-center justify-center bg-[#741D1D]"
                  onPress={() => deleteCourse(course.id)}
                >
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    Elminar curso
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
            Aún no hay cursos
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
            Para actualizar la vista, haz click en el botón
          </Text>
        </View>
      )}

      <CourseModal
        isVisible={showCourseModal}
        toggleModal={toggleShowCourseModal}
        onCourseAdded={onCourseAdded}
      />
    </View>
  )
}

export default Courses
