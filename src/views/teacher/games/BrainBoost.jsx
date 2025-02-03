import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import logo from 'assets/brain.png'
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import { useEffect, useRef, useState } from 'react'
import DatePicker from '@react-native-community/datetimepicker'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {
  TimeModal,
  ScoreModal,
  AnswerModal,
  CoursesModal,
  ClassesModal,
} from 'components/modal/index.modals'
import { activitiesAPI, coursesAPI } from 'api/index.api'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../../config/index.config'
import { dateUtils } from 'utils/index.utils'

import uuid from 'uuid'

const BrainBoost = ({ route }) => {
  const { user } = useSelector((state) => state.user)
  const navigation = useNavigation()
  const [dueDate, setDueDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const toggleCalendar = () => setShowCalendar((prev) => !prev)

  // Estados
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [showSelectSubjectModal, setShowSelectSubjectModal] = useState(false)
  const [showSelectClassModal, setShowSelectClassModal] = useState(false)
  const [courses, setCourses] = useState([])
  const [itemCourses, setItemCourses] = useState(null)
  const [nameCourse, setNameCourse] = useState(null)
  const [classId, setClassId] = useState(null)
  const [loading, setLoading] = useState(false)

  const [courseSelectedId, setCourseSelectedId] = useState(null)
  const [classes, setClasses] = useState([])
  const [itemClasses, setItemClasses] = useState(null)
  const [nameClass, setNameClass] = useState(null)
  const [selectClass, setSelectClass] = useState(true)

  const toggleShowSubjectModal = () =>
    setShowSelectSubjectModal((prev) => !prev)
  const toggleShowSelectClassModal = () =>
    setShowSelectClassModal((prev) => !prev)
  const toggleTimeModal = () => setShowTimeModal((prev) => !prev)
  const toggleScoreModal = () => setShowScoreModal((prev) => !prev)

  const initialQuestionState = {
    id: '',
    problem: '',
    code: '',
    time_limit: 0,
    feedback: '',
    score: 0,
    expected_output: '',
  }

  const [question, setQuestion] = useState(initialQuestionState)
  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    })
  }

  const [questions, setQuestions] = useState([])
  const inputRef = useRef(null)
  const [activities, setActivites] = useState([])

  const hideInputCursor = () => {
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }
  const handleCourseSelected = (value, name) => {
    setCourseSelectedId(value)
    setNameCourse(name)
  }

  const handleClassSelected = (value, name) => {
    setClassId(value)
    setNameClass(name)
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
  const handleQuestion = (key, value) => {
    setQuestion({ ...question, [key]: value })
  }
  const handleDate = (e, selectedDate) => {
    const currentDate = selectedDate || dueDate
    toggleCalendar()
    setDueDate(currentDate)
  }

  const saveQuestionBrain = () => {
    if (!question.problem.trim()) {
      showToast('error', 'Error', 'Por favor, ingresa el problema.')
      return
    }

    if (!question.code.trim()) {
      showToast('error', 'Error', 'Por favor, ingresa el programa.')
      return
    }
    if (question.time_limit === 0) {
      showToast('error', 'Error', 'Por favor, ingresa un tiempo mayor a 0.')
      return
    }
    if (question.score === 0) {
      showToast(
        'error',
        'Error',
        'Por favor, ingresa una puntuación mayor a 0.'
      )
      return
    }

    if (!question.expected_output.trim()) {
      showToast('error', 'Error', 'Por favor, ingresa el output esperado.')
      return
    }

    if (
      !question.feedback.trim() ||
      question.feedback.trim().split(' ').length < 10
    ) {
      showToast('error', 'Error', 'Justifica la respuesta (+10 palabras)')
      return
    }

    // ID temporal para poder interactuar
    const idRandom = uuid.v4()
    const newQuestion = { ...question, id: idRandom }
    const newBrainActivity = {
      brain: newQuestion,
    }

    setQuestions((prev) => [...prev, newQuestion])
    setActivites((prev) => [...prev, newBrainActivity])
    setQuestion(initialQuestionState)
    console.log(questions)
  }

  const saveActivity = () => {
    const total_time = activities.reduce(
      (total, activity) => (total += activity.brain.time_limit),
      0
    )
    const total_score = activities.reduce(
      (total, activity) => (total += activity.brain.score),
      0
    )
    const activities_count = activities.length
    const formData = new FormData()

    // Añadir los datos para crear la actividad
    formData.append('total_time', total_time)
    formData.append('total_score', total_score)
    formData.append('activities_count', activities_count)
    formData.append('ClassId', classId)
    formData.append('created_at', dateUtils.formatDate(new Date()))
    formData.append('due_date', dateUtils.formatDate(dueDate))
    formData.append('type', 'Brain Boost')

    // añadir las preguntas
    activities.forEach((act, index) => {
      formData.append(`activity_${index}_problem`, act.brain.problem)
      formData.append(`activity_${index}_code`, act.brain.code)
      formData.append(`activity_${index}_time_limit`, act.brain.time_limit)
      formData.append(`activity_${index}_score`, act.brain.score)
      formData.append(`activity_${index}_feedback`, act.brain.feedback)
      formData.append(
        `activity_${index}_expected_output`,
        act.brain.expected_output
      )
    })

    setLoading(true)
    activitiesAPI
      .createBrainActivity(formData)
      .then((res) => {
        showToast(
          'success',
          'Actividad creada',
          'Se ha creado la actividad correctamente'
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
    setActivites((prev) => prev.filter((activity) => activity.brain.id !== id))
  }

  const clearAll = () => {
    setQuestions([])
    setActivites([])
    setQuestion(initialQuestionState)
    setDueDate(new Date())
  }

  const renderQuestion = (item) => {
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
          {item.problem}
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
  useEffect(() => {
    if (route.params) {
      const { class_id } = route.params
      setClassId(class_id)
      setSelectClass(false)
    } else {
      setSelectClass(true)
    }
  }, [route.params])

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
      <View className="w-full h-[50px] flex flex-row justify-between items-center border-b border-gray-200 px-5">
        <View className="flex flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => navigation.replace('TeacherActivities')}
          >
            <Octicons name="arrow-left" size={21} color={'#202244'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 21,
              color: '#20244',
            }}
          >
            Brain Boost
          </Text>
        </View>
        <Image source={logo} style={{ width: 30, height: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-5 flex-1 px-5 flex flex-col">
          {/* Aqui van loss modaless */}

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

          {/* Problema */}
          <View className="flex flex-col mb-4">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Problema
            </Text>
            <TextInput
              multiline={true}
              className="w-full h-[100px] bg-white border border-gray-300 rounded-lg px-3 text-center"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#9D9D9D',
              }}
              defaultValue={question.problem}
              onChangeText={(value) => handleQuestion('problem', value)}
            />
          </View>
          {/* Caja decodigo */}
          <View className="flex flex-col mb-4">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Código
            </Text>
            <TextInput
              multiline={true}
              className="w-full h-[300px] bg-[#282C34] border border-gray-200 rounded-lg px-8"
              textAlignVertical="top"
              defaultValue={question.code}
              onChangeText={(value) => handleQuestion('code', value)}
              placeholder="// Añadir el código"
              placeholderTextColor={'#5C6370'}
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#F5F9FF',
              }}
            />
          </View>
          {/* Tiempo y puntaje */}
          <View className="flex flex-row items-center justify-between mb-4">
            <TouchableOpacity
              className="flex-row items-center gap-2 rounded-full bg-[#741D1D] px-3 py-1"
              onPress={toggleTimeModal}
            >
              <Octicons name="clock" size={16} color={'white'} />
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
              className="flex-row items-center gap-2 rounded-full bg-[#741D1D] px-3 py-1"
              onPress={toggleScoreModal}
            >
              <Octicons name="ruby" size={16} color={'white'} />
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
          </View>

          {/* Fecha de expiración de la actividad */}
          <View className="flex flex-col gap-1 mb-4">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Disponible hasta
            </Text>
            <View className="flex flex-row items-center gap-2">
              <View className="w-[90%] h-14 items-center justify-center bg-white border border-gray-200 rounded-lg">
                <Text>{dueDate.toLocaleDateString()}</Text>
              </View>

              <TouchableOpacity
                className="w-[10%] h-14 flex justify-center items-center"
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

          {/* Respuesta */}
          <View className="flex flex-col mb-4">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Salida esperada
            </Text>
            <TextInput
              multiline={true}
              className="w-full h-[100px] bg-white border border-gray-300 rounded-lg px-5 text-center"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#202244',
              }}
              defaultValue={question.expected_output}
              onChangeText={(value) => handleQuestion('expected_output', value)}
            />
          </View>

          {/* Justificacion */}
          <View className="flex flex-col mb-4">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Justificación
            </Text>
            <TextInput
              multiline={true}
              className="bg-white border border-gray-200 rounded-lg h-[100px] px-3"
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

          {/* Boton para añadir al cuestionario */}
          <TouchableOpacity
            className="w-full h-14 bg-[#741D1D] rounded-lg justify-center items-center mb-4"
            onPress={saveQuestionBrain}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#fff',
              }}
            >
              Añadir pregunta
            </Text>
          </TouchableOpacity>

          {/* Caja de las preguntas añadidas */}
          <View className="flex flex-col">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Problemas añadidos
            </Text>

            {questions.length > 0 ? (
              <>
                <View className="mt-3 flex flex-col bg-white px-2">
                  {questions.map((item) => renderQuestion(item))}
                </View>
                <View className="mt-10 flex  flex-row justify-between items-center gap-2">
                  <TouchableOpacity
                    className="h-14 bg-[#1c1c1d] rounded-lg justify-center items-center flex flex-1 flex-row  gap-2"
                    onPress={() => clearAll()}
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
                  No hay problemas añadidos
                </Text>
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#9D9D9D',
                    textAlign: 'center',
                  }}
                >
                  Añade problemas a este cuestionario
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Toast config={toastConfig} position="bottom" />
    </View>
  )
}

export default BrainBoost
