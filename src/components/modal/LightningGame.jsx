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
import { notificationUtils } from '../../utils/index.utils'
import Countdown from '../countdown/Countdown'
import { Octicons } from '@expo/vector-icons'
import Results from '../results/Results'

const LightningGame = ({ showLightningGame, toggleLightningGame }) => {
  const [soundCorrect, setSoundCorrect] = useState(null)
  const [soundIncorrect, setSoundIncorrect] = useState(null)
  const boxColors = ['#A70808', '#130DB2', '#CBA715', '#1BA81B']
  const [isCorrectResponsed, setIsCorrectResponsed] = useState(false)
  const [showModalResults, setShowModalResults] = useState(false)
  const [isSelected, setIsSelecteed] = useState(false)
  const [indexCorrect, setIndexCorrect] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [question, setQuestion] = useState(null)
  const [messageShown, setMessageShown] = useState(false)
  const [response, setResponse] = useState('')

  // Contadores
  const [counter, setCounter] = useState(0)
  const [duration, setDuration] = useState(0)
  const intervalRef = useRef(null)

  // Score
  const [totalScore, setTotalScore] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)

  // Monted
  const [mounted, setMounted] = useState(false)

  const getLogo = (language) => {
    switch (language) {
      case 'HTML':
        return html5
      case 'JavaScript':
        return js
      case 'Java':
        return java
      case 'Python':
        return python
    }
  }

  const loadSounds = async () => {
    const { sound: sound_correct } = await Audio.Sound.createAsync(
      require('../../../assets/correct.mp3')
    )
    setSoundCorrect(sound_correct)

    const { sound: sound_incorrect } = await Audio.Sound.createAsync(
      require('../../../assets/incorrect.mp3')
    )
    setSoundIncorrect(sound_incorrect)
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

  const releaseSounds = async () => {
    if (soundCorrect) {
      await soundCorrect.unloadAsync()
    }

    if (soundIncorrect) {
      await soundIncorrect.unloadAsync()
    }
  }

  const quizzLightning = {
    total_timee: 600,
    total_score: 1200,
    activities: [
      {
        id: 1,
        question: 'Encuentra el error en el siguiente código',
        code: "function helloWorld() { console.logger('Hola mundo'); }",
        time_limit: 30,
        score: 100,
        language: 'JavaScript',
        options: [
          { id: 1, option: 'console.log', isCorrect: true },
          { id: 2, option: 'log.console', isCorrect: false },
          { id: 3, option: 'console.script', isCorrect: false },
          { id: 4, option: 'script.console', isCorrect: false },
        ],
      },
      {
        id: 2,
        question: '¿Qué falta en este código HTML?',
        code: `<html>
  <head><title>Mi Página</title></head>
  <body>
  <h1>Hola Mundo</h1>
  </body>
  </html>`,
        time_limit: 30,
        score: 100,
        language: 'HTML',
        options: [
          { id: 1, option: 'Falta el DOCTYPE', isCorrect: true },
          { id: 2, option: 'Falta el cierre de <head>', isCorrect: false },
          { id: 3, option: 'El título está mal definido', isCorrect: false },
          { id: 4, option: 'El código es incorrecto', isCorrect: false },
        ],
      },
      {
        id: 3,
        question: '¿Qué falta en este código de Python?',
        code: `def saludo(nombre):
  print(f"Hola {nombre}")
  saludo()`,
        time_limit: 30,
        score: 100,
        language: 'Python',
        options: [
          {
            id: 1,
            option: 'Un argumento al llamar a saludo()',
            isCorrect: true,
          },
          { id: 2, option: 'Un return en la función', isCorrect: false },
          { id: 3, option: 'Un parámetro llamado self', isCorrect: false },
          { id: 4, option: 'Nada, el código está bien', isCorrect: false },
        ],
      },
      {
        id: 4,
        question: '¿Qué etiqueta es incorrecta en este fragmento de HTML?',
        code: `<div>
  <header>Encabezado</header>
  <article>Contenido</articulo>
  </div>`,
        time_limit: 20,
        score: 100,
        language: 'HTML',
        options: [
          { id: 1, option: '<article>', isCorrect: false },
          { id: 2, option: '<header>', isCorrect: false },
          { id: 3, option: '<articulo>', isCorrect: true },
          { id: 4, option: '<div>', isCorrect: false },
        ],
      },
      {
        id: 5,
        question: '¿Cuál es la salida de este código de Python?',
        code: `x = [1, 2, 3]
  y = x
  y.append(4)
  print(x)`,
        time_limit: 20,
        score: 100,
        language: 'Python',
        options: [
          { id: 1, option: '[1, 2, 3, 4]', isCorrect: true },
          { id: 2, option: '[1, 2, 3]', isCorrect: false },
          { id: 3, option: 'Error', isCorrect: false },
          { id: 4, option: '[4, 2, 3]', isCorrect: false },
        ],
      },
      {
        id: 6,
        question: '¿Cuál es la salida de este código de JavaScript?',
        code: `const x = '5';
  const y = 5;
  console.log(x == y);`,
        time_limit: 20,
        score: 100,
        language: 'JavaScript',
        options: [
          { id: 1, option: 'true', isCorrect: true },
          { id: 2, option: 'false', isCorrect: false },
          { id: 3, option: 'Error', isCorrect: false },
          { id: 4, option: 'undefined', isCorrect: false },
        ],
      },
      {
        id: 7,
        question:
          '¿Qué atributo falta para que el formulario se envíe correctamente?',
        code: `<form>
  <input type="text" name="nombre">
  <input type="submit">
  </form>`,
        time_limit: 25,
        score: 100,
        language: 'HTML',
        options: [
          { id: 1, option: 'action', isCorrect: true },
          { id: 2, option: 'method', isCorrect: false },
          { id: 3, option: 'type', isCorrect: false },
          { id: 4, option: 'id', isCorrect: false },
        ],
      },
      {
        id: 8,
        question: '¿Qué devuelve esta función en Python?',
        code: `def suma(a, b=5):
      return a + b
  print(suma(3))`,
        time_limit: 20,
        score: 100,
        language: 'Python',
        options: [
          { id: 1, option: '8', isCorrect: true },
          { id: 2, option: '5', isCorrect: false },
          { id: 3, option: 'Error', isCorrect: false },
          { id: 4, option: '3', isCorrect: false },
        ],
      },
      {
        id: 9,
        question: '¿Cuál es la salida de este código HTML?',
        code: `<p style="color: red;">Hola</p>`,
        time_limit: 15,
        score: 100,
        language: 'HTML',
        options: [
          { id: 1, option: "Texto rojo con 'Hola'", isCorrect: true },
          { id: 2, option: "Texto negro con 'Hola'", isCorrect: false },
          { id: 3, option: 'Error', isCorrect: false },
          { id: 4, option: 'Texto invisible', isCorrect: false },
        ],
      },
      {
        id: 10,
        question: '¿Qué falta para que el código sea correcto?',
        code: `let nombre = 'Juan';
  console.log('Hola ' + nombre);`,
        time_limit: 20,
        score: 100,
        language: 'JavaScript',
        options: [
          { id: 1, option: 'Nada, el código es correcto', isCorrect: true },
          { id: 2, option: "Falta un ; después de 'Juan'", isCorrect: false },
          { id: 3, option: "Falta declarar 'nombre'", isCorrect: false },
          {
            id: 4,
            option: "Falta un espacio después de 'Hola'",
            isCorrect: false,
          },
        ],
      },
    ],
  }

  const calculateScore = (activity, timeTaken) => {
    const { time_limit, score } = activity
    const timeRemaining = time_limit - timeTaken

    const finalScore = Math.round(
      Math.max(0, score * (timeRemaining / time_limit))
    )
    setCurrentScore(finalScore)
    return finalScore
  }

  const nextQuestion = () => {
    if (currentIndex + 1 < quizzLightning.activities.length) {
      setIsSelecteed(false)
      setMessageShown(false)
      setIsCorrectResponsed(false)
      setCurrentScore(0)
      setIndexCorrect(null)
      setCurrentIndex((prev) => prev + 1)
    } else {
      setShowModalResults(true)
    }
  }

  const closeLightningGame = () => {
    setShowModalResults(false)
    setIsSelecteed(false)
    setMessageShown(false)
    setIsCorrectResponsed(false)
    setCurrentScore(0)
    setIndexCorrect(null)
    setCurrentIndex(0)
    setUserAnswers([])
    setMounted(false)
    setTotalScore(0)
    intervalRef.current = null
    toggleLightningGame()
  }

  const selectOption = (id) => {
    if (isSelected) return
    setIsSelecteed(true)
    if (id !== null) {
      const option = question.options.find((data) => data.id === id)
      if (option.isCorrect) {
        setIndexCorrect(option.id)
        setIsCorrectResponsed(true)
        playSoundCorrect()

        const timeTaken = question.time_limit - counter
        const scoreForThisQuestion = calculateScore(question, timeTaken)

        setUserAnswers((prev) => [
          ...prev,
          {
            question: question.question,
            code: question.code,
            user_response: option.option,
            correct_response: option.option,
            time_taken: timeTaken,
            time_limit: question.time_limit,
            score: question.score,
            score_obtained: scoreForThisQuestion,
            // feedback: question.feedback
          },
        ])

        setTotalScore((prevScore) => prevScore + scoreForThisQuestion)
      } else {
        const optionCorrect = question.options.find((data) => data.isCorrect)
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
            score: question.score,
            score_obtained: 0,
            // feedback: question.feedback
          },
        ])
      }
    } else {
      const optionCorrect = question.options.find((data) => data.isCorrect)
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
          score: question.score,
          score_obtained: 0,
          // feedback: question.feedback
        },
      ])
    }

    stopTimer()
    setMessageShown(true)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (showLightningGame && mounted) {
      intervalRef.current = setInterval(() => {
        setCounter((prev) => {
          if (prev - 1 === 0) {
            stopTimer()
            selectOption(null)
          }
          if (prev > 0) {
            return prev - 1
          } else {
            stopTimer()
            return 0
          }
        })
      }, 1000)
    } else {
      setCounter(duration / 1000)
      stopTimer()
    }

    return () => stopTimer()
  }, [showLightningGame, mounted, question])

  useEffect(() => {
    if (messageShown) {
      const response = isCorrectResponsed
        ? notificationUtils.getCorrectMessage()
        : notificationUtils.getIncorrectMessage()

      setResponse(response)
    } else {
      setResponse(null)
    }
  }, [messageShown])

  useEffect(() => {
    setQuestion(quizzLightning.activities[currentIndex])
    if (messageShown) {
      setMessageShown(false)
    }
  }, [currentIndex])

  useEffect(() => {
    setCounter((prev) => question?.time_limit)
  }, [question])

  useEffect(() => {
    loadSounds()
    return () => {
      releaseSounds()
    }
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
          {mounted ? (
            !showModalResults ? (
              <View>
                <View className="flex flex-row items-center justify-between border-b border-purple-800 p-5">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 21,
                      color: 'white',
                    }}
                  >
                    Lightning Code
                  </Text>

                  <View
                    className="w-8 h-8 rounded-full bg-white flex justify-center items-center
              "
                  >
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

                {/* Body */}
                <View className="flex flex-col mt-6 px-5">
                  {/* Preguntas y puntaje */}
                  <View className="mb-10 flex flex-row items-center justify-between">
                    <Text
                      style={{
                        fontFamily: 'Jost_700Bold',
                        fontSize: 18,
                        color: 'white',
                      }}
                    >
                      {currentIndex + 1}/{quizzLightning?.activities.length}
                    </Text>

                    {isSelected && (
                      <Text
                        style={{
                          fontFamily: 'Jost_700Bold',
                          fontSize: 18,
                          color: isCorrectResponsed ? 'green' : 'red',
                        }}
                        className="transition-all duration-300"
                      >
                        + {currentScore}
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

                  {/* Código */}
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: 'white',
                      marginBottom: 10,
                      textAlign: 'center',
                    }}
                  >
                    {question?.question}
                  </Text>
                  <View className="w-full h-[180px] bg-black rounded-lg border border-gray-200 p-[10px] relative">
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 15,
                          color: 'white',
                        }}
                      >
                        {question?.code}
                      </Text>
                    </ScrollView>

                    <View
                      className="w-[30px] h-[30px] absolute bottom-4 right-2
                "
                    >
                      <Image
                        source={getLogo(question?.language)}
                        className="absolute w-full h-full object-contain"
                      />
                    </View>
                  </View>

                  {/* Opciones */}
                  <View className="flex flex-row flex-wrap justify-between mt-5">
                    {question?.options.map((option, index) => (
                      <TouchableOpacity
                        className="w-[48%] h-20 rounded-lg justify-center items-center mb-4 relative px-3 bg-green-800"
                        style={{
                          backgroundColor: isSelected
                            ? indexCorrect === option.id
                              ? 'green'
                              : 'red'
                            : boxColors[index],
                        }}
                        onPress={() => {
                          if (!isSelected) {
                            selectOption(option.id)
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
                          {option.option}
                        </Text>

                        {isSelected && (
                          <View
                            className={`absolute w-7 h-7 rounded-full -top-2 -left-2 flex justify-center items-center
                           ${
                             indexCorrect === option.id
                               ? 'bg-[#166534]'
                               : 'bg-[#b91c1c]'
                           }`}
                          >
                            {indexCorrect === option.id ? (
                              <Octicons
                                name="check"
                                size={15}
                                color={'white'}
                              />
                            ) : (
                              <Octicons
                                name="x"
                                size={17}
                                className="text-red-950"
                              />
                            )}
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Mensaje */}
                  {messageShown && (
                    <View className="mt-6 flex flex-col">
                      <Text
                        style={{
                          fontFamily: 'Mulish_600SemiBold',
                          fontSize: 16,
                          color: 'white',
                          marginBottom: 15,
                          textAlign: 'center',
                        }}
                      >
                        {response}
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
              <Results
                userAnswers={userAnswers}
                toggleGame={closeLightningGame}
              />
            )
          ) : (
            <Countdown mounted={mounted} setMounted={setMounted} />
          )}
        </View>
      </View>
    </Modal>
  )
}

export default LightningGame
