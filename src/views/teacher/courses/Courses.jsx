import { Octicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { CourseCard } from 'components/cards/index.cards'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import CourseModal from 'components/modal/CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { saveCourses } from 'redux/slices/teacher.slice'
import { coursesAPI } from 'api/index.api'

const Courses = ({ route }) => {
  const { user } = useSelector((state) => state.user)
  const { courses } = useSelector((state) => state.teacher)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const onContinue = () => {
    fetchCourses()
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const fetchCourses = () => {
    coursesAPI
      .getAll(user.id)
      .then((res) => {
        const { courses } = res.data
        dispatch(saveCourses(courses))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] relative">
      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
        onPress={toggleModal}
      >
        <Octicons name="plus" size={25} color={'white'} />
      </TouchableOpacity>

      <View className="flex flex-col gap-1">
        {courses.length > 0 && (
          <View className="flex flex-col gap-5 px-3 py-5">
            {/* Buscador */}
            <View className="flex flex-row items-center bg-white border border-gray-200 shadow-lg shadow-gray-300 h-[45px]">
              <View className="w-12 h-full flex items-center justify-center">
                <Octicons name="search" size={20} color={'#202244'} />
              </View>
              <TextInput
                placeholder="Buscar curso"
                className="bg-transparent flex-1"
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 13,
                  color: '#B4BDC4',
                }}
              />
            </View>
          </View>
        )}
      </View>

      {/* Área desplazable para cursos */}
      {courses.length > 0 ? (
        <ScrollView
          className="flex-1 px-3"
          showsVerticalScrollIndicator={false}
        >
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onContinue={onContinue}
            />
          ))}
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

      <CourseModal
        isVisible={showModal}
        toggleModal={toggleModal}
        onContinue={onContinue}
      />
    </View>
  )
}

export default Courses
