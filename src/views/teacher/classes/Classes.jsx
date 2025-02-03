import { Octicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import { ClassModal, DeleteQuestionModal } from 'components/modal/index.modals'
import { useEffect, useState } from 'react'
import { lectureUtils } from 'utils/index.utils'
import {
  saveCourses,
  saveAllClassesInCourses,
  saveAllStudents,
} from 'redux/slices/teacher.slice'
const Classes = ({ route, navigation }) => {
  const [topicId, setTopicId] = useState(null)
  const [auxCourses, setAuxCourses] = useState([])
  const dispatch = useDispatch()
  const { classes, courses } = useSelector((state) => state.teacher)
  const [showClassModal, setShowClassModal] = useState(false)
  const toggleShowClassModal = () => setShowClassModal((prev) => !prev)
  const [showQuestionDelete, setShowQuestionDelete] = useState(false)
  const toggleShowQuestionDelete = () => setShowQuestionDelete((prev) => !prev)

  const onContinue = (confirm) => {
    toggleShowQuestionDelete()
    if (confirm) {
      const updatedCourses = courses.map((course) => ({
        ...course,
        Classes: course.Classes.map((classItem) => ({
          ...classItem,
          Topics: classItem.Topics.filter((topic) => topic.id !== topicId),
        })),
      }))

      setAuxCourses(updatedCourses)
      dispatch(saveCourses(updatedCourses))
      dispatch(saveAllClassesInCourses(updatedCourses))
      dispatch(saveAllStudents(updatedCourses))

      console.log('Clase eliminada')
    }
  }

  const handleDelete = (id) => {
    setTopicId(id)
    toggleShowQuestionDelete()
  }

  const viewClass = (id, topic) => {
    navigation.navigate('DetailClassTeacher', {
      id: id,
      name: topic,
    })
  }

  const getCourseName = (CourseId) => {
    const course = courses.find((course) => course.id === CourseId)
    return course.subject
  }

  const registerClassSuccess = (confirm) => {
    if (confirm) {
      console.log('Curso creado')
    }
  }

  useEffect(() => {
    setAuxCourses(courses)
  }, [])

  return courses && courses.length > 0 ? (
    <>
      {classes && classes.length > 0 ? (
        <View
          className={`flex-1 bg-[#F5F9FF] relative px-5 py-6 ${
            classes.length === 0 && 'justify-center items-center'
          }`}
        >
          <View className="w-full flex flex-col gap-3">
            {/* Buscador */}

            <View className="flex flex-row h-[55px] bg-white border border-gray-200 overflow-hidden rounded-xl">
              {/* Icono */}
              <View className="w-[40px] flex justify-center items-center h-full">
                <Octicons name="search" size={21} color="#000" />
              </View>
              <TextInput
                className="flex-1 outline-none px-2"
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 13,
                  color: '#888',
                }}
              />
            </View>

            {/* Lista de clases */}
            <FlatList
              data={classes}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 80,
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View
                  className="bg-white border border-gray-200 rounded-lg mb-10 overflow-hidden"
                  key={item.id}
                >
                  <View className="flex flex-row justify-between items-center px-5 py-4 bg-[#741D1D]">
                    <View className="flex flex-col">
                      <Text
                        style={{
                          fontFamily: 'Mulish_700Bold',
                          fontSize: 10,
                          color: '#E8F1FF',
                        }}
                      >
                        {getCourseName(item.CourseId)}
                      </Text>
                      <View className="flex flex-row gap-1 items-center">
                        <Text
                          style={{
                            fontFamily: 'Jost_600SemiBold',
                            fontSize: 15,
                            color: 'white',
                          }}
                        >
                          Clase {index + 1} -
                        </Text>

                        <Text
                          style={{
                            fontFamily: 'Jost_600SemiBold',
                            fontSize: 15,
                            color: '#F5F9FF',
                          }}
                        >
                          {item.topic}
                        </Text>
                      </View>
                    </View>
                    {item.Topics.length > 0 && (
                      <Text
                        style={{
                          fontFamily: 'Mulish_700Bold',
                          fontSize: 12,
                          color: '#F5F9FF',
                        }}
                      >
                        {lectureUtils.getTotalEstimatedReadingTime(item)} mins
                      </Text>
                    )}
                  </View>
                  {item.Topics.length > 0 ? (
                    <View className="flex flex-col">
                      {item.Topics.map((topic, index) => (
                        <View
                          className="p-5 flex flex-row items-center justify-between border-b border-gray-200"
                          key={topic.id}
                        >
                          <View className="flex flex-row gap-1">
                            <View className="w-10 h-10 flex justify-center items-center rounded-full bg-[#F5F9FF] border border-[#E8F1FF]">
                              <Text
                                style={{
                                  fontFamily: 'Jost_600SemiBold',
                                  fontSize: 14,
                                  color: '#202244',
                                }}
                              >
                                {index + 1}
                              </Text>
                            </View>
                            <View className="flex flex-col px-2">
                              <Text
                                style={{
                                  fontFamily: 'Jost_600SemiBold',
                                  fontSize: 13,
                                  color: '#202244',
                                }}
                              >
                                {topic.title}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Mulish_700Bold',
                                  fontSize: 11,
                                  color: '#545454',
                                }}
                              >
                                {lectureUtils.estimateReadingTime(
                                  topic.content
                                )}{' '}
                                mins
                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity
                            className="w-[20px] h-[20px] rounded-full flex justify-center items-center"
                            onPress={() => handleDelete(topic.id)}
                          >
                            <Octicons
                              name="trash"
                              size={21}
                              color={'#741D1D'}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View>
                      <View className="border border-dashed border-gray-200 rounded-lg p-5 flex flex-col gap-2">
                        <Text
                          style={{
                            fontFamily: 'Jost_600SemiBold',
                            fontSize: 14,
                            color: '#202244',
                            textAlign: 'center',
                          }}
                        >
                          Sin contenido que mostrar
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Mulish_400Regular',
                            fontSize: 12,
                            color: '#545454',
                            textAlign: 'center',
                          }}
                        >
                          Agrega contenido a tu clase para que tus estudiantes
                          las vean.
                        </Text>
                      </View>
                    </View>
                  )}

                  <View className="flex flex-row items-center">
                    <TouchableOpacity
                      className="flex-1 py-2 flex flex-row items-center gap-1 justify-center"
                      onPress={() => viewClass(item.id, item.topic)}
                    >
                      <Octicons name="eye" size={15} color={'#202244'} />
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 14,
                          color: '#202244',
                        }}
                      >
                        Ver
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 py-2 flex flex-row items-center gap-1 justify-center"
                      // onPress={() => deleteClass(item.id)}
                    >
                      <Octicons name="trash" size={15} color={'#741D1D'} />
                      <Text
                        style={{
                          fontFamily: 'Jost_600SemiBold',
                          fontSize: 14,
                          color: '#741D1D',
                        }}
                      >
                        Eliminar clase
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            className="w-[45px] h-[45px] rounded-full bg-[#741D1D] flex justify-center items-center border-2 border-gray-200 absolute bottom-5 right-5"
            onPress={toggleShowClassModal}
          >
            <Octicons name="plus" size={21} color={'white'} />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 flex-col justify-center items-center bg-[#F5F9FF]">
          <View className="flex flex-col justify-center items-center px-5 py-3 rounded-lg w-full ">
            <LottieView
              autoPlay
              loop
              source={emptyData}
              style={{
                width: 250,
                height: 250,
              }}
            />
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 16,
                color: '#202244',
                marginBottom: 5,
              }}
            >
              Sin clases registradas
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 14,
                color: '#888',
                textAlign: 'center',
              }}
            >
              Agrega clases a tu curso para que tus estudiantes puedan acceder a
              ellas
            </Text>
          </View>
        </View>
      )}
      <ClassModal
        isVisible={showClassModal}
        toggleModal={toggleShowClassModal}
        registerClassSuccess={registerClassSuccess}
      />
      <DeleteQuestionModal
        title={'¿Realmente desea eliminar este tema?'}
        isVisible={showQuestionDelete}
        onClose={toggleShowQuestionDelete}
        onContinue={onContinue}
        model={'topics'}
        id={topicId}
      />
      <TouchableOpacity
        className="w-[45px] h-[45px] rounded-full bg-[#741D1D] flex justify-center items-center border-2 border-gray-200 absolute bottom-5 right-5"
        onPress={toggleShowClassModal}
      >
        <Octicons name="plus" size={21} color={'white'} />
      </TouchableOpacity>
    </>
  ) : (
    <View className="flex-1 flex-col justify-center items-center bg-[#F5F9FF]">
      <View className="flex flex-col justify-center items-center px-5 py-3 rounded-lg w-full ">
        <LottieView
          autoPlay
          loop
          source={emptyData}
          style={{
            width: 250,
            height: 250,
          }}
        />
        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 16,
            color: '#202244',
            marginBottom: 5,
          }}
        >
          Sin cursos registrados
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            color: '#888',
            textAlign: 'center',
          }}
        >
          Agrega un curso para que puedas generar clases
        </Text>
        <TouchableOpacity
          className="py-4 flex flex-row items-center justify-center gap-2 bg-[#741D1D] w-full mt-5 rounded-full"
          onPress={() => navigation.navigate('TabCourse')}
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

export default Classes
