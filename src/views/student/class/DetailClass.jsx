import { useEffect, useLayoutEffect, useState } from 'react'
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  topicsAPI,
  activitiesAPI,
  responsesAPI,
  quizzResponseAPI,
} from 'api/index.api'
import { Entypo, FontAwesome, Octicons } from '@expo/vector-icons'
import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import brainLogo from 'assets/brain.png'
import puzzleLogo from 'assets/puzzle.png'
import poster from 'assets/game-default.png'
import { dateUtils } from 'utils/index.utils'
import QuizzGame from '../../../components/modal/QuizzGame'
import { useSelector } from 'react-redux'
import { lightningResponseAPI } from '../../../api/index.api'

const DetailClass = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.user)
  const [showQuizzGame, setShowQuizzGame] = useState(false)
  const [activityId, setActivityId] = useState(null)
  const [responses, setResponses] = useState([])
  const toggleShowQuizzGame = () => setShowQuizzGame((prev) => !prev)

  const startGame = (type, activity_id) => {
    setActivityId(activity_id)
    if (type === 'Quizz Code') {
      toggleShowQuizzGame()
    }
  }

  const [classId, setClassId] = useState(null)
  const [topics, setTopics] = useState([])
  const [activities, setActivities] = useState([])

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

  const openExternalResource = (url) => {
    Linking.openURL(url).catch((err) => {
      console.log('Error al abrir el enlace: ', err)
    })
  }

  const viewQuizzResponses = (id) => {
    const response = responses.find((resp) => resp.ActivityId === id)
    quizzResponseAPI
      .getByResponse(response.id)
      .then((res) => {
        const { quizzResponses } = res.data
        navigation.navigate('ActivitiesStudent', {
          screen: 'Feedback',
          params: {
            userAnswers: quizzResponses,
            activityId: id,
          },
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

  const renderTopic = (item, index) => (
    <View
      className="bg-white border border-gray-200  relative p-5 flex flex-col gap-3 "
      key={index}
    >
      {/* Title */}
      <Text
        style={{
          fontFamily: 'Jost_600SemiBold',
          fontSize: 16,
          color: '#202244',
        }}
      >
        {item.title}
      </Text>

      <Text
        style={{
          fontFamily: 'Mulish_400Regular',
          fontSize: 13,
          color: '#888888',
          textAlign: 'justify',
          lineHeight: 20,
        }}
      >
        {item.content}
      </Text>

      {item.external_resource && (
        <View className="flex flex-row gap-2 items-center">
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: '#888888',
            }}
          >
            Recurso externo:{' '}
          </Text>
          <TouchableOpacity
            className="flex flex-row gap-1 items-center"
            onPress={() => openExternalResource(item.external_resource)}
          >
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 13,
                color: '#741D1D',
              }}
            >
              Visitar
            </Text>
            <Octicons name="link-external" size={12} color={'#741D1D'} />
          </TouchableOpacity>
        </View>
      )}

      {/* Numerador */}

      <Text
        className="absolute bottom-2 right-3"
        style={{
          fontFamily: 'Mulish_600SemiBold',
          fontSize: 13,
          color: '#D1D1D1',
        }}
      >
        {index + 1}
      </Text>
    </View>
  )

  const renderActivity = (activity, index) => {
    return (
      <View
        className="bg-white border border-gray-200 rounded-lg mb-4"
        key={index}
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
    if (classId !== null && classId !== undefined) {
      topicsAPI
        .getByClass(classId)
        .then((res) => {
          const { topics } = res.data
          setTopics(topics)
        })
        .catch((err) => {
          console.log(err)
        })

      activitiesAPI
        .getByClass(classId)
        .then((res) => {
          const { activities } = res.data
          setActivities(activities)
        })
        .catch((err) => {
          console.log('Aqui:', err)
        })
    }
  }, [classId])

  useLayoutEffect(() => {
    const { class_name } = route.params
    navigation.setOptions({
      title: class_name,
    })
  }, [])

  useEffect(() => {
    if (route.params) {
      const { class_id } = route.params
      setClassId(class_id)
    }
  }, [route.params])
  return (
    <View className="flex-1 bg-[#F5F9FF]">
      {/* Games */}
      <QuizzGame
        showQuizzGame={showQuizzGame}
        toggleQuizzGame={toggleShowQuizzGame}
        activity_id={activityId}
      />

      {/* Mostrar contenido en forma de hojas y pdf */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex flex-col gap-2">
          {/* Contenido */}
          <View className="flex flex-col gap-1 p-5">
            {topics.map((topic, index) => renderTopic(topic, index))}
          </View>

          {/* Actividades */}
          <View className="flex flex-col gap-1">
            <View
              className="flex flex-row items-center justify-center py-3 border-y border-gray-200 bg-[#741D1D]
            "
            >
              <Octicons name="rocket" size={20} color={'white'} />
              <Text
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 18,
                  color: 'white',
                  marginHorizontal: 12,
                }}
              >
                Actividades
              </Text>
              <Octicons name="rocket" size={20} color={'white'} />
            </View>

            {activities && activities.length > 0 ? (
              <View className="px-5 py-10">
                {/* Actividad */}
                {activities.map((activity, index) =>
                  renderActivity(activity, index)
                )}
              </View>
            ) : (
              <View className="mx-5 my-3 bg-white border border-dashed border-gray-200 rounded-lg px-5 py-7 flex flex-col justify-center items-center">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: '#202244',
                    textAlign: 'center',
                  }}
                >
                  Sin actividades
                </Text>
                <Text
                  style={{
                    fontFamily: 'Mulish_600SemiBold',
                    fontSize: 14,
                    color: '#b0b0b0',
                    textAlign: 'center',
                  }}
                >
                  La clase actual no cuenta aún con actividades para realizar.
                  Mantente alerta de cualquier comunicado de tu docente.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailClass
