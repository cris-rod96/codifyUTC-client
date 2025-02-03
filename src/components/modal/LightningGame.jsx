import {
  Animated,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Audio } from 'expo-av'
import bg from 'assets/bg-tech.jpg'
import { useEffect, useRef, useState } from 'react'
import html5 from 'assets/html-5.png'
import js from 'assets/js.png'
import python from 'assets/python.png'
import java from 'assets/java.png'
import { notificationUtils, storageUtil } from '../../utils/index.utils'
import Countdown from '../countdown/Countdown'
import { Octicons } from '@expo/vector-icons'
import Results from '../results/Results'
import { useDispatch } from 'react-redux'
import { activitiesAPI, lightningResponseAPI } from 'api/index.api'
import { saveAcitiviTyId, saveUserAnswers } from '../../redux/slices/gameSlice'

const LightningGame = ({
  showLightningGame,
  toggleLightningGame,
  activity_id,
  showResults,
}) => {
  const dispatch = useDispatch()
  // Sonidos del juego
  const [soundCorrect, setSoundCorrect] = useState(null)
  const [soundIncorrect, setSoundIncorrect] = useState(null)
  const [soundBeep, setSoundBeep] = useState(false)
  const [soundStart, setSoundStart] = useState(false)

  const [mounted, setMounted] = useState(false)

  const boxColors = ['#A70808', '#130DB2', '#CBA715', '#1BA81B']

  const [isSelected, setIsSelected] = useState(false)
  const [indexCorrect, setIndexCorrect] = useState(null)
  const [isCorrectResponsed, setIsCorrectResponsed] = useState(false)

  const [lightning, setLightning] = useState(null)
  const [question, setQuestion] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [counter, setCounter] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [countDown, setCountDown] = useState(5)
  const [startCountDown, setStartCountDown] = useState(false)

  const [message, setMessage] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const [startMessage, setStartMessage] = useState('')
  const [showStartMessage, setShowStartMessage] = useState(false)

  const intervalRef = useRef(null)
  const intervalCountDown = useRef(null)

  const [showModalResults, setShowModalResults] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])

  const loadSounds = async () => {
    const { sound: sound_correct } = await Audio.Sound.createAsync(
      require('../../../assets/correct.mp3')
    )
    setSoundCorrect(sound_correct)

    const { sound: sound_incorrect } = await Audio.Sound.createAsync(
      require('../../../assets/incorrect.mp3')
    )
    setSoundIncorrect(sound_incorrect)

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

    if (soundBeep) {
      await soundBeep.unloadAsync()
    }

    if (soundStart) {
      await soundStart.unloadAsync()
    }
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
            fontSize: 14,
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

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const saveStudentActivity = async () => {
    const res = await storageUtil.getSecureData('session_info')
    const { user } = await JSON.parse(res)

    const data = {
      ActivityId: activity_id,
      StudentId: user.id,
      lightningResponses: userAnswers,
    }
    lightningResponseAPI
      .register(data)
      .then((res) => {
        dispatch(saveUserAnswers(userAnswers))
        dispatch(saveAcitiviTyId(activity_id))
        closeLightningGame()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const calculateScore = (question, timeTaken) => {
    const { time_limit, score } = question
    const timeRemaining = time_limit - timeTaken

    const finalScore = Math.round(
      Math.max(0, score * (timeRemaining / time_limit))
    )
    setCurrentScore(finalScore)
    setTotalScore((prev) => prev + finalScore)
    return finalScore
  }

  const selectOption = (id) => {
    stopTimer()
    if (isSelected) return
    setIsSelected(true)

    const timeTaken = question.time_limit - counter
    if (id !== null) {
      const option = question.OptionsLightning.find((opt) => opt.id === id)
      if (option.isCorrect) {
        setIndexCorrect(option.id)
        setIsCorrectResponsed(true)
        playSoundCorrect()

        const scoreObtained = calculateScore(question, timeTaken)

        setUserAnswers((prev) => [
          ...prev,
          {
            question: question.question,
            code: question.code,
            user_response: option.option,
            correct_response: option.option,
            time_taken: timeTaken,
            score_total: question.score,
            score_obtained: scoreObtained,
            feedback: question.feedback,
          },
        ])
      } else {
        const optionCorrect = question.OptionsLightning.find(
          (data) => data.isCorrect
        )
        setIndexCorrect(optionCorrect.id)
        setIsCorrectResponsed(false)
        setCurrentScore(0)
        playSoundIncorrect()

        const timeTaken = question.time_limit - counter
        setUserAnswers((prev) => [
          ...prev,
          {
            question: question.question,
            code: question.code,
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
      const optionCorrect = question.OptionsLightning.find(
        (data) => data.isCorrect
      )
      setIndexCorrect(optionCorrect.id)
      setIsCorrectResponsed(false)
      setCurrentScore(0)
      playSoundIncorrect()

      setUserAnswers((prev) => [
        ...prev,
        {
          question: question.question,
          code: question.code,
          user_response: null,
          correct_response: optionCorrect.option,
          time_taken: 0,
          time_limit: question.time_limit,
          score_total: question.score,
          score_obtained: 0,
          feedback: question.feedback,
        },
      ])
    }
    setShowMessage(true)
  }

  const nextQuestion = () => {
    if (currentIndex + 1 < lightning.QuestionsLightning.length) {
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

  const closeLightningGame = () => {
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
        setCounter(question.time_limit)
        intervalRef.current = setInterval(() => {
          setCounter((prev) => {
            if (prev > 1) return prev - 1
            stopTimer()
            selectOption(null)
            return 0
          })
        }, 1000)
      }
    }
    return () => stopTimer()
  }, [question, mounted])

  useEffect(() => {
    if (lightning) {
      setQuestion(lightning.QuestionsLightning[currentIndex])
      setIsSelected(false)
      setIndexCorrect(null)
      setIsCorrectResponsed(false)
      setCurrentScore(0)
    }
  }, [currentIndex, lightning])

  useEffect(() => {
    if (activity_id) {
      activitiesAPI
        .getLightningById(activity_id)
        .then((res) => {
          const { activity } = res.data
          console.log(activity)
          setLightning(activity)
        })
        .catch((err) => console.log(err.message))
    }
  }, [activity_id])

  useEffect(() => {
    loadSounds()
    return () => releaseSounds()
  }, [])

  return (
    <Modal
      visible={showLightningGame}
      transparent={false}
      onRequestClose={toggleLightningGame}
      animationType="fade"
    >
      <View className="flex-1 bg-[#F5F9FF]">
        <View className="flex-1 relative">
          <Image source={bg} className="absolute w-full h-full object-cover" />

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
                  Lightning Code
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
                <View className="mb-5 flex flex-row justify-between items-center">
                  <Text
                    style={{
                      fontFamily: 'Jost_700Bold',
                      fontSize: 18,
                      color: 'white',
                    }}
                  >
                    {currentIndex + 1}/{lightning.QuestionsLightning.length}
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

                <View className="w-full h-[50px] flex justify-center items-center px-3">
                  <Text
                    style={{
                      fontFamily: 'Jost_700Bold',
                      fontSize: 17,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {question.question}
                  </Text>
                </View>

                {/* Codigo */}
                <View className="w-full h-[160px] mt-5 px-8 py-2 rounded-lg bg-[#282C34]">
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 14,
                      color: '#F5F9FF',
                    }}
                  >
                    {question.code}
                  </Text>
                </View>

                <View className="flex flex-row flex-wrap justify-between mt-5">
                  {question.OptionsLightning.map((item, index) =>
                    boxOptions(item, index)
                  )}
                </View>

                {showMessage && (
                  <View className="mt-8 flex flex-col">
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 16,
                        color: 'white',
                        marginBottom: 20,
                        textAlign: 'center',
                      }}
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
      </View>
    </Modal>
  )
}

export default LightningGame
