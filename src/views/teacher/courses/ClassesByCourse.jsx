import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useSelector } from 'react-redux'
import { classesAPI } from 'api/index.api'
import {
  TopicModal,
  AddClass,
  ContentTopicModal,
} from 'components/modal/index.modals'
import { lectureUtils } from 'utils/index.utils'
import { useNavigation } from '@react-navigation/native'
import { useLoading } from 'context/LoadingContext'

const ClassesByCourse = ({ courseId }) => {
  const { showLoading, hideLoading } = useLoading()
  const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState(false)
  const [ClassId, setClassId] = useState(null)

  const [showContentTopicModal, setShowContentTopicModal] = useState(false)
  const [showTopicModal, setShowTopicModal] = useState(false)
  const toggleTopicModal = () => setShowTopicModal((prev) => !prev)

  const openTopicModal = (class_id) => {
    setClassId(class_id)
    toggleTopicModal()
  }

  const toggleContentTopicModal = () =>
    setShowContentTopicModal((prev) => !prev)

  const toggleModal = () => setIsVisible((prev) => !prev)

  const [classeInCourse, setClasseInCourse] = useState([])

  const goToClass = (class_id, name) => {
    navigation.navigate('Clases', {
      screen: 'DetailClass',
      params: {
        class_name: name,
        id: class_id,
      },
    })
  }

  useEffect(() => {
    showLoading('Cargando las clases del curso. Espere un momento...')
    if (courseId) {
      classesAPI
        .getByCourse(courseId)
        .then((res) => {
          const { classes } = res.data
          setClasseInCourse(classes)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          hideLoading()
        })
    }
  }, [])

  return (
    <View className=" bg-[#F5F9FF]  flex-1 items-center justify-center">
      {/* Floating button */}
      <TouchableOpacity
        className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
        onPress={toggleModal}
      >
        <Octicons name="plus" size={25} color={'white'} />
      </TouchableOpacity>
      {!classeInCourse ||
        (classeInCourse.length === 0 ? (
          <TouchableOpacity className="flex flex-col items-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
            <Text
              className="mb-2"
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 15,
                color: '#202244',
                textAlign: 'center',
              }}
            >
              Aún no hay clases agregadas para este curso
            </Text>
            <Text
              className="mb-4"
              style={{
                fontFamily: 'Mulish_400Regular',
                fontSize: 12,
                color: '#545454',
                textAlign: 'center',
              }}
            >
              Agrega las clases para que tus estudiantes puedan encontrarlas
              facilmente
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-1 flex-col pt-5 w-full ">
            {/* BUSCADOR */}
            <View className="px-5">
              <View className="w-full flex flex-row items-center bg-white border border-gray-200 rounded-2xl px-2 shadow-lg shadow-gray-300 mb-10 ">
                <View className="w-8 h-8 flex items-center justify-center">
                  <Octicons name="search" size={20} color={'#DCDCDC'} />
                </View>
                <TextInput
                  placeholder='Buscar "Materia" o "Tema"'
                  className="py-5 bg-transparent flex-1"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 13,
                    color: '#B4BDC4',
                  }}
                />
              </View>
            </View>
            {/* Lista de Clases */}
            {/* Contenedor principal */}
            <ScrollView
              className="px-5 flex-1"
              showsVerticalScrollIndicator={false}
            >
              <View className="w-full bg-white rounded-2xl shadow-lg shadow-gray-300 mb-10">
                {classeInCourse.length > 0 ? (
                  classeInCourse.map((currentClass, index) => (
                    <View
                      className="border-b border-[#E8F1FF] px-5 "
                      key={currentClass.id}
                    >
                      {/* Header */}
                      <TouchableOpacity
                        className="flex flex-row items-center justify-between pt-5"
                        onPress={() =>
                          goToClass(currentClass.id, currentClass.topic)
                        }
                      >
                        <View className="flex flex-row items-center gap-1">
                          <Text
                            style={{
                              fontFamily: 'Jost_600SemiBold',
                              fontSize: 14,
                              color: '#202244',
                            }}
                          >
                            Clase 0{index + 1} -
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Jost_600SemiBold',
                              fontSize: 14,
                              color: '#741D1D',
                            }}
                          >
                            {currentClass.topic}
                          </Text>
                        </View>
                        {currentClass.Topics &&
                          currentClass.Topics.length > 0 && (
                            <Text
                              style={{
                                fontFamily: 'Mulish_800ExtraBold',
                                fontSize: 12,
                                color: '#741D1D',
                              }}
                            >
                              {lectureUtils.getTotalEstimatedReadingTime(
                                currentClass
                              )}{' '}
                              Mins
                            </Text>
                          )}
                      </TouchableOpacity>

                      {/* Topics */}

                      {currentClass.Topics && currentClass.Topics.length > 0 ? (
                        currentClass.Topics.map((topic, index) => (
                          <View className="flex flex-col">
                            <View className="flex flex-row items-center justify-between py-5">
                              <View className="flex flex-row items-center gap-2">
                                <View className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F5F9FF]">
                                  <Text
                                    style={{
                                      fontFamily: 'Jost_600SemiBold',
                                      fontSize: 14,
                                      color: '#202244',
                                    }}
                                  >
                                    0{index + 1}
                                  </Text>
                                </View>

                                {/* Title Container */}
                                <View className="flex flex-col justify-center">
                                  {/* Title */}
                                  <Text
                                    style={{
                                      fontFamily: 'Jost_600SemiBold',
                                      fontSize: 14,
                                      color: '#202244',
                                    }}
                                  >
                                    {topic.title}
                                  </Text>
                                  {/* Time Reader Lecture */}
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
                                    Mins
                                  </Text>
                                </View>
                              </View>

                              <TouchableOpacity
                                className="flex justify-start items-start"
                                onPress={toggleContentTopicModal}
                              >
                                <Octicons
                                  name="eye"
                                  size={22}
                                  color="#741D1D"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))
                      ) : (
                        <TouchableOpacity
                          className="my-5  border border-dashed border-gray-200 flex justify-center items-center py-3 bg-[#F5F9FF] rounded-lg px-5"
                          onPress={() => openTopicModal(currentClass.id)}
                        >
                          <Text
                            style={{
                              fontFamily: 'Jost_700Bold',
                              fontSize: 12,
                              color: '#202244',
                            }}
                          >
                            Clase sin contenido
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Mulish_400Regular',
                              fontSize: 11,
                              color: '#545454',
                              textAlign: 'center',
                            }}
                          >
                            Agrega contenido a tu clase para que tus estudiantes
                            puedan encontrarlo
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))
                ) : (
                  <View className="py-5 w-[90%] mx-auto border border-dashed border-gray-200">
                    <Text>No hay clases</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        ))}

      <AddClass
        isVisible={isVisible}
        toggleModal={toggleModal}
        CourseId={courseId}
      />

      {/* Modal para mostrar el contenido de un tema dentro de la clase */}

      <ContentTopicModal
        showContentTopicModal={showContentTopicModal}
        toggleContentTopicModal={toggleContentTopicModal}
      />

      {/* Agregar contenido a la clase */}
      <TopicModal
        showTopicModal={showTopicModal}
        toggleTopicModal={toggleTopicModal}
        ClassId={ClassId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#741D1D',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ClassesByCourse
