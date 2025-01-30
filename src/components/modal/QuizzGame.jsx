import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import bg from 'assets/bg-tech.jpg'
import { useEffect, useRef, useState } from 'react'
import { notificationUtils } from 'utils/index.utils'
import { activitiesAPI } from 'api/index.api'
import { Octicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import Results from '../results/Results'
import { storageUtil } from 'utils/index.utils'
import { quizzResponseAPI } from 'api/index.api'
import { useDispatch } from 'react-redux'
import { saveAcitiviTyId, saveUserAnswers } from '../../redux/slices/gameSlice'

const QuizzGame = ({
  showQuizzGame,
  toggleQuizzGame,
  activity_id,
  showResults,
}) => {
  const dispatch = useDispatch()
  // Sonidos del juego
  const [soundCorrect, setSoundCorrrect] = useState(null)
  const [soundIncorrect, setSoundIncorrrect] = useState(null)
  const [soundBeep, setSoundBeep] = useState(null)
  const [soundStart, setSoundStart] = useState(null)

  const [mounted, setMounted] = useState(false)

  const boxColors = ['#A70808', '#130DB2', '#CBA715', '#1BA81B']

  const [isSelected, setIsSelected] = useState(false)
  const [indexCorrect, setIndexCorrect] = useState(null)
  const [isCorrectResponsed, setIsCorrectResponsed] = useState(false)

  const [quizz, setQuizz] = useState(null)
  const [question, setQuestion] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [counter, setCounter] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [countDown, setCountDown] = useState(10)
  const [startCountDown, setStartCountDown] = useState(false)

  // Mensaje de respueta correcta o incorrecta
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const [startMessage, setStartMessage] = useState('')
  const [showStartMessage, setShowStartMessage] = useState(false)

  const intervalRef = useRef(null)
  const intervalCountDown = useRef(null)

  const [showModalResult, setShowModalResults] = useState(false)

  const [userAnswers, setUserAnswers] = useState([])

  const loadSounds = async () => {
    const { sound: sound_correct } = await Audio.Sound.createAsync(
      require('../../../assets/correct.mp3')
    )
    setSoundCorrrect(sound_correct)

    const { sound: sound_incorrect } = await Audio.Sound.createAsync(
      require('../../../assets/incorrect.mp3')
    )
    setSoundIncorrrect(sound_incorrect)

    const { sound: sound_beep } = await Audio.Sound.createAsync(
      require('../../../assets/beep.mp3')
    )
    setSoundBeep(sound_beep)

    const { sound: sound_start } = await Audio.Sound.createAsync(
      require('../../../assets/start.mp3')
    )
    setSoundStart(sound_start)
  }

  const playSoundCorrect = async () => {
    if (soundCorrect) {
      setTimeout(async () => {
        await soundCorrect.replayAsync()
      }, 100)
    }
  }

  const playSoundIncorrect = async () => {
    if (soundIncorrect) {
      setTimeout(async () => {
        await soundIncorrect.replayAsync()
      }, 100)
    }
  }

  const playSoundBeep = async () => {
    if (soundBeep) {
      setTimeout(async () => {
        await soundBeep.replayAsync()
      }, 100)
    }
  }

  const playSoundStart = async () => {
    if (soundStart) {
      setTimeout(async () => {
        await soundStart.replayAsync()
      }, 100)
    }
  }

  const releaseSounds = async () => {
    if (soundCorrect) {
      await soundCorrect.unloadAsync()
    }

    if (soundIncorrect) {
      await soundIncorrect.unloadAsync()
    }
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const calculateScore = (question, time_taken) => {
    const { time_limit, score } = question
    const timeRemaining = time_limit - time_taken

    const finalScore = Math.round(
      Math.max(0, score * (timeRemaining / time_limit))
    )
    setCurrentScore(finalScore)
    setTotalScore((prev) => prev + finalScore)
    return finalScore
  }

  const selectOption = (id) => {
    stopTimer() // Detener el temporizador al seleccionar una opción
    if (isSelected) return
    setIsSelected(true)

    const timeTaken = question.time_limit - counter

    if (id !== null) {
      const option = question.Options.find((opt) => opt.id === id)
      if (option.isCorrect) {
        setIndexCorrect(option.id)
        setIsCorrectResponsed(true)
        playSoundCorrect()

        const scoreObtained = calculateScore(question, timeTaken)

        setUserAnswers((prev) => [
          ...prev,
          {
            question: question.question,
            user_response: option.option,
            correct_response: option.option,
            time_taken: timeTaken,
            score_total: question.score,
            score_obtained: scoreObtained,
            feedback: question.feedback,
          },
        ])
      } else {
        const optionCorrect = question.Options.find((opt) => opt.isCorrect)
        setIndexCorrect(optionCorrect.id)
        setIsCorrectResponsed(false)
        setCurrentScore(0)
        playSoundIncorrect()

        const timeTaken = question.time_limit - counter

        setUserAnswers((prev) => [
          ...prev,
          {
            question: question.question,
            user_response: option.option,
            correct_response: optionCorrect.option,
            time_taken: timeTaken,
            time_limit: question.time_limit,
            score_total: question.score,
            score_obtained: 0,
            feedback: question.feedback,
          },
        ])
      }
    } else {
      const optionCorrect = question.Options.find((opt) => opt.isCorrect)
      setIndexCorrect(optionCorrect.id)
      setIsCorrectResponsed(false)
      setCurrentScore(0)
      playSoundIncorrect()

      setUserAnswers((prev) => [
        ...prev,
        {
          question: question.question,
          user_response: null,
          correct_response: optionCorrect.option,
          time_taken: timeTaken,
          time_limit: question.time_limit,
          score_total: question.score,
          score_obtained: 0,
          feedback: question.feedback,
        },
      ])
    }

    setShowMessage(true)
  }

  const boxOptions = (item, index) => {
    return (
      <TouchableOpacity
        className="w-[48%] h-24 rounded-lg flex justify-center items-center mb-4 relative px-3"
        style={{
          backgroundColor: isSelected
            ? indexCorrect === item.id
              ? 'green'
              : 'red'
            : boxColors[index],
        }}
        onPress={() => {
          if (!isSelected) {
            selectOption(item.id)
          }
        }}
      >
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 12,
            color: 'white',
            textAlign: 'center',
          }}
        >
          {item.option}
        </Text>

        {isSelected && (
          <View
            className={`absolute w-7 h-7 rounded-full -top-2 -left-2 flex justify-center items-center ${
              indexCorrect === item.id ? 'bg-[#166534]' : 'bg-[#b91c1c]'
            }`}
          >
            {indexCorrect === item.id ? (
              <Octicons name="check" size={15} color={'white'} />
            ) : (
              <Octicons name="x" size={17} className="text-red-950" />
            )}
          </View>
        )}
      </TouchableOpacity>
    )
  }

  const saveStudentActivity = async () => {
    const res = await storageUtil.getSecureData('session_info')
    const { user } = await JSON.parse(res)
    const data = {
      ActivityId: activity_id,
      StudentId: user.id,
      quizzResponses: userAnswers,
    }
    quizzResponseAPI
      .register(data)
      .then((res) => {
        dispatch(saveUserAnswers(userAnswers))
        dispatch(saveAcitiviTyId(activity_id))
        closeQuizzGame()
      })
      .catch((err) => {
        console.log('Error')
      })
  }

  const nextQuestion = () => {
    if (currentIndex + 1 < quizz.Questions.length) {
      setIsSelected(false)
      setShowMessage(false)
      setIsCorrectResponsed(false)
      setCurrentScore(0)
      setIndexCorrect(null)
      setCurrentIndex((prev) => prev + 1)
    } else {
      saveStudentActivity()
    }
  }

  const closeQuizzGame = () => {
    setShowModalResults(false)
    setIsSelected(false)
    setShowMessage(false)
    setIsCorrectResponsed(false)
    setCurrentScore(0)
    setIndexCorrect(null)
    setCurrentIndex(0)
    setUserAnswers([])
    setMounted(false)
    setTotalScore(0)
    setCountDown(10)
    setStartCountDown(false)
    setShowStartMessage(false)
    intervalRef.current = null
    showResults()
  }

  const stopCountDown = () => {
    if (intervalCountDown.current) {
      clearInterval(intervalCountDown.current)
      intervalCountDown.current = null
    }
  }

  useEffect(() => {
    if (startCountDown) {
      intervalCountDown.current = setInterval(() => {
        setCountDown((prev) => {
          if (prev > 0) {
            playSoundBeep()

            if (prev === 4) {
              setShowStartMessage(true)
              setStartMessage(
                '¡Estamos a punto de comenzar! Prepara todo para esta experiencia.'
              )
            }
            if (prev === 3)
              setStartMessage(
                'Es momento de enfocarte, ¡aléjate de cualquier distracción!'
              )

            if (prev === 2)
              setStartMessage(
                '¡Cuenta regresiva iniciada! Ajusta tus últimos detalles.'
              )

            if (prev === 1)
              setStartMessage(
                'Respira profundo, concéntrate, y prepárate para dar lo mejor de ti.'
              )

            return prev - 1
          } else {
            stopCountDown()
            playSoundStart()
            setStartMessage('¡Comienza ahora!')
            setMounted(true)
            return 0
          }
        })
      }, 1000)
    }

    return () => stopCountDown()
  }, [startCountDown])

  useEffect(() => {
    if (showMessage) {
      const response = isCorrectResponsed
        ? notificationUtils.getCorrectMessage()
        : notificationUtils.getIncorrectMessage()
      setMessage(response)
    } else {
      setMessage(null)
    }
  }, [showMessage])

  useEffect(() => {
    if (mounted) {
      if (question) {
        setCounter(question.time_limit) // Reiniciar el contador con el límite de tiempo de la pregunta actual

        intervalRef.current = setInterval(() => {
          setCounter((prev) => {
            if (prev > 1) return prev - 1
            stopTimer()
            selectOption(null) // Si el tiempo termina y no seleccionaron nada
            return 0
          })
        }, 1000)
      }
    }

    return () => stopTimer() // Limpiar el temporizador al cambiar la pregunta o desmontar el componente
  }, [question, mounted])

  useEffect(() => {
    if (quizz) {
      setQuestion(quizz.Questions[currentIndex]) // Cambiar a la nueva pregunta según el índice actual
      setIsSelected(false)
      setIndexCorrect(null)
      setIsCorrectResponsed(false)
      setCurrentScore(0)
    }
  }, [currentIndex, quizz])

  useEffect(() => {
    if (activity_id) {
      activitiesAPI
        .getById(activity_id)
        .then((res) => {
          const { activity } = res.data
          setQuizz(activity)
        })
        .catch((err) => console.log(err.message))
    }
  }, [activity_id])

  useEffect(() => {
    loadSounds()
    return () => {
      releaseSounds()
    }
  }, [])

  return (
    <Modal
      visible={showQuizzGame}
      onRequestClose={toggleQuizzGame}
      animationType="fade"
      transparent={true}
    >
      <View className="flex-1 bg-[#F5F9FF] relative">
        <Image
          source={bg}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
        {question && mounted ? (
          <View className="p-5">
            <View className="flex flex-row items-center justify-between">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 21,
                  color: 'white',
                }}
              >
                Quizz Code
              </Text>
              <View className="w-8 h-8 rounded-full bg-white justify-center items-center">
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#741D1D',
                  }}
                >
                  {counter}
                </Text>
              </View>
            </View>

            <View className="flex flex-col mt-10">
              <View className="mb-10 flex flex-row justify-between items-center">
                <Text
                  style={{
                    fontFamily: 'Jost_700Bold',
                    fontSize: 18,
                    color: 'white',
                  }}
                >
                  {currentIndex + 1}/{quizz.Questions.length}
                </Text>
                {isSelected && (
                  <Text
                    style={{
                      fontFamily: 'Jost_700Bold',
                      fontSize: 18,
                      color: isCorrectResponsed ? 'green' : 'red',
                    }}
                  >
                    {isCorrectResponsed ? `+${currentScore}` : 0}
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: 'Jost_700Bold',
                    fontSize: 18,
                    color: 'white',
                  }}
                >
                  {totalScore} pts
                </Text>
              </View>
              <View className="w-full h-[180px] bg-white rounded-lg border border-gray-200 flex justify-center items-center px-3">
                <Text
                  style={{
                    fontFamily: 'Jost_700Bold',
                    fontSize: 17,
                    color: '#202244',
                    textAlign: 'center',
                  }}
                >
                  {question.question}
                </Text>
              </View>
              <View className="flex flex-row flex-wrap justify-between mt-5">
                {question.Options.map((item, index) => boxOptions(item, index))}
              </View>

              {/* Mensaje */}
              {showMessage && (
                <View className="mt-12 flex flex-col">
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 16,
                      color: 'white',
                      marginBottom: 20,
                      textAlign: 'center',
                    }}
                    className="text-wrap"
                  >
                    {message}
                  </Text>

                  <TouchableOpacity
                    className="w-full bg-white/80 py-3 flex justify-center items-center"
                    onPress={nextQuestion}
                  >
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 15,
                        color: '#202244',
                      }}
                    >
                      Continuar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center flex flex-col gap-5 px-4 relative">
            <View className="w-[250px] h-[250px] rounded-full bg-white flex justify-center items-center border-2 border-gray-200">
              <Text
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 150,
                  color: '#202244',
                }}
              >
                {countDown}
              </Text>
            </View>

            {!startCountDown && (
              <View className="flex flex-col w-full mt-10">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 18,
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Puedes iniciar cuando desees. ¡Tómate tu tiempo!
                </Text>

                <TouchableOpacity
                  className="w-full py-4 flex flex-row items-center justify-center bg-[#741D1D] rounded-full mt-10"
                  onPress={() => setStartCountDown(true)}
                >
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    Iniciar
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {showStartMessage && (
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 16,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {startMessage}
              </Text>
            )}
          </View>
        )}
      </View>
    </Modal>
  )
}

export default QuizzGame
