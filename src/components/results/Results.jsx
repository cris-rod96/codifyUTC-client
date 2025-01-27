import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Congrats from '../congrats/Congrats'
import LottieView from 'lottie-react-native'
import tryAgain from 'assets/0-400.json'
import progress from 'assets/400-600.json'
import goodJob from 'assets/600-800.json'
import goal from 'assets/800-999.json'
import winner from 'assets/1000.json'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Results = ({ userAnswers, toggleGame }) => {
  const navigation = useNavigation()
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [scoreTotal, setScoreTotal] = useState(0)

  const [animation, setAnimation] = useState(null)
  const [message, setMessage] = useState('')

  const goToActivities = () => {
    toggleGame()
    navigation.navigate('ActivitiesStudent')
  }

  const viewFeedBack = () => {
    navigation.navigate('ActivitiesStudent', {
      screen: 'Feedback',
      params: {
        userAnswers: userAnswers,
      },
    })
  }

  const calculatePercentage = () => {
    const percent = Math.ceil((score / scoreTotal) * 100)
    return percent
  }

  const selectAnimation = () => {
    const percent = calculatePercentage()
    if (percent >= 0 && percent < 25) {
      setAnimation(tryAgain)
      setMessage(
        'Tu puntaje fue bajo, ¡pero cada intento te acerca a ser mejor!'
      )
    }
    if (percent > 25 && percent < 50) {
      setAnimation(progress)
      setMessage(
        '¡Vas avanzando! Con un poco más de práctica, lograrás grandes cosas.'
      )
    }

    if (percent >= 50 && percent < 75) {
      setAnimation(goodJob)
      setMessage('¡Buen trabajo! Estás en el camino correcto.')
    }

    if (percent >= 75 && percent < 100) {
      setAnimation(goal)
      setMessage('¡Casi perfecto! Solo un poco más para alcanzar la cima.')
    }

    if (percent === 100) {
      setAnimation(winner)
      setMessage('¡Increíble! Eres un maestro en esto, ¡felicidades!')
    }
  }

  const calculateStatistics = () => {
    const score = userAnswers.reduce(
      (acc, answer) => acc + answer.score_obtained,
      0
    )
    const scoreTotal = userAnswers.reduce(
      (acc, answer) => acc + answer.score_total,
      0
    )
    setScore(score)
    setScoreTotal(scoreTotal)
    selectAnimation()
  }

  useEffect(() => {
    if (showResults) {
      calculateStatistics()
    }
  }, [showResults, score])

  useEffect(() => {
    setShowResults(false)
    setTimeout(() => {
      setShowResults(true)
    }, 3500)
  }, [userAnswers])

  return showResults ? (
    <View className="flex-1 flex justify-center items-center flex-col px-6">
      <View className="flex flex-col items-center mb-10 gap-1 w-full">
        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 30,
            color: 'white',
          }}
        >
          PUNTOS
        </Text>

        <View className="w-full h-[120px] border border-white/20 mt-5 flex justify-center items-center rounded-xl bg-white/20 px-2">
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 27,
              color: 'white',
            }}
          >
            {score} de {scoreTotal}
          </Text>
        </View>
      </View>
      {animation && (
        <LottieView
          autoPlay
          loop
          source={animation}
          style={{
            width: 200,
            height: 200,
          }}
        />
      )}

      <Text
        style={{
          fontFamily: 'Jost_600SemiBold',
          fontSize: 17,
          color: 'white',
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        {message}
      </Text>

      <TouchableOpacity
        className="mt-7 w-full py-3 bg-[#741D1D] rounded-lg relative flex flex-row items-center justify-center"
        onPress={() => viewFeedBack()}
      >
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
          }}
        >
          Ver respuestas
        </Text>
        <Octicons
          name="chevron-right"
          size={18}
          color={'white'}
          className="absolute right-6"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-3 w-full py-3 bg-[#741D1D] rounded-lg relative flex flex-row items-center justify-center"
        onPress={goToActivities}
      >
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
          }}
        >
          Regresar
        </Text>
        <Octicons
          name="chevron-left"
          size={18}
          color={'white'}
          className="absolute left-6"
        />
      </TouchableOpacity>
    </View>
  ) : (
    <Congrats />
  )
}

export default Results
