import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'
import logo from 'assets/lightning.png'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { dateUtils } from 'utils/index.utils'
import { activitiesAPI, coursesAPI } from 'api/index.api'
import {
  TimeModal,
  ScoreModal,
  AnswerModal,
  CoursesModal,
  ClassesModal,
} from 'components/modal/index.modals'
import uuid from 'uuid'
import { useSelector } from 'react-redux'
import CustomToast from 'components/toast/Toast'
const LightningCode = ({ route }) => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)
  const { user } = useSelector((state) => state.user)
  // Variables Generales
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
  const navigation = useNavigation()

  // Estados
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const [showSelectSubjectModal, setShowSelectSubjectModal] = useState(false)
  const [showSelectClassModal, setShowSelectClassModal] = useState(false)

  const [courses, setCourses] = useState([])
  const [itemCourses, setItemCourses] = useState(null)
  const [nameCourse, setNameCourse] = useState(null)

  const [courseSelectedId, setCourseSelectedId] = useState(null)
  const [classes, setClasses] = useState([])
  const [itemClasses, setItemClasses] = useState(null)
  const [nameClass, setNameClass] = useState(null)
  const [selectClass, setSelectClass] = useState(true)

  const toggleShowSubjectModal = () =>
    setShowSelectSubjectModal((prev) => !prev)
  const toggleShowSelectClassModal = () =>
    setShowSelectClassModal((prev) => !prev)

  const [showCalendar, setShowCalendar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [classId, setClassId] = useState(null)
  const [dueDate, setDueDate] = useState(new Date())

  const toggleTimeModal = () => setShowTimeModal((prev) => !prev)
  const toggleScoreModal = () => setShowScoreModal((prev) => !prev)
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  // Question, Code, etc
  const initialQuestionState = {
    id: '',
    question: '',
    code: '',
    time_limit: 0,
    feedback: '',
    score: 0,
  }
  const initialAnswerState = {
    option: '',
    isCorrect: false,
  }
  const [selectedValue, setSelectedValue] = useState({
    placeholder: '',
    bgColor: '',
    optionIndex: null,
  })
  const [question, setQuestion] = useState(initialQuestionState)
  const [answer, setAnswer] = useState(initialAnswerState)

  // Estados para las preguntas que se van añadiendo
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  // Estado del cursos
  const inputRef = useRef(null)

  // Estado de las activities que se iran agregando
  const [activities, setActivites] = useState([])

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

  // Método para añadir data a la question
  const handleQuestion = (key, value) => {
    setQuestion({ ...question, [key]: value })
  }

  const handleAnswer = (key, value) => {
    setAnswer({ ...answer, [key]: value })
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
  const handleDate = (e, selectedDate) => {
    const currentDate = selectedDate || dueDate
    toggleCalendar()
    setDueDate(currentDate)
  }

  // Guardar Question
  const saveQuestionLightning = () => {
    if (!classId) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Selecciona una clase')
      setMessageToast('Debes seleccionar la clase de la actividad.')
      return
    }

    if (!question.question.trim()) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Pregunta obligatoria')
      setMessageToast('Por favor, ingresa una pregunta.')
      return
    }

    if (!question.code.trim()) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Pregunta obligatoria')
      setMessageToast('Por favor, ingresa el programa.')
      return
    }
    if (question.time_limit === 0) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Tiempo no válido')
      setMessageToast('Por favor, ingresa un tiempo válido.')
      return
    }
    if (question.score === 0) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Puntaje no válido')
      setMessageToast('Por favor, ingresa un puntaje válido.')
      return
    }

    if (answers.length < 4) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Respuestas incompletas')
      setMessageToast('Por favor, ingresas las 4 respuestas')
      return
    }

    const correctAnswer = answers.filter((answer) => answer.isCorrect)

    if (correctAnswer.length !== 1) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Respuesta no válida')
      setMessageToast('Debe haber 1 respuesta marcada como correcta')
      return
    }

    if (
      !question.feedback.trim() ||
      question.feedback.trim().split(' ').length < 10
    ) {
      setToast(true)
      setTypeToast('error')
      setTitleToast('Feedback obligatorio')
      setMessageToast(
        'Debes añadir una justificación a la respuesta (+10 palabras)'
      )
      return
    }

    // ID temporal para poder interactuar
    const idRandom = uuid.v4()
    const newQuestion = { ...question, id: idRandom }
    const newLightningActivity = {
      lightning: newQuestion,
      answers: [...answers],
    }

    setQuestions((prev) => [...prev, newQuestion])
    setActivites((prev) => [...prev, newLightningActivity])
    setQuestion(initialQuestionState)
    setAnswer(initialAnswerState)
    setAnswers([])
    setSelectedValue({ placeholder: '', bgColor: '', optionIndex: null })
  }

  const saveActivity = () => {
    const total_time = activities.reduce(
      (total, activity) => (total += activity.lightning.time_limit),
      0
    )
    const total_score = activities.reduce(
      (total, activity) => (total += activity.lightning.score),
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
    formData.append('type', 'Lightning Code')

    // Añadir las preguntas y respuestas
    activities.forEach((act, index) => {
      formData.append(`activity_${index}_question`, act.lightning.question)
      formData.append(`activity_${index}_code`, act.lightning.code)
      formData.append(`activity_${index}_time_limit`, act.lightning.time_limit)
      formData.append(`activity_${index}_score`, act.lightning.score)
      formData.append(`activity_${index}_feedback`, act.lightning.feedback)

      act.answers.forEach((answ, answerIndex) => {
        formData.append(
          `activity_${index}_answer_${answerIndex}_option`,
          answ.option
        )
        formData.append(
          `activity_${index}_answer_${answerIndex}_isCorrect`,
          answ.isCorrect.toString()
        )
      })
    })

    setLoading(true)

    activitiesAPI
      .createLightningActivity(formData)
      .then((res) => {
        setToast(true)
        setTypeToast('success')
        setTitleToast('Actividad creada')
        setMessageToast('Se ha creado la actividad con éxito')
        clearAll()
      })
      .catch((err) => {
        setToast(true)
        setTypeToast('errior')
        setTitleToast('Error al crear')
        setMessageToast('No se pudo crear la actividad')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const clearAll = () => {
    setQuestions([])
    setActivites([])
    setAnswer(initialAnswerState)
    setQuestion(initialQuestionState)
    setAnswers([])
  }

  // Solucionar el delete question
  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id))
    setActivites((prev) =>
      prev.filter((activity) => activity.lightning.id !== id)
    )
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
      {/* HEADER */}
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
            Lightning Code
          </Text>
        </View>
        <Image source={logo} style={{ width: 30, height: 30 }} />
      </View>
      {/* SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-5 flex-1 px-5 flex flex-col">
          {/* Aqui van los modales */}
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
          {/* Pregunta Box */}
          <View className="flex flex-col mb-4">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Pregunta
            </Text>
            <TextInput
              multiline={true}
              className="w-full h-[100px] bg-white border border-gray-300 rounded-lg text-center mb-6 px-3"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#9D9D9D',
              }}
              placeholder="Añadir pregunta"
              defaultValue={question.question}
              onChangeText={(value) => handleQuestion('question', value)}
            />
          </View>

          <View className="flex flex-col">
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
          <View className="mt-3 flex flex-row items-center justify-between">
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

          {/* Fecha de Expiración */}
          <View className="flex flex-col gap-1 mt-3">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
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

          {/* Caja de opciones */}
          <View className="mt-3 flex flex-col">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 18,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Opciones
            </Text>

            <View className="flex flex-row flex-wrap justify-between">
              {boxOptions.map((opt, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] h-24 rounded-lg justify-center items-center mb-4 px-2"
                  style={{
                    backgroundColor: opt.bgColor,
                  }}
                  onLongPress={() => toggleAnswerModal(opt.bgColor, index)}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 13,
                      color: '#FFF',
                      textAlign: 'center',
                    }}
                  >
                    {answers[index]?.option || opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Justificacion */}
          <View className="mt-3 flex flex-col">
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
              className="bg-white border border-gray-200 rounded-lg h-[100px] px-3 text-center"
              onChangeText={(value) => handleQuestion('feedback', value)}
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
            className="w-full h-14 bg-[#741D1D] rounded-lg justify-center items-center mb-6 mt-3"
            onPress={saveQuestionLightning}
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
          <View className="flex flex-col mt-3">
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
                  Añade pregunta a este cuestionario
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
      {toast && (
        <CustomToast
          setToast={setToast}
          type={typeToast}
          title={titleToast}
          message={messageToast}
        />
      )}
    </View>
  )
}

export default LightningCode
