import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import QuizzGame from '../../../components/modal/QuizzGame'
import LightningGame from '../../../components/modal/LightningGame'
import PuzzleMasterGame from '../../../components/modal/PuzzleMasterGame'
import { useSelector } from 'react-redux'
import {
  classesAPI,
  coursesAPI,
  activitiesAPI,
  responsesAPI,
  quizzResponseAPI,
} from 'api/index.api'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import { Entypo, FontAwesome, Octicons } from '@expo/vector-icons'
import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import brainLogo from 'assets/brain.png'
import puzzleLogo from 'assets/puzzle.png'
import poster from 'assets/game-default.png'
import { dateUtils } from 'utils/index.utils'
import Results from '../../../components/results/Results'
import { lightningResponseAPI } from '../../../api/index.api'

const Activities = () => {
  const { user } = useSelector((state) => state.user)
  const { userCourse } = useSelector((state) => state.student)
  const { quizzResponses } = useSelector((state) => state.game)
  const [refresh, setRefresh] = useState(false)
  // const [userCourse, setUserCourse] = useState(null)
  const [classes, setClasses] = useState([])
  const [activities, setActivities] = useState([])
  const [responses, setResponses] = useState([])
  const navigation = useNavigation()
  const [showQuizzGame, setShowQuizzGame] = useState(false)
  const [showLightningGame, setShowLightningGame] = useState(false)
  const [activityId, setActivityId] = useState(null)

  const [showResultsModal, setShowResultsModal] = useState(false)
  const toggleShowResultsModal = () => setShowResultsModal((prev) => !prev)

  const onReturn = () => {
    toggleShowResultsModal()
    setRefresh((prev) => !prev)
  }

  const toggleQuizzGame = () => setShowQuizzGame((prev) => !prev)
  const toggleLightningGame = () => setShowLightningGame((prev) => !prev)

  const getLogo = (type) => {
    switch (type) {
      case 'Quizz Code':
        return quizzLogo
      case 'Lightning Code':
        return lightningLogo
      case 'Brain Boost':
        return brainLogo
      case 'Puzzle Master':
        return puzzleLogo
    }
  }

  const startGame = (type, activity_id) => {
    setActivityId(activity_id)
    if (type === 'Quizz Code') {
      toggleQuizzGame()
    }
    if (type === 'Lightning Code') {
      toggleLightningGame()
    }
  }
  const showResults = () => {
    setShowQuizzGame(false)
    setShowLightningGame(false)
    // toggleQuizzGame()
    setTimeout(() => {
      setShowResultsModal(true)
    }, 2000)
  }

  const viewQuizzResponses = (id) => {
    const response = responses.find((resp) => resp.ActivityId === id)
    quizzResponseAPI
      .getByResponse(response.id)
      .then((res) => {
        const { quizzResponses } = res.data
        navigation.navigate('Feedback', {
          userAnswers: quizzResponses,
          activityId: id,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const viewLightningResponses = (id) => {
    const response = responses.find((resp) => resp.ActivityId === id)
    lightningResponseAPI
      .getByResponse(response.id)
      .then((res) => {
        const { lightningResponses } = res.data
        navigation.navigate('LCFeedback', {
          userAnswers: lightningResponses,
          activityId: id,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const viewResponses = (type, id) => {
    if (type === 'Quizz Code') {
      viewQuizzResponses(id)
    }

    if (type === 'Lightning Code') {
      viewLightningResponses(id)
    }
  }

  const renderActivity = (activity) => {
    return (
      <View
        className="bg-white border border-gray-200 rounded-lg"
        key={activity.id}
      >
        {/* Portada */}
        <View className="w-full h-[180px] bg-gray-800 rounded-t-lg relative">
          <Image
            source={activity.poster ? { uri: activity.poster } : poster}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
            className="rounded-t-lg"
          />

          <Image
            source={getLogo(activity.type)}
            className="absolute w-[35px] h-[35px] top-3 right-5"
          />
          {responses.find((res) => res.ActivityId === activity.id) ? (
            <View className="px-3 py-1 absolute w-[80px] bottom-3 rounded-full flex flex-row items-center justify-center right-3 bg-[#008B07]">
              <Text
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 10,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                Realizado
              </Text>
            </View>
          ) : (
            <View
              className="px-3 py-1 absolute w-[60px] bottom-3 rounded-full flex flex-row items-center justify-center right-3"
              style={{
                backgroundColor:
                  activity.status === 'Abierta' ? '#008B07' : '#B10303',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 10,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {activity.status}
              </Text>
            </View>
          )}
        </View>

        {/* Descripcion de la actividad */}
        <View className="flex flex-col px-3 py-5 gap-2">
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 18,
              color: '#202244',
            }}
          >
            {activity.type}
          </Text>

          <View className="flex flex-row gap-2 justify-between items-center">
            <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
              <Entypo name="game-controller" size={24} />
              <View className="flex flex-row items-center gap-1">
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {activity.activities_count} juegos
                </Text>
              </View>
            </View>
            <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
              <Entypo name="trophy" size={24} />
              <View className="flex flex-row items-center gap-1">
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {activity.total_score} pts
                </Text>
              </View>
            </View>
            <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
              <FontAwesome name="hourglass-half" size={24} />

              <View className="flex flex-row items-center gap-1">
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {activity.total_time} segs
                </Text>
              </View>
            </View>
          </View>
        </View>

        {responses.find((res) => res.ActivityId === activity.id) ? (
          <TouchableOpacity
            className="py-3 w-full rounded-b-lg bg-green-800 flex flex-row items-center justify-center relative"
            onPress={() => viewResponses(activity.type, activity.id)}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: 'white',
              }}
            >
              Ver detalle
            </Text>
            <Octicons
              name="chevron-right"
              size={18}
              color={'white'}
              className="absolute right-5"
            />
          </TouchableOpacity>
        ) : (
          <>
            <View className="flex flex-row items-center gap-2 mb-4 px-3">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                }}
              >
                Disponible hasta:
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 13,
                  color: '#202244',
                }}
              >
                {activity.due_date}
              </Text>
            </View>
            <TouchableOpacity
              className="py-3 w-full rounded-b-lg bg-[#741D1D] flex flex-row items-center justify-center relative"
              onPress={() => startGame(activity.type, activity.id)}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: 'white',
                }}
              >
                Realizar
              </Text>
              <Octicons
                name="chevron-right"
                size={18}
                color={'white'}
                className="absolute right-5"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    )
  }

  useEffect(() => {
    responsesAPI
      .getByStudent(user.id)
      .then((res) => {
        const { responses } = res.data
        setResponses(responses)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {})
  }, [activities])

  useEffect(() => {
    const fetchAllActivities = async () => {
      if (classes.length > 0) {
        try {
          const classIds = classes.map((cls) => cls.id)
          const activitiesResponse = await Promise.all(
            classIds.map((id) =>
              activitiesAPI.getByClass(id).then((res) => res.data.activities)
            )
          )

          const allActivities = activitiesResponse.flat()
          setActivities(allActivities)
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchAllActivities()
  }, [classes])

  useEffect(() => {
    if (userCourse !== null) {
      classesAPI
        .getByCourse(userCourse.Course.id)
        .then((res) => {
          const { classes } = res.data
          setClasses(classes)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userCourse, refresh])

  return userCourse !== null ? (
    <View className="flex flex-1 bg-[#F5F9FF]">
      {activities && activities.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col p-5">
            {/* Buscador */}
            <View className="flex flex-row justify-between bg-white border border-gray-200 rounded-lg h-[45px]">
              {/* Icono */}
              <View className="w-12 flex justify-center items-center h-full">
                <Octicons name="search" size={18} color={'#202244'} />
              </View>

              {/* Input */}
              <TextInput
                className="flex-1 h-full outline-none"
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                }}
              />

              <View className="w-12 h-full p-2 flex justify-center items-center">
                <TouchableOpacity className="bg-[#741D1D] p-2 rounded-lg">
                  <Entypo name="sound-mix" size={16} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Actividades */}
            <View className="flex flex-col mt-5 gap-3">
              {activities.map((act) => renderActivity(act))}
            </View>
          </View>
          <QuizzGame
            showQuizzGame={showQuizzGame}
            toggleQuizzGame={toggleQuizzGame}
            activity_id={activityId}
            showResults={showResults}
          />
          <LightningGame
            showLightningGame={showLightningGame}
            toggleLightningGame={toggleLightningGame}
            activity_id={activityId}
            showResults={showResults}
          />
          <Results
            visible={showResultsModal}
            onClose={toggleShowResultsModal}
            userAnswers={quizzResponses}
            onReturn={onReturn}
            activityId={activityId}
          />
        </ScrollView>
      ) : (
        <View className="px-5 flex-1 justify-center items-center flex-col">
          <View className=" w-full flex flex-col justify-center items-center">
            <LottieView
              source={emptyData}
              autoPlay
              loop
              style={{
                width: 300,
                height: 300,
              }}
            />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Sin Actividades
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 16,
                color: '#888888',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              Actualmente el curso no cuenta con actividades disponibles
            </Text>
          </View>
        </View>
      )}
    </View>
  ) : (
    <View className="px-5 flex-1 justify-center items-center flex-col bg-[#F5F9FF]">
      <View className="w-full flex flex-col justify-center items-center">
        <LottieView
          source={emptyData}
          autoPlay
          loop
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
          }}
        >
          Aún no estás inscrito en un curso
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 16,
            color: '#888888',
            textAlign: 'center',
            marginTop: 5,
          }}
        >
          Inscríbete en un curso para acceder a todas las actividades y empezar
          a aprender. ¡No te quedes fuera!
        </Text>

        <TouchableOpacity
          className="w-full py-4 flex flex-row items-center justify-center bg-[#741D1D] mt-5 rounded-full"
          onPress={() => navigation.navigate('ClassStudent')}
        >
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
            }}
          >
            Ir a cursos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Activities
