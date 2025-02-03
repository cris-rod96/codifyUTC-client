import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import rankingAnimation from 'assets/podium.json'
import { responsesAPI } from 'api/index.api'
import { useSelector } from 'react-redux'

const StudentRanking = () => {
  const { user } = useSelector((state) => state.user)
  const [responses, setResponses] = useState([])
  const [ranking, setRanking] = useState([])
  const [userRank, setUserRank] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResponses()
  }, [])

  const fetchResponses = () => {
    setLoading(true)
    responsesAPI
      .getAll()
      .then((res) => {
        const { responses } = res.data
        setResponses(responses)
        processRanking(responses)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const processRanking = (responses) => {
    if (!responses.length) return
    // Agrupar puntuaciones por usuario
    const scoresMap = responses.reduce((acc, response) => {
      const { StudentId, score_total } = response
      acc[StudentId] = (acc[StudentId] || 0) + score_total
      return acc
    }, {})

    // Convertir a un array y ordenar descendentemente
    const sortedRanking = Object.entries(scoresMap)
      .map(([StudentId, totalScore]) => ({ StudentId, totalScore }))
      .sort((a, b) => b.totalScore - a.totalScore)

    // Asignar posiciones en el ranking
    const finalRanking = sortedRanking.map((item, index) => ({
      rank: index + 1,
      rankTotal: `${index + 1} de ${sortedRanking.length}`,
      ...item,
    }))

    setRanking(finalRanking)
    // Buscar la posición del usuario en el ranking
    const userPosition = finalRanking.find((item) => item.StudentId === user.id)
    setUserRank(userPosition || null)
  }

  return (
    <View className="flex flex-col gap-3 w-full mb-4">
      <View className="flex flex-row items-center w-full justify-between">
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
          className="flex flex-row items-center justify-center"
          onPress={fetchResponses}
        >
          <MaterialIcons name="refresh" size={20} color={'#202244'} />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col justify-center items-center px-5 rounded-lg bg-white pb-5 h-[250px]">
        {loading ? (
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: '#202244',
            }}
          >
            Actualizando ranking...
          </Text>
        ) : responses.length > 0 ? (
          userRank ? (
            <>
              <LottieView
                source={rankingAnimation}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 20,
                  color: '#202244',
                  marginTop: 10,
                }}
              >
                Estás en la posición {userRank.rankTotal}
              </Text>
            </>
          ) : (
            <Text
              style={{
                fontFamily: 'Jost_400Regular',
                fontSize: 16,
                textAlign: 'center',
                color: '#202244',
              }}
            >
              Aún no has realizado ninguna actividad. ¡Empieza ahora!
            </Text>
          )
        ) : (
          <Text
            style={{
              fontFamily: 'Jost_400Regular',
              color: '#202244',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            ¡Aún no hay datos en el ranking! Participa en actividades, acumula
            puntos y compite por los primeros lugares. ¡Empieza ahora y alcanza
            la cima! 🚀
          </Text>
        )}
      </View>
    </View>
  )
}

export default StudentRanking
