import React, { use, useEffect, useState } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Alert,
  StatusBar,
} from 'react-native'
import { useSelector } from 'react-redux'
import { coursesAPI, classesAPI } from 'api/index.api'
import { Octicons } from '@expo/vector-icons'
import {
  AccessCodeModal,
  LeaveCourseModal,
  ByeModal,
} from 'components/modal/index.modals'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'

const ClassStudent = ({ navigation }) => {
  const { user } = useSelector((state) => state.user)
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false)
  const [showLeaveCourseModal, setShowLeaveCourseModal] = useState(false)
  const [accessCode, setAccessCode] = useState(null)
  const [courseId, setCourseId] = useState(null)

  const toggleAccessCodeModal = (access_code = null, course_id = null) => {
    if (!showAccessCodeModal) {
      setAccessCode(access_code)
      setCourseId(course_id)
    }
    setShowAccessCodeModal((prev) => !prev)
  }

  const toggleLeaveCourseModal = () => setShowLeaveCourseModal((prev) => !prev)

  // Método para abandonar el curso
  const leaveCourse = () => {}

  const [courses, setCourses] = useState([])
  const [userCourse, setUserCourse] = useState(null)
  const [classes, setClasses] = useState([])

  useEffect(() => {
    if (userCourse) {
      classesAPI
        .getByCourse(userCourse.id)
        .then((res) => {
          const { classes } = res.data
          setClasses(classes)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userCourse])

  useEffect(() => {
    coursesAPI
      .getAllWithStudents()
      .then((res) => {
        const { courses: allCourses } = res.data
        setCourses(allCourses)
        const enrolledCourse = allCourses.find((course) =>
          course.Students.some((student) => student.id === user.id)
        )
        setUserCourse(enrolledCourse)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [user.id])

  const renderCourse = ({ item }) => {
    // const isBlocked = !userCourses.some((course) => course.id == item.id)
    return (
      <TouchableOpacity
        className={`w-full bg-white rounded-xl overflow-hidden border border-gray-200 mb-5 relative`}
        onPress={() => toggleAccessCodeModal(item.access_code, item.id)}
      >
        {/* Portada */}
        <View className="relative w-full h-[200px]">
          <Image
            source={{ uri: item.poster }}
            className="w-full h-full object-contain"
          />
        </View>
        <View className="px-5 py-3 flex flex-row items-center justify-between">
          <View className="flex flex-col">
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: '#741D1D',
              }}
            >
              {item.semester} Sistemas
            </Text>
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#202244',
              }}
            >
              {item.subject}
            </Text>
          </View>
          <Octicons name="lock" size={21} color={'#202244'} />
        </View>
      </TouchableOpacity>
    )
  }

  const renderClass = ({ item }) => {}
  return (
    <View className="flex-1 px-3 py-5">
      <StatusBar backgroundColor={'#741D1D'} barStyle={'light-content'} />
      {userCourse ? (
        classes.length > 0 ? (
          <View>
            <Text>Hay clases</Text>
          </View>
        ) : (
          <View className="flex flex-1 justify-center items-center px-3">
            <View className="px-5 py-6  rounded-xl flex flex-col justify-center items-center">
              <LottieView
                autoPlay
                loop
                source={emptyData}
                style={{ width: 200, height: 200 }}
              />
              <View className="flex flex-row gap-1">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: '#202244',
                  }}
                >
                  El curso
                </Text>
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: '#202244',
                  }}
                >
                  {userCourse.subject}
                  actualmente no tiene clases
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 15,
                  color: '#B4BDC4',
                  textAlign: 'center',
                }}
              >
                Consulta con tu docente o estate al pendiente de las
                actualizaciones vía email.
              </Text>
            </View>
            <TouchableOpacity
              className="w-[200px] py-3 mt-5 bg-[#741D1D] flex flex-row gap-2 justify-center items-center rounded-full"
              onPress={toggleLeaveCourseModal}
            >
              <Octicons name="sign-out" size={21} color={'white'} />
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: 'white',
                }}
              >
                Abandonar Curso
              </Text>
            </TouchableOpacity>

            <LeaveCourseModal
              showLeaveCourseModal={showLeaveCourseModal}
              toggleLeaveCourseModal={toggleLeaveCourseModal}
              courseId={userCourse.id}
            />
          </View>
        )
      ) : (
        <View className="flex flex-col">
          {/* Mostrar mensaje de no curso encontrado */}
          <View className="bg-[#741D1D]/70 px-3 py-5 border border-dashed border-gray-200 rounded-xl flex justify-center items-center mb-5">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 14,
                color: 'white',
              }}
            >
              Sin clases ni cursos registrados
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_400Regular',
                fontSize: 12,
                color: '#E8F1FF',
              }}
            >
              Accede a un curso para ver su contenido.
            </Text>
          </View>

          {/* Buscador */}
          <View className="bg-white w-full h-[50px] rounded-xl border border-gray-200 flex flex-row">
            <View className="w-12 h-full flex justify-center items-center">
              <Octicons name="search" size={20} color={'#202244'} />
            </View>
            <TextInput
              className="w-full px-2 placeholder:text-md placeholder:text-[#B4BDC4]"
              placeholder="Desarrollo Web"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
              }}
            />
          </View>

          <View>
            <View className="flex flex-row gap-2 items-center justify-center py-5">
              <Octicons name="stack" size={20} />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 18,
                  color: '#202244',
                }}
              >
                Cursos Disponibles
              </Text>
              <Octicons name="stack" size={20} />
            </View>
            {/* Lista de cursos */}
            <FlatList
              data={courses}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={renderCourse}
            />
          </View>

          <AccessCodeModal
            isVisible={showAccessCodeModal}
            toggleModal={toggleAccessCodeModal}
            access_code={accessCode}
            user_id={user.id}
            course_id={courseId}
          />
        </View>
      )}
      {/* <Text className="text-xl font-bold mb-4">
        {userCourses.length > 0
          ? 'Tus clases'
          : 'No estás registrado en ningún curso. Ver opciones:'}
      </Text>

       
      */}
    </View>
  )
}

export default ClassStudent
