import { Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import questionPoster from 'assets/question_poster.jpg'

const Feedback = ({ route }) => {
  const [userAnswers, setUserAnswers] = useState([])

  useEffect(() => {
    if (route.params) {
      const { userAnswers } = route.params
      setUserAnswers(userAnswers)
    }
  }, [route.params])

  return userAnswers && userAnswers.length > 0 ? (
    <View className="flex flex-1 flex-col px-2 pt-5 bg-[#F5F9FF]">
      <Text
        style={{
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
          color: '#202244',
          textAlign: 'center',
        }}
      >
        Quizz Code
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      >
        <View className="flex-1 flex-col w-full mt-10">
          {userAnswers.map((answer, index) => (
            <View
              className="bg-white border border-gray-200 rounded-lg mb-3"
              key={index}
            >
              {/* Queestion */}
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

              {/* Body */}
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

                {/* Feedback */}
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
      </ScrollView>
    </View>
  ) : (
    <View>
      <Text>No hay nada que mostrar</Text>
    </View>
  )
}

export default Feedback
