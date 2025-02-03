import { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { responsesAPI } from 'api/index.api'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5, Octicons } from '@expo/vector-icons'
import profile from 'assets/profile.png'
const RankingStudent = () => {
  const navigation = useNavigation()
  const { user } = useSelector((state) => state.user)
  const [hasUserActivity, setHasUserActivity] = useState(false)
  const { userCourse } = useSelector((state) => state.student)
  const [responses, setResponses] = useState([])
  const [finalRanking, setFinalRanking] = useState([])

  const getColor = (rank) => {
    if (rank === 1) return '#FFD700'
    if (rank === 2) return '#C0C0C0'
    if (rank === 3) return '#CD7F32'
  }

  const processRanking = (responses) => {
    // Agrupar y sumar los puntajes por StudentId
    const rankingMap = new Map()

    responses.forEach(({ StudentId, User, score_total }) => {
      if (!rankingMap.has(StudentId)) {
        rankingMap.set(StudentId, {
          StudentId,
          full_name: User.full_name,
          nick_name: User.nick_name,
          email: User.email,
          profile_picture: User.profile_picture,
          totalScore: 0,
        })
      }
      rankingMap.get(StudentId).totalScore += score_total
    })

    // Convertir a array y ordenar de mayor a menor por totalScore
    const ranking = Array.from(rankingMap.values()).sort(
      (a, b) => b.totalScore - a.totalScore
    )

    // Asignar posiciones de ranking
    const finalRanking = ranking.map((student, index) => ({
      rank: index + 1,
      ...student,
    }))

    setFinalRanking(finalRanking)
  }

  useEffect(() => {
    if (responses.length > 0) {
      const hasActivity = responses.find((resp) => resp.StudentId === user.id)
      setHasUserActivity(hasActivity ? true : false)
    }
  }, [responses])

  useEffect(() => {
    responsesAPI.getAll().then((res) => {
      const { responses } = res.data
      console.log(responses)
      setResponses(responses)
      processRanking(responses)
    })
  }, [])
  return userCourse !== null ? (
    <View
      className={`flex-1 bg-[#F5F9FF] flex flex-col p-5 ${
        (!responses || responses.length == 0) && 'justify-center items-center'
      }`}
    >
      {!hasUserActivity && (
        <View className="flex flex-col w-full justify-center items-center bg-red-400">
          <LottieView
            source={emptyData}
            loop
            autoPlay
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
            Aún no has realizado actividades
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
            Completa actividades para mejorar tu desempeño y aparecer en el
            ranking. ¡Empieza ahora!
          </Text>
        </View>
      )}

      {hasUserActivity && (
        <>
          {/* Buscador */}
          <View className="w-full flex flex-row justify-between bg-white border border-gray-200 rounded-lg h-[50px] mb-5">
            <View className="w-12 flex justify-center items-center h-full">
              <Octicons name="search" size={18} color={'#202244'} />
            </View>

            <TextInput
              className="flex-1 h-full outline-none"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#888',
              }}
            />
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="flex flex-col gap-2 ">
              {finalRanking.map((rk, index) => (
                <View
                  className="flex-1 bg-white rounded-xl round relative px-3 py-5 flex flex-col justify-center items-center border border-gray-200"
                  key={index}
                >
                  <View className="w-[100px] h-[100px] rounded-full bg-[#F5F9FF] border-2 border-gray-300 relative">
                    <Image
                      source={
                        rk.profile_picture
                          ? { uri: rk.profile_picture }
                          : profile
                      }
                      className="w-full h-full absolute object-contain rounded-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="flex flex-col items-center justify-center gap-1">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 16,
                        color: '#202244',
                      }}
                    >
                      {rk.full_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 15,
                        color: '#888',
                      }}
                    >
                      {rk.totalScore} pts
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: 'Jost_700Bold',
                      fontSize: 16,
                    }}
                    className="absolute top-2 right-2"
                  >
                    # {rk.rank}
                  </Text>
                  {rk.rank >= 1 && rk.rank <= 3 && (
                    <FontAwesome5
                      name="medal"
                      size={30}
                      className="absolute top-2 left-2"
                      color={getColor(rk.rank)}
                    />
                  )}
                </View>
                // Foto
              ))}
            </View>
          </ScrollView>
        </>
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

export default RankingStudent
