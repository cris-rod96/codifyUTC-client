import React, { use, useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native'
import { useSelector } from 'react-redux'
import { coursesAPI, classesAPI } from 'api/index.api'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import {
  AccessCodeModal,
  LeaveCourseModal,
} from 'components/modal/index.modals'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import bgTech from 'assets/bg-tech.jpg'
import ContentTopicModal from 'components/modal/ContentTopicModal'
import { useNavigation } from '@react-navigation/native'
import WelcomeCourseModal from 'components/modal/WelcomeCourseModal'
import { lectureUtils } from 'utils/index.utils'

const ClassStudent = () => {
  const [refreshingCourse, setRefreshingCourse] = useState(false)

  const navigation = useNavigation()
  const { user } = useSelector((state) => state.user)
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false)
  const [showLeaveCourseModal, setShowLeaveCourseModal] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [accessCode, setAccessCode] = useState(null)
  const [courseId, setCourseId] = useState(null)

  const toggleWelcomeModal = () => setShowWelcomeModal((prev) => !prev)

  const [currentTopic, setCurrentTopic] = useState('')
  const [currentTopicContent, setCurrentTopicContent] = useState('')

  const viewTopic = (titleTopic, contentTopic) => {
    toggleShowContentModal()
    setCurrentTopic(titleTopic)
    setCurrentTopicContent(contentTopic)
  }

  const [showContentModal, setShowContentModal] = useState(false)
  const toggleShowContentModal = () => setShowContentModal((prev) => !prev)

  const toggleAccessCodeModal = (course_id = null) => {
    setCourseId(course_id)
    setShowAccessCodeModal((prev) => !prev)
  }

  const toggleLeaveCourseModal = () => {
    fetchCourses()
    setShowLeaveCourseModal((prev) => !prev)
  }

  const onContinue = () => {
    setUserCourse(null)
    setClasses([])
  }

  const [courses, setCourses] = useState([])
  const [userCourse, setUserCourse] = useState(null)
  const [classes, setClasses] = useState([])

  const fetchClasses = () => {
    setRefreshingCourse(true)
    classesAPI
      .getByCourse(userCourse.id)
      .then((res) => {
        const { classes } = res.data
        setClasses(classes)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setRefreshingCourse(false))
  }

  const fetchCourses = () => {
    coursesAPI
      .getAllWithStudents()
      .then((res) => {
        const { courses: allCourses } = res.data
        setCourses(allCourses)
        const enrolledCourse = allCourses.find((course) =>
          course.Students.some((student) => student.id === user.id)
        )
        setUserCourse(enrolledCourse === undefined ? null : enrolledCourse)
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => setRefreshingCourse(false))
  }

  const onRefreshCourse = useCallback(() => {
    if (userCourse) {
      fetchClasses()
    } else {
      fetchCourses()
    }
  }, [userCourse])

  useEffect(() => {
    if (userCourse) {
      fetchClasses()
    } else {
      fetchCourses()
    }
  }, [userCourse])

  useEffect(() => {
    onRefreshCourse()
  }, [user.id])

  const renderCourse = ({ item }) => {
    return (
      <View className="px-5 py-5" key={item.id}>
        <View className="bg-white w-full rounded-lg overflow-hidden border border-gray-200">
          {/* Portada */}
          <View className="w-full h-[180px] relative ">
            <Image
              source={item.poster ? { uri: item.poster } : bgTech}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
            />
          </View>

          {/* Body del curso */}
          <View className="flex flex-row px-4 py-3 items-center justify-between">
            <View className="flex flex-col">
              <Text
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 12,
                  color: '#202244',
                }}
              >
                {item.semester} Sistemas
              </Text>
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 17,
                  color: '#202244',
                }}
              >
                {item.subject}
              </Text>
            </View>

            <Octicons name="lock" size={20} color={'#202244'} />
          </View>
          {/* Footer */}
          <TouchableOpacity
            className="w-full py-2 flex flex-row gap-2 items-center justify-center"
            onPress={() => toggleAccessCodeModal(item.id)}
          >
            <Octicons name="unlock" size={18} color={'#741D1D'} />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#741D1D',
                textAlign: 'center',
              }}
            >
              Desbloquear
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const updateClasses = () => {
    setShowWelcomeModal(false)
    fetchCourses()
  }

  const renderTopic = (topic, index) => {
    return (
      <View className="py-5 px-7 flex flex-row items-center justify-between border-b border-gray-200">
        <View className="w-10 h-10 rounded-full bg-[#741D1D] flex justify-center items-center">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 14,
              color: 'white',
            }}
          >
            {index + 1}
          </Text>
        </View>

        {/* Titulo y minutos de lectura */}
        <View className="flex-1 flex flex-col pl-4">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: '#202244',
            }}
          >
            {topic.title}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#545454',
            }}
          >
            {lectureUtils.estimateReadingTime(topic.content)} Mins
          </Text>
        </View>
      </View>
    )
  }

  const renderClass = ({ item }) => {
    return (
      <View className="bg-white border border-gray-200">
        {/* Cabecera */}
        <View className="flex flex-row items-start justify-between px-5 pt-5 ">
          <View className="flex flex-col ">
            <View className="flex flex-row gap-1 items-center">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                }}
              >
                Clase 01 -{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#741D1D',
                }}
              >
                {item.topic}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Mulish_800ExtraBold',
                fontSize: 12,
                color: '#741D1D',
              }}
            >
              {lectureUtils.getTotalEstimatedReadingTime(item)} Mins
            </Text>
          </View>

          <TouchableOpacity
            className="flex flex-row items-center gap-1"
            onPress={() => viewClass(item.id, item.topic)}
          >
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: '#202244',
              }}
            >
              Ver
            </Text>
            <Octicons name="chevron-right" size={17} color={'#202244'} />
          </TouchableOpacity>
        </View>

        {/* Topics */}
        {item.Topics && item.Topics.length > 0 ? (
          item.Topics.map((topic, index) => renderTopic(topic, index))
        ) : (
          <View>
            <Text>No hay contenido</Text>
          </View>
        )}
      </View>
    )
  }

  const successRegister = () => {
    toggleAccessCodeModal()
    toggleWelcomeModal()
  }

  const viewClass = (class_id, class_name) => {
    navigation.navigate('DetailClass', {
      class_id: class_id,
      class_name: class_name,
    })
  }

  return userCourse === null ? (
    courses.length > 0 ? (
      <View className="flex-1 flex-col bg-[#F5F9FF]">
        <WelcomeCourseModal
          isVisible={showWelcomeModal}
          updateClasses={updateClasses}
        />
        {/* Busscador */}

        {/* View */}
        <View className="mx-5 mt-3 border border-dashed border-gray-200 px-3 py-4 bg-red-800/50 rounded-lg">
          <Text
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 13,
              color: 'white',
              textAlign: 'justify',
            }}
          >
            Aún no estas inscrito en un curso. Inscríbete en uno y accede a las
            clases que tu docente ha preparado para ti.
          </Text>
        </View>

        {/* Listado de cursos */}
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourse}
          refreshControl={
            <RefreshControl
              onRefresh={onRefreshCourse}
              refreshing={refreshingCourse}
            />
          }
        />

        <AccessCodeModal
          isVisible={showAccessCodeModal}
          toggleModal={toggleAccessCodeModal}
          user_id={user.id}
          course_id={courseId}
          successRegister={successRegister}
        />
      </View>
    ) : (
      <View className="flex-1 flex justify-center items-center px-8 bg-[#F5F9FF]">
        <View className="px-3 py-5 w-full flex flex-col gap-1 justify-center items-center">
          <LottieView
            autoPlay
            loop
            source={emptyData}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
            }}
          >
            No se encontraron cursos
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
            }}
            className="text-gray-400"
          >
            No hay cursos registrados actualmente
          </Text>
        </View>
      </View>
    )
  ) : classes.length > 0 ? (
    <View className="flex flex-col bg-[#F5F9FF] flex-1 px-3 pb-10 pt-5 relative">
      <ContentTopicModal
        showContentTopicModal={showContentModal}
        toggleContentTopicModal={toggleShowContentModal}
        currentTopic={currentTopic}
        currentTopicContent={currentTopicContent}
      />

      <LeaveCourseModal
        showLeaveCourseModal={showLeaveCourseModal}
        toggleLeaveCourseModal={toggleLeaveCourseModal}
        courseId={userCourse.id}
        onContinue={onContinue}
      />

      <TouchableOpacity
        className="flex flex-row items-center justify-center py-4 gap-1 bg-black border border-gray-200 mb-5 rounded-lg"
        onPress={toggleLeaveCourseModal}
      >
        <MaterialIcons name="logout" size={18} color={'white'} />
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 16,
            color: 'white',
          }}
        >
          Abandonar curso
        </Text>
      </TouchableOpacity>

      {/* Clases */}
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={renderClass}
      />
    </View>
  ) : (
    <View className="flex-1 flex-col justify-center items-center px-6 bg-[#F5F9FF]">
      <LeaveCourseModal
        showLeaveCourseModal={showLeaveCourseModal}
        toggleLeaveCourseModal={toggleLeaveCourseModal}
        courseId={userCourse.id}
        onContinue={onContinue}
      />

      <View className="flex flex-col gap-1">
        <LottieView
          loop
          autoPlay
          source={emptyData}
          style={{
            width: 250,
            height: 250,
          }}
        />
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: '#202244',
            textAlign: 'center',
          }}
        >
          No se encontraron clases
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            color: '#545454',
            textAlign: 'center',
          }}
        >
          El curso actualmente no tiene clases
        </Text>

        <TouchableOpacity
          className="mt-10 py-4 bg-[#741D1D] rounded-full relative flex flex-row items-center justify-center"
          onPress={toggleLeaveCourseModal}
        >
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
              textAlign: 'center',
            }}
          >
            Abandonar curso
          </Text>
          <Octicons
            name="chevron-right"
            size={20}
            color={'white'}
            className="absolute right-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ClassStudent
