import { Ionicons, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import questionPoster from 'assets/question_poster.jpg'
import { responsesAPI } from 'api/index.api'
import profile from 'assets/profile.png'
import { useSelector } from 'react-redux'
import { RankingModal } from 'components/modal/index.modals'

const Feedback = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.user)
  const [activityId, setActivityId] = useState(null)
  const [responses, setResponses] = useState([])
  const [userAnswers, setUserAnswers] = useState([])
  const [userPosition, setUserPosition] = useState(0)
  const [userResponse, setUserResponse] = useState(null)
  const [showRankingModal, setShowRankingModal] = useState(false)
  const toggleShowRankingModal = () => setShowRankingModal((prev) => !prev)

  const medals = {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
  }

  const getMedalColor = (position) => {
    if (position === 1) return medals.gold
    if (position === 2) return medals.silver
    if (position === 3) return medals.bronze
  }

  useEffect(() => {
    if (activityId !== null) {
      responsesAPI
        .getByActivity(activityId)
        .then((res) => {
          const { responses } = res.data
          setResponses(responses)
          const index = responses.findIndex(
            (resp) => resp.StudentId === user.id
          )
          setUserPosition(index + 1)
          const response = responses[index]
          setUserResponse(response)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [activityId])

  useEffect(() => {
    if (route.params) {
      const { userAnswers, activityId } = route.params
      setUserAnswers(userAnswers)
      setActivityId(activityId)
    }
  }, [route.params])

  return userAnswers && userAnswers.length > 0 ? (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-1 flex-col px-5 pt-5 bg-[#F5F9FF]">
          {/* Ranking */}
          <View className="flex flex-col">
            {/* Encabezado */}
            <View className="flex flex-row items-center justify-between">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 18,
                  color: '#202244',
                }}
              >
                Ranking
              </Text>

              <TouchableOpacity
                className="flex flex-row items-center gap-2"
                onPress={() => navigation.navigate('RankingStudent')}
              >
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 12,
                    color: '#202244',
                  }}
                >
                  Ver completo
                </Text>
                <Octicons name="chevron-right" size={16} color={'#202244'} />
              </TouchableOpacity>
            </View>
            {/* StudentPosition */}
            <View className="w-[180px]  border border-gray-200 rounded-xl bg-white mt-5 flex flex-col items-center px-5 py-3 relative mx-auto">
              {/* Profile Image */}
              <View className="w-20 h-20 rounded-full bg-red-300 relative border-2 border-gray-400">
                <Image
                  source={
                    user.profile_picture
                      ? { uri: user.profile_picture }
                      : profile
                  }
                  resizeMode="cover"
                  className="absolute w-full h-full rounded-full"
                />
              </View>

              {/* Puntaje */}
              <Text
                className="mt-[10px]"
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 18,
                  color: '#741d1d',
                }}
              >
                {userResponse?.score_total} pts
              </Text>

              {/* Nombre */}
              <Text
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 14,
                  color: '#202244',
                  marginTop: 5,
                }}
              >
                {user.full_name.trim()}
              </Text>

              <Text
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 13,
                  color: '#888',
                }}
              >
                {user.nick_name}
              </Text>

              {/* Position */}
              <View className="w-8 h-8 rounded-full absolute -top-2 -right-2 bg-[#741D1D] flex justify-center items-center">
                <Text
                  className="text-white"
                  style={{
                    fontFamily: 'Mulish_600SemiBold',
                    fontSize: 14,
                  }}
                >
                  {userPosition}
                </Text>
              </View>

              {/* Medalla */}
              {userPosition > 0 && userPosition < 4 && (
                <Ionicons
                  name="ribbon"
                  size={30}
                  color={getMedalColor(userPosition)}
                  className="absolute -top-4 -left-2"
                />
              )}
            </View>

            {/* Primeras 3 posiciones de haberlas */}
          </View>

          <View className="flex flex-col mt-5">
            <View className="flex flex-row items-center">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 18,
                  color: '#202244',
                }}
              >
                Mis respuestas
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-col w-full mt-5">
            {userAnswers.map((answer, index) => (
              <View
                className="bg-white border border-gray-200 rounded-lg mb-3"
                key={index}
              >
                <View className="w-full h-[180px] bg-[#F5F9FF] rounded-t-lg flex justify-center items-center relative overflow-hidden">
                  <View className="w-8 h-8 absolute top-3 left-3 rounded-full bg-[#F5F9FF] z-50 flex justify-center items-center">
                    <Text
                      style={{
                        fontFamily: 'Mulish_800ExtraBold',
                        fontSize: 14,
                        color: '#202244',
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>

                  <Image
                    className="absolute w-full h-full opacity-80"
                    resizeMode="cover"
                    source={questionPoster}
                  />
                  <View className="absolute bg-black/50 w-full h-full" />
                  <Text
                    className="text-wrap"
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 17,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {answer.question}
                  </Text>

                  <Text
                    className="absolute top-3 right-4"
                    style={{
                      fontFamily: 'Mulish_800ExtraBold',
                      fontSize: 21,
                      color:
                        answer.correct_response === answer.user_response
                          ? 'green'
                          : 'red',
                    }}
                  >
                    {answer.correct_response === answer.user_response
                      ? `+${answer.score_obtained}`
                      : answer.score_obtained}
                  </Text>
                </View>

                <View className="flex flex-col px-3 py-2 items-center justify-between gap-3 mt-5">
                  <View
                    className="flex-1 w-full flex justify-center items-center h-[120px] rounded-lg relative"
                    style={{
                      backgroundColor:
                        answer.user_response === answer.correct_response
                          ? '#14532d'
                          : '#450A0A',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 14,
                        textAlign: 'center',
                        color: 'white',
                      }}
                    >
                      {answer.user_response}
                    </Text>

                    <View
                      className="w-10 h-10 rounded-full bg-green-700 absolute -top-5 right-3 flex justify-center items-center "
                      style={{
                        backgroundColor:
                          answer.user_response === answer.correct_response
                            ? '#15803d'
                            : '#7f1d1d',
                      }}
                    >
                      {answer.user_response === answer.correct_response ? (
                        <Octicons name="check" size={18} color={'white'} />
                      ) : (
                        <Octicons name="x" size={18} color={'white'} />
                      )}
                    </View>
                  </View>

                  <View
                    className="border border-dashed px-3 py-4 w-full border-gray-200 rounded-lg "
                    style={{
                      borderColor:
                        answer.user_response === answer.correct_response
                          ? '#052e16'
                          : '#fca5a5',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Jost_700Bold',
                        fontSize: 16,
                        color:
                          answer.user_response === answer.correct_response
                            ? '#052e16'
                            : '#450a0a',
                      }}
                    >
                      {answer.user_response === answer.correct_response
                        ? 'Correcto'
                        : 'Incorrecto'}
                    </Text>
                    {answer.user_response !== answer.correct_response && (
                      <Text
                        style={{
                          fontFamily: 'Mulish_600SemiBold',
                          fontSize: 14,
                          color: '#7f1d1d',
                        }}
                      >
                        La respuesta era: {answer.correct_response}
                      </Text>
                    )}

                    <Text
                      style={{
                        fontFamily: 'Mulish_800ExtraBold',
                        fontSize: 13,
                        color:
                          answer.user_response === answer.correct_response
                            ? 'green'
                            : '#741D1D',
                        marginTop: 5,
                        textAlign: 'center',
                        fontStyle: 'italic',
                      }}
                    >
                      {answer.feedback}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <RankingModal
        isVisible={showRankingModal}
        onClose={toggleShowRankingModal}
        responses={responses}
      />
    </>
  ) : (
    <View>
      <Text>No hay nada que mostrar</Text>
    </View>
  )
}

export default Feedback
