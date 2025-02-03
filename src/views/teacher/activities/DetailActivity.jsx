import { Octicons } from '@expo/vector-icons'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { dateUtils } from '../../../utils/index.utils'
import { responsesAPI, quizzResponseAPI } from 'api/index.api'
import { DeleteQuestionModal } from 'components/modal/index.modals'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../../config/index.config'
import { lightningResponseAPI } from '../../../api/index.api'
const DetailActivity = ({ route, navigation }) => {
  const [showQuestionDelete, setShowQuestionDelete] = useState(false)
  const toggleShowQuestionDelete = () => setShowQuestionDelete((prev) => !prev)
  const [activityId, setActivityId] = useState(null)
  const [activityType, setActivityType] = useState(null)
  const [participants, setParticipants] = useState(0)
  const [responses, setResponses] = useState([])
  const [quizzResponse, setQuizzResponse] = useState([])
  const [lightningResponse, setLightningResponse] = useState([])

  const [averageTime, setAverageTime] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [arrFeed, setArrFeed] = useState([])

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    })
  }

  const getFeedbackMessage = (percentajeHits) => {
    if (percentajeHits >= 90 && percentajeHits <= 100) {
      return {
        label: 'Excelente rendimiento',
        message:
          'Muy bien. La mayoría de tus estudiantes está respondiendo correctamente. ¡Sigue reforzando este tema en clase para mantener el nivel de comprensión alto!',
      }
    }

    if (percentajeHits >= 75 && percentajeHits < 90) {
      return {
        label: 'Buen desempeño',
        message:
          'El rendimiento es sólido, pero algunos estudiantes aún tienen dificultades con este tema. Considera dedicar más tiempo a los conceptos clave antes de continuar con otros temas.',
      }
    }

    if (percentajeHits >= 50 && percentajeHits < 75) {
      return {
        label: 'Desempeño aceptable',
        message:
          'El desempeño en esta pregunta muestra que algunos estudiantes no están completamente familiarizados con el tema. Te sugerimos repasar los conceptos clave y proporcionar ejemplos adicionales.',
      }
    }

    if (percentajeHits >= 30 && percentajeHits < 50) {
      return {
        label: 'Desempeño bajo',
        message:
          'Esta pregunta muestra que los estudiantes no tienen una comprensión sólida. Puede ser útil abordar nuevamente el concepto, utilizando diferentes métodos como ejemplos prácticos o actividades en grupo.',
      }
    }
    if (percentajeHits < 30) {
      return {
        label: 'Desempeño muy bajo',
        message:
          'Los estudiantes están teniendo grandes dificultades con esta pregunta. Tal vez sea necesario revisar los fundamentos antes de avanzar a conceptos más complejos. Considera utilizar recursos adicionales o explicaciones más detalladas.',
      }
    }
  }

  const onContinue = (confirm) => {
    if (confirm) {
      toggleShowQuestionDelete()
      showToast(
        'success',
        'Actividad eliminada',
        'Se ha eliminado esta actividad'
      )
      setTimeout(() => {
        navigation.goBack()
      }, 2500)
    } else {
      showToast(
        'error',
        'Error al eliminar',
        'No se pudo eliminar esta actividad'
      )
    }
  }
  const calculatePercentage = (hits, errors) => {
    const total = hits + errors
    const percentajeHits = Math.ceil((hits / total) * 100)
    const percentajeErrors = 100 - percentajeHits
    return percentajeHits
  }

  useEffect(() => {
    const newArrFeed = [...arrFeed] // Crear una copia de arrFeed

    lightningResponse.forEach((qzr) => {
      const { question, code, user_response, correct_response } = qzr

      // Buscar si la pregunta ya está en el array
      const existingQuestion = newArrFeed.find(
        (item) => item.question === question
      )

      if (existingQuestion) {
        // Si la pregunta ya existe, actualizamos los aciertos o errores
        if (user_response === correct_response) {
          existingQuestion.hits += 1
        } else {
          existingQuestion.errors += 1
        }
      } else {
        // Si la pregunta no existe, agregamos una nueva entrada
        newArrFeed.push({
          question,
          errors: user_response === correct_response ? 0 : 1,
          hits: user_response === correct_response ? 1 : 0,
        })
      }
    })
    // Actualizamos el estado de arrFeed con el nuevo array
    setArrFeed(newArrFeed)
  }, [lightningResponse])

  useEffect(() => {
    const newArrFeed = [...arrFeed] // Crear una copia de arrFeed

    quizzResponse.forEach((qzr) => {
      const { question, user_response, correct_response } = qzr

      // Buscar si la pregunta ya está en el array
      const existingQuestion = newArrFeed.find(
        (item) => item.question === question
      )

      if (existingQuestion) {
        // Si la pregunta ya existe, actualizamos los aciertos o errores
        if (user_response === correct_response) {
          existingQuestion.hits += 1
        } else {
          existingQuestion.errors += 1
        }
      } else {
        // Si la pregunta no existe, agregamos una nueva entrada
        newArrFeed.push({
          question,
          errors: user_response === correct_response ? 0 : 1,
          hits: user_response === correct_response ? 1 : 0,
        })
      }
    })
    // Actualizamos el estado de arrFeed con el nuevo array
    setArrFeed(newArrFeed)
  }, [quizzResponse])

  useEffect(() => {
    if (responses.length > 0) {
      const avgScoreTotal =
        responses.reduce((sum, r) => sum + r.score_total, 0) / responses.length
      const avgTimeTaken =
        responses.reduce((sum, r) => sum + r.time_taken, 0) / responses.length
      setAverageTime(avgTimeTaken)
      setAverageScore(avgScoreTotal)
      const ids = responses.map((r) => r.id)
      if (activityType === 'Quizz Code') {
        Promise.all(ids.map((id) => quizzResponseAPI.getByResponse(id))).then(
          (res) => {
            const allQuizzResponses = res.flatMap((r) => r.data.quizzResponses)
            setQuizzResponse(allQuizzResponses)
          }
        )
      }

      if (activityType === 'Lightning Code') {
        Promise.all(
          ids.map((id) => lightningResponseAPI.getByResponse(id))
        ).then((res) => {
          const allLightningResponses = res.flatMap(
            (r) => r.data.lightningResponses
          )
          setLightningResponse(allLightningResponses)
        })
      }
    }
  }, [responses])

  useEffect(() => {
    if (activityId) {
      responsesAPI.getByActivity(activityId).then((res) => {
        const { responses } = res.data
        setParticipants(responses.length)
        setResponses(responses)
      })
    }
  }, [activityId])

  useEffect(() => {
    if (route.params) {
      const { id, type } = route.params
      setActivityType(type)
      setActivityId(id)
    }
  }, [route.params])
  return arrFeed && arrFeed.length > 0 ? (
    <View className="flex-1 bg-[#F5F9FF] px-5 py-3 flex flex-col">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Boton eliminar */}
        <TouchableOpacity
          className="flex flex-row items-center gap-2 py-3 justify-center bg-[#741D1D] rounded-lg"
          onPress={toggleShowQuestionDelete}
        >
          <Octicons name="trash" size={21} color={'white'} />
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
            }}
          >
            Eliminar
          </Text>
        </TouchableOpacity>

        <View className="flex flex-col mt-5">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
            }}
          >
            Estadísticas Generales
          </Text>

          {/* Participantes */}
          <View className="w-full bg-white border border-gray-200 rounded-lg flex flex-col  justify-center items-center px-5 py-3 mt-3">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 50,
                color: '#202244',
              }}
            >
              {participants}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 23,
                color: '#888',
              }}
            >
              {participants === 1 ? 'Participante' : 'Participantes'}
            </Text>
          </View>
          <View className="w-full bg-white border border-gray-200 rounded-lg flex flex-col  justify-center items-center px-5 py-3 mt-3">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 50,
                color: '#202244',
              }}
            >
              {averageScore} pts
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 23,
                color: '#888',
              }}
            >
              Puntaje promedio
            </Text>
          </View>

          <View className="w-full bg-white border border-gray-200 rounded-lg flex flex-col  justify-center items-center px-5 py-3 mt-3">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 50,
                color: '#202244',
              }}
            >
              {averageTime} segs
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 23,
                color: '#888',
              }}
            >
              Tiempo promedio
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Feedback
          </Text>

          {/* Feedback */}
          {arrFeed.map((feed, index) => {
            const percentajeHits = calculatePercentage(feed.hits, feed.errors)
            const { message, label } = getFeedbackMessage(percentajeHits)
            return (
              <View className="flex flex-col mb-10" key={index}>
                {/* Caja de la pregunta */}
                <View className="bg-black/80 w-full border border-black rounded-lg px-3 h-[150px] mb-3 flex justify-center items-center">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 21,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {feed.question}
                  </Text>
                </View>

                {/* Estadissticas */}
                <View className="w-full flex flex-col">
                  <View className="w-full h-[200px] bg-white border-l-2 border-b-2 border-dashed border-gray-200 mt-5 flex flex-row justify-center gap-5 items-end overflow-hidden">
                    <View
                      className="w-[80px] bg-green-800 flex flex-col justify-center items-center"
                      style={{
                        height:
                          percentajeHits === 0 ? '1%' : `${percentajeHits}%`,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 16,
                          color: 'white',
                        }}
                      >
                        {percentajeHits}%
                      </Text>
                    </View>
                    <View
                      className="w-[80px] bg-red-800 flex flex-col justify-center items-center"
                      style={{
                        height:
                          100 - percentajeHits === 0
                            ? '1%'
                            : `${100 - percentajeHits}%`,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 16,
                          color: 'white',
                        }}
                      >
                        {100 - percentajeHits}%
                      </Text>
                    </View>
                  </View>
                  <View className="py-5 flex flex-row items-center justify-center gap-10">
                    <View className="flex flex-row items-center gap-1">
                      <Octicons
                        name="square-fill"
                        size={12}
                        color={'#166534'}
                      />
                      <Text>Aciertos</Text>
                    </View>
                    <View className="flex flex-row items-center gap-1">
                      <Octicons
                        name="square-fill"
                        size={12}
                        color={'#991b1b'}
                      />
                      <Text>Errores</Text>
                    </View>
                  </View>
                </View>

                {/* Caja de Feedback */}
                <View className="flex flex-col mt-3 px-3 py-4 border border-gray-200 rounded-lg">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                      color: '#202244',
                    }}
                  >
                    {label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 14,
                      color: '#888',
                      marginBottom: 10,
                    }}
                  >
                    {percentajeHits}% de aciertos
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 15,
                      fontStyle: 'italic',
                      textAlign: 'justify',
                    }}
                  >
                    {message}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>

      <DeleteQuestionModal
        title={'¿Realmente desea eliminar esta actividad?'}
        isVisible={showQuestionDelete}
        onClose={toggleShowQuestionDelete}
        onContinue={onContinue}
        model={'activities'}
        id={activityId}
      />
      <Toast config={toastConfig} position="bottom" />
    </View>
  ) : (
    <View className="w-full flex-1 bg-[#F5F9FF]  rounded-lg px-3 py-5 flex justify-center items-center">
      <Text
        style={{
          fontFamily: 'Jost_600SemiBold',
          fontSize: 14,

          color: '#888',
          textAlign: 'center',
        }}
      >
        La actividad aún no ha recibido participantes
      </Text>
    </View>
  )
}

export default DetailActivity
