import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { useEffect, useRef, useState } from 'react'
import AnswerModal from 'components/modal/AnswerModal'
import { pickerImagesUtil } from 'utils/index.utils'
import TimeModal from 'components/modal/TimeModal'
import ScoreModal from 'components/modal/ScoreModal'
import uuid from 'uuid'
import Toast from 'react-native-toast-message'
import { toastConfig } from 'config/index.config'
import DatePicker from '@react-native-community/datetimepicker'
import { dateUtils } from 'utils/index.utils'
import activitiesAPI from '../../../api/activities/activities.api'
import quizzLogo from 'assets/quizz.png'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { coursesAPI } from '../../../api/index.api'
import CoursesModal from '../../../components/modal/CoursesModal'
import ClassesModal from '../../../components/modal/ClassesModal'

const QuizzCode = ({ route }) => {
  const [dueDate, setDueDate] = useState(new Date())
  const { user } = useSelector((state) => state.user)

  const navigation = useNavigation()
  const [showCalendar, setShowCalendar] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const [courses, setCourses] = useState([])
  const [itemCourses, setItemCourses] = useState(null)
  const [nameCourse, setNameCourse] = useState(null)

  const [courseSelectedId, setCourseSelectedId] = useState(null)
  const [classes, setClasses] = useState([])
  const [itemClasses, setItemClasses] = useState(null)
  const [nameClass, setNameClass] = useState(null)
  const [selectClass, setSelectClass] = useState(true)

  const [showSelectSubjectModal, setShowSelectSubjectModal] = useState(false)
  const toggleShowSubjectModal = () =>
    setShowSelectSubjectModal((prev) => !prev)

  const [showSelectClassModal, setShowSelectClassModal] = useState(false)
  const toggleShowSelectClassModal = () =>
    setShowSelectClassModal((prev) => !prev)

  const toggleSuccess = () => setShowSuccess(!showSuccess)

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDate = (e, selectedDate) => {
    const currentDate = selectedDate || dueDate
    toggleCalendar()
    setDueDate(currentDate)
  }

  const [classId, setClassId] = useState(null)
  const inputRef = useRef(null)
  const [activities, setActivites] = useState([])

  const initialQuestionState = {
    id: '',
    question: '',
    time_limit: 0,
    feedback: '',
    score: 0,
  }
  const initialAnswerState = {
    option: '',
    isCorrect: false,
  }

  const [imageUri, setImageUri] = useState(null)
  const [selectedValue, setSelectedValue] = useState({
    placeholder: '',
    bgColor: '',
    optionIndex: null,
  })

  const boxOptions = [
    {
      label: 'Opción 1',
      bgColor: '#A70808',
    },
    {
      label: 'Opción 2',
      bgColor: '#130DB2',
    },
    {
      label: 'Opción 3',
      bgColor: '#CBA715',
    },
    {
      label: 'Opción 4',
      bgColor: '#1BA81B',
    },
  ]

  const [question, setQuestion] = useState(initialQuestionState)
  const [answer, setAnswer] = useState(initialAnswerState)

  // Estado para imprrimir las preguntas que el uusuario ha creado
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  const [showTimeModal, setShowTimeModal] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [showAnswerModal, setShowAnswerModal] = useState(false)

  const toggleTimeModal = () => setShowTimeModal((prev) => !prev)
  const toggleScoreModal = () => setShowScoreModal((prev) => !prev)

  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) setImageUri(uri)
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  const handleQuestion = (name, value) => {
    setQuestion({ ...question, [name]: value })
  }

  const handleAnswer = (name, value) => {
    setAnswer({ ...answer, [name]: value })
  }

  const handleSave = () => {
    hideInputCursor()
    setAnswers((pre) => {
      const updateAnswers = [...pre]
      updateAnswers[selectedValue.optionIndex] = answer
      return updateAnswers
    })
    setShowAnswerModal(false)
  }

  const hideInputCursor = () => {
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const toggleAnswerModal = (bgColor, index) => {
    const hasAnswer = answers[index]
    const placeholder = hasAnswer ? '' : boxOptions[index].label
    if (hasAnswer) {
      setAnswer(hasAnswer)
    } else {
      setAnswer(initialAnswerState)
    }
    hideInputCursor()
    setSelectedValue({ placeholder, bgColor, optionIndex: index })
    setShowAnswerModal(true)
  }

  const saveQuizz = () => {
    if (!question.question.trim()) {
      showToast('error', 'Error', 'Por favor, ingresa una pregunta.')
      return
    }

    if (question.time_limit === 0) {
      showToast('error', 'Error', 'Por favor, ingresa un límite de tiempo.')
      return
    }
    if (question.score === 0) {
      showToast('error', 'Error', 'Por favor, ingresa un puntaje válido.')
      return
    }

    if (answers.length < 4) {
      showToast('error', 'Error', 'Por favor, ingresa las 4 opciones.')
      return
    }

    const correctAnswer = answers.filter((answer) => answer.isCorrect)

    if (correctAnswer.length !== 1) {
      showToast(
        'error',
        'Error',
        'Debe haber 1 respuesta marcada como correcta'
      )
      return
    }

    if (!question.feedback.trim()) {
      showToast(
        'error',
        'Error',
        'Debes añadir una justificación a la respuesta'
      )
      return
    }

    if (question.feedback.trim().split(' ').length < 15) {
      showToast(
        'error',
        'Error',
        'La justificación debe tener más de 15 palabras'
      )
      return
    }

    const idRandom = uuid.v4()
    const newQuestion = { ...question, id: idRandom }
    const newQuizzActivity = {
      quizz: newQuestion,
      answers: [...answers],
    }

    setQuestions((prev) => [...prev, newQuestion])
    setActivites((prev) => [...prev, newQuizzActivity])
    setQuestion(initialQuestionState)
    setAnswer(initialAnswerState)
    setAnswers([])
    // setImageUri(null)
    setSelectedValue({ placeholder: '', bgColor: '', optionIndex: null })
  }

  const saveActivity = () => {
    const total_time = activities.reduce(
      (total, activity) => (total += activity.quizz.time_limit),
      0
    )
    const total_score = activities.reduce(
      (total, activity) => (total += activity.quizz.score),
      0
    )
    const activities_count = activities.length
    const formData = new FormData()
    // Añadir los datos del cuestionario
    formData.append('total_time', total_time)
    formData.append('total_score', total_score)
    formData.append('activities_count', activities_count)
    formData.append('ClassId', classId)
    formData.append('created_at', dateUtils.formatDate(new Date()))
    formData.append('due_date', dateUtils.formatDate(dueDate))
    formData.append('type', 'Quizz Code')

    // Enviar las actividades con sus imagenes
    activities.forEach((activity, index) => {
      formData.append(`activity_${index}_question`, activity.quizz.question)
      formData.append(`activity_${index}_time_limit`, activity.quizz.time_limit)
      formData.append(`activity_${index}_score`, activity.quizz.score)
      formData.append(`activity_${index}_feedback`, activity.quizz.feedback)

      activity.answers.forEach((answer, answerIndex) => {
        formData.append(
          `activity_${index}_answer_${answerIndex}_option`,
          answer.option
        )
        formData.append(
          `activity_${index}_answer_${answerIndex}_isCorrect`,
          answer.isCorrect.toString()
        )
      })
    })

    if (imageUri) {
      const uriParts = imageUri.split('.')
      const fileType = uriParts[uriParts.length - 1]
      formData.append(`activity_poster`, {
        uri: imageUri,
        type: `image/${fileType}`,
        name: `activity_poster.${fileType}`,
      })
    }
    toggleSuccess()
    setLoading(true)

    activitiesAPI
      .create(formData)
      .then((res) => {
        showToast(
          'success',
          'Actividad creada',
          'La actividad se creó con éxito'
        )
        clearAll()
      })
      .catch((err) => {
        showToast(
          'error',
          'Error',
          'Error al crear la actividad. Intente de nuevo.'
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id))
    setActivites((prev) => prev.filter((activity) => activity.quizz.id !== id))
  }

  const clearAll = () => {
    setQuestions([])
    setActivites([])
    setAnswer(initialAnswerState)
    setQuestion(initialQuestionState)
    setAnswers([])
  }
  const renderQuestion = (item, index) => {
    return (
      <View
        className="flex flex-row items-center justify-between border-b border-gray-200 py-5 px-2"
        key={item.id}
      >
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 14,
            color: '#202244',
          }}
          className="flex-1"
        >
          {item.question}
        </Text>
        {/* Opciones */}
        <TouchableOpacity
          className="w-12 flex justify-center items-center"
          onPress={() => deleteQuestion(item.id || null)}
        >
          <Octicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    )
  }

  const createCourses = () => {
    const mapCourses = courses.map((course) => ({
      label: course.subject,
      value: course.id,
    }))
    setItemCourses(mapCourses)
    toggleShowSubjectModal()
  }

  const createClasses = () => {
    const mapClasses = classes.map((item) => ({
      label: item.topic,
      value: item.id,
    }))

    setItemClasses(mapClasses)
    toggleShowSelectClassModal()
  }

  const handleCourseSelected = (value, name) => {
    setCourseSelectedId(value)
    setNameCourse(name)
  }

  const handleClassSelected = (value, name) => {
    setClassId(value)
    setNameClass(name)
  }

  useEffect(() => {
    if (route.params) {
      const { class_id } = route.params
      setClassId(class_id)
      setSelectClass(false)
    } else {
      setSelectClass(true)
    }
  }, [route])

  useEffect(() => {
    if (courseSelectedId) {
      const filterCourse = courses.find(
        (course) => course.id === courseSelectedId
      )
      const { Classes } = filterCourse
      setClasses(Classes)
    }
  }, [courseSelectedId])

  useEffect(() => {
    if (user) {
      const { id } = user
      coursesAPI.getAll(id).then((res) => {
        const { courses } = res.data
        setCourses(courses)
      })
    }
  }, [])

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <CoursesModal
        visible={showSelectSubjectModal}
        items={itemCourses}
        onClose={toggleShowSubjectModal}
        handleCourseSelected={handleCourseSelected}
      />

      <ClassesModal
        visible={showSelectClassModal}
        items={itemClasses}
        onClose={toggleShowSelectClassModal}
        handleClassSelected={handleClassSelected}
      />
      {/* Header */}
      <View className="w-full h-[50px] px-5 flex flex-row justify-between items-center bg-[#f5f9ff] border-b border-gray-200">
        <View className="flex flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('TeacherActivities')}
          >
            <Octicons name="arrow-left" size={21} color={'#202244'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 21,
              color: '#202244',
            }}
          >
            Quizz Code
          </Text>
        </View>

        <Image source={quizzLogo} style={{ width: 30, height: 30 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-5 flex-1 bg-[#F5F9FF] px-3">
          {/* Modales */}
          <TimeModal
            visible={showTimeModal}
            onClose={toggleTimeModal}
            handleQuestion={handleQuestion}
          />
          <ScoreModal
            visible={showScoreModal}
            onClose={toggleScoreModal}
            handleQuestion={handleQuestion}
          />

          {selectClass && (
            <>
              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative mb-5">
                <View className="w-14 flex flex-row items-center justify-center h-full ">
                  <MaterialCommunityIcons
                    name="room-service"
                    size={20}
                    color={'#545454'}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#505050',
                  }}
                >
                  {nameCourse || 'Selecciona el Curso'}
                </Text>

                <TouchableOpacity
                  className="absolute right-5"
                  onPress={createCourses}
                >
                  <Octicons name="chevron-down" size={18} color={'#202244'} />
                </TouchableOpacity>
              </View>
              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative mb-5">
                <View className="w-14 flex flex-row items-center justify-center h-full ">
                  <MaterialCommunityIcons
                    name="room-service"
                    size={20}
                    color={'#545454'}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#505050',
                  }}
                >
                  {nameClass || 'Selecciona la clase'}
                </Text>

                <TouchableOpacity
                  className="absolute right-5"
                  onPress={createClasses}
                >
                  <Octicons name="chevron-down" size={18} color={'#202244'} />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Box Image */}
          <TouchableOpacity
            className="w-full h-[200px] bg-black rounded-xl justify-center items-center mb-6"
            onPressIn={pickImage}
          >
            <>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-sharp"
                    size={50}
                    color="#FFFFFF"
                  />
                  <Text
                    className="text-base mt-2"
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 15,
                      color: '#fff',
                    }}
                  >
                    Añadir portada (Opcional)
                  </Text>
                </>
              )}

              <TouchableOpacity
                className="absolute bottom-2 left-2 z-50 flex flex-row items-center gap-2 rounded-full bg-[#741D1D] px-3 py-1"
                onPress={toggleTimeModal}
              >
                <Octicons name="clock" size={16} color="white" />
                <Text
                  style={{
                    fontFamily: 'Mulish_400Regular',
                    fontSize: 12,
                    color: '#fff',
                  }}
                >
                  {question.time_limit} segs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="absolute bottom-2 right-2 z-50 flex flex-row items-center gap-2 rounded-full bg-[#741D1D] px-3 py-1"
                onPress={toggleScoreModal}
              >
                <Octicons name="ruby" size={16} color="white" />
                <Text
                  style={{
                    fontFamily: 'Mulish_400Regular',
                    fontSize: 12,
                    color: '#fff',
                  }}
                >
                  {question.score} xp
                </Text>
              </TouchableOpacity>
            </>
          </TouchableOpacity>

          {/* Question Input */}
          <TextInput
            ref={inputRef}
            multiline={true}
            className="h-[100px] bg-white border border-gray-300 rounded-lg text-center mb-6 px-3"
            defaultValue={question.question}
            placeholder="Añadir pregunta"
            onChangeText={(text) => handleQuestion('question', text)}
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 14,
              color: '#9D9D9D',
            }}
            onBlur={() => Keyboard.dismiss()}
          />

          {/* Fecha de Disponibilidad */}
          <View className="flex flex-col gap-1 mb-6">
            <Text
              className="text-gray-800 mb-2"
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
              }}
            >
              Disponible hasta
            </Text>
            <View classNasaveQuestionLightningme="flex flex-row items-center justify-between">
              <View className="flex flex-1 h-14 items-center justify-center bg-white border border-gray-200 rounded-lg">
                <Text>{dueDate.toLocaleDateString()}</Text>
              </View>

              <TouchableOpacity
                className="w-12 flex justify-center items-center"
                onPress={toggleCalendar}
              >
                <Octicons name="calendar" size={22} color={'#741D1D'} />
              </TouchableOpacity>
            </View>

            {showCalendar && (
              <DatePicker
                style={{ width: '100%' }}
                value={dueDate}
                is24Hour={true}
                display="calendar"
                onChange={handleDate}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Options Section */}
          <Text
            className="text-gray-800 mb-4"
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
            }}
          >
            Opciones
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {boxOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] h-24 rounded-lg justify-center items-center mb-4 px-2"
                style={{ backgroundColor: option.bgColor }}
                onLongPress={() => toggleAnswerModal(option.bgColor, index)}
              >
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 13,
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
                  {answers[index]?.option || option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex flex-col mb-4">
            <Text
              className="text-gray-800 mb-4"
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
              }}
            >
              Justificación
            </Text>

            <TextInput
              multiline={true}
              className="bg-white border border-gray-200 rounded-lg h-[100px] px-3 text-center"
              onChangeText={(value) => handleQuestion('feedback', value)}
              textAlignVertical="top"
              value={question.feedback}
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#202244',
              }}
            />
          </View>

          {/* Add to Quiz Button */}
          <TouchableOpacity
            className="w-full h-14 bg-[#741D1D] rounded-lg justify-center items-center mb-6"
            onPress={saveQuizz}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#fff',
              }}
            >
              Añadir al Quizz
            </Text>
          </TouchableOpacity>

          {/* Added Questions Section */}
          <View className="w-full pt-5 mt-10 border-t border-gray-300">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Preguntas añadidas
            </Text>

            {questions.length > 0 ? (
              <>
                <View className="mt-3 flex flex-col bg-white px-2 ">
                  {questions.map((item, index) => renderQuestion(item, index))}
                </View>

                <View className="mt-10 flex  flex-row justify-between items-center gap-2">
                  <TouchableOpacity
                    className="h-14 bg-[#1c1c1d] rounded-lg justify-center items-center flex flex-1 flex-row  gap-2"
                    onPress={clearAll}
                  >
                    <Octicons name="sync" size={18} color="#fff" />
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 16,
                        color: '#fff',
                      }}
                    >
                      Limpiar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="h-14 rounded-lg justify-center items-center flex flex-1 flex-row  gap-2"
                    style={{
                      backgroundColor: loading ? '#888' : '#741D1D',
                    }}
                    onPress={saveActivity}
                  >
                    {loading ? (
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 16,
                          color: '#fff',
                        }}
                      >
                        Guardando
                      </Text>
                    ) : (
                      <>
                        <Ionicons name="save" size={18} color="#fff" />
                        <Text
                          style={{
                            fontFamily: 'Jost_600SemiBold',
                            fontSize: 16,
                            color: '#fff',
                          }}
                        >
                          Guardar
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View className="w-full border border-dashed border-gray-200 rounded-xl mt-3 bg-white px-3 py-5 flex flex-col gap-1">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: '#202244',
                    textAlign: 'center',
                  }}
                >
                  No hay preguntas añadidas
                </Text>
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#9D9D9D',
                    textAlign: 'center',
                  }}
                >
                  Añade pregunta a este quizz para empezar
                </Text>
              </View>
            )}
          </View>

          {/* Modal de respuestas */}
          {showAnswerModal && (
            <AnswerModal
              onClose={() => setShowAnswerModal(false)}
              placeholder={selectedValue.placeholder}
              bgColor={selectedValue.bgColor}
              onSave={handleSave}
              answer={answer}
              handleAnswer={handleAnswer}
            />
          )}
        </View>
      </ScrollView>
      <Toast config={toastConfig} position="bottom" />
    </View>
  )
}

export default QuizzCode
