import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
} from 'react-native'
import { useSelector } from 'react-redux'
import { classesAPI } from 'api/index.api'
import { useLoading } from 'context/LoadingContext'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import { storageUtil } from '../../../utils/index.utils'
import { useNavigation } from '@react-navigation/native'
import DeleteQuestionModal from '../../../components/modal/DeleteQuestionModal'
import Toast from 'react-native-toast-message'
import toastConfig from '../../../config/toast/toast.config'
import ClassModal from '../../../components/modal/ClassModal'
import DetailClassTeacher from './DetailClassTeacher'

const Classes = ({ route }) => {
  const { user } = useSelector((state) => state.user)
  const { showLoading, hideLoading } = useLoading()
  const navigation = useNavigation()
  const [courses, setCourses] = useState()
  const [selectedFilter, setSelectedFilter] = useState('Todos')
  const [currentId, setCurrentId] = useState(null)
  const [model, setModel] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [classes, setClasses] = useState([])
  const [title, setTitle] = useState('')

  // Refreshing
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = () => {
    if (user) {
      const { id } = user
      classesAPI
        .getByUser(id)
        .then((res) => {
          const { classes } = res.data
          setClasses(classes)
          const arrCourses = []
          for (let myClass of classes) {
            if (!arrCourses.includes(myClass.courseName)) {
              arrCourses.push(myClass.courseName)
            }
          }
          setCourses(['Todos', ...arrCourses])
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          // hideLoading()
          setIsMounted(true)
          setRefreshing(false)
        })
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData()
  }, [])

  // Modal delete Topic
  const [showQuestionDeleteModal, setShowQuestionDeleteModal] = useState(false)
  const toggleShowQuestionDeleteModal = () =>
    setShowQuestionDeleteModal((prev) => !prev)

  const handleSelectedFilter = (item) => {
    setSelectedFilter(item === selectedFilter ? null : item)
  }

  const [showClassModal, setShowClassModal] = useState(false)
  const toggleClassModal = () => setShowClassModal((prev) => !prev)

  const deleteTopic = (id) => {
    toggleShowQuestionDeleteModal()
    setModel('topics')
    setCurrentId(id)
    setTitle('¿Realmente deseas eliminar este tema?')
  }
  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  const registerClassSuccess = (ok) => {
    if (ok) {
      onRefresh()
      showToast('success', 'Clase creada', 'Clase creada exitosamente.')
    }
  }

  const onContinue = (confirm) => {
    toggleShowQuestionDeleteModal()
    setTimeout(() => {
      if (confirm) {
        showToast(
          'success',
          'Contenido eliminado',
          'El contenido de la clase se ha eliminado'
        )
      } else {
        showToast('error', 'Error al eliminar', 'No se eliminó el contenido.')
      }
      onRefresh()
    }, 1500)
  }

  const deleteClass = (id) => {
    toggleShowQuestionDeleteModal()
    setModel('classes')
    setCurrentId(id)
    setTitle('¿Realmente deseas eliminar la clase?')
  }

  const viewClass = (id, name) => {
    navigation.navigate('DetailClassTeacher', {
      id: id,
      name: name,
    })
  }

  useEffect(() => {
    // showLoading('Cargando clases. Espere un momento...')
    fetchData()
  }, [])

  if (!isMounted) {
    return <View className="flex-1 h-screen w-full bg-[#F5F9FF]"></View>
  }

  return (
    <>
      {isMounted &&
        (classes.length > 0 ? (
          <View className="flex-1 bg-[#F5F9FF] flex-col pb-10">
            {/* Modal */}
            <DeleteQuestionModal
              isVisible={showQuestionDeleteModal}
              onClose={toggleShowQuestionDeleteModal}
              onContinue={onContinue}
              id={currentId}
              title={title}
              model={model}
            />
            {/* FloattingButton */}
            <TouchableOpacity
              className="bg-[#741D1D] w-12 h-12 rounded-full flex justify-center items-center absolute bottom-4 right-2 z-50 border border-gray-300"
              onPress={toggleClassModal}
            >
              <Octicons name="plus" size={18} color={'white'} />
            </TouchableOpacity>
            {/* Buscador y Filtros */}
            <View className="flex flex-col gap-1">
              {/* Buscador */}
              <View className="flex flex-row pl-3 bg-white border border-gray-200 h-[55px] overflow-hidden mb-5">
                <View className="w-8 flex justify-center items-center">
                  <Octicons name="search" size={20} color={'#000000'} />
                </View>
                <TextInput
                  placeholder="Buscar tema"
                  className="h-full bg-white w-full border-none px-2 placeholder:text-[#B4BDC4]"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 13,
                    color: '#202244',
                  }}
                />
              </View>

              {/* Filtros */}
              <View className="px-2 mb-3">
                <FlatList
                  data={courses}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    const isSelected = item === selectedFilter
                    return (
                      <TouchableOpacity
                        className={`px-5 py-2 mr-2 ${
                          isSelected ? 'bg-[#741D1D]' : 'bg-[#E8F1FF]' // Cambio de fondo no seleccionado
                        } rounded-full`}
                      >
                        <Text
                          style={{
                            fontFamily: 'Mulish_700Bold',
                            fontSize: 10,
                            color: isSelected ? 'white' : '#202244',
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* Lista de clases */}
              <FlatList
                data={classes}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 80,
                  paddingHorizontal: 10,
                }}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                }
                renderItem={({ item, index }) => (
                  <View
                    className="bg-white border border-gray-200 rounded-2xl mb-10 overflow-hidden"
                    onPress={() =>
                      navigation.navigate('DetailClass', {
                        class_id: item.id,
                        class_name: item.topic,
                      })
                    }
                    onLongPress={() =>
                      Alert.alert('Deseas eliminar este curso')
                    }
                  >
                    {/* Header */}
                    <View className="flex flex-row justify-between items-center px-5 py-4 bg-[#741D1D]">
                      <View className="flex flex-col">
                        <Text
                          style={{
                            fontFamily: 'Mulish_700Bold',
                            fontSize: 10,
                            color: '#E8F1FF',
                          }}
                        >
                          {item.courseName}
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
                          3 Mins
                        </Text>
                      )}
                    </View>
                    {item.Topics.length > 0 ? (
                      <View className="flex flex-col">
                        {item.Topics.map((topic, index) => (
                          <View className="p-5 flex flex-row items-center justify-between border-b border-gray-200">
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
                              <View className="flex flex-col">
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
                                  3 Mins
                                </Text>
                              </View>
                            </View>

                            <View className="flex flex-row gap-3 items-center justify-center">
                              <TouchableOpacity
                                onPress={() => deleteTopic(topic.id)}
                              >
                                <FontAwesome6
                                  name="trash"
                                  size={16}
                                  color="#741D1D"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <View className="">
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
                        onPress={() => deleteClass(item.id)}
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
          </View>
        ) : (
          <View className="flex-1 bg-[#F5F9FF] justify-center items-center px-5">
            <TouchableOpacity
              className="w-full bg-white border border-dashed border-gray-200 rounded-xl px-5 py-10 shadow-lg "
              onPress={toggleClassModal}
            >
              <LottieView
                source={emptyData}
                autoPlay
                loop
                style={{
                  width: 200,
                  height: 150,
                  margin: 'auto',
                }}
              />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Aún no tienes clases agregadas
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 13,
                  color: '#545454',
                  textAlign: 'center',
                }}
              >
                Agrega clases a tus cursos para que los estudiantes puedan
                verlas
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      <ClassModal
        isVisible={showClassModal}
        toggleModal={toggleClassModal}
        registerClassSuccess={registerClassSuccess}
      />
      <Toast config={toastConfig} position="bottom" />
    </>
  )
}

export default Classes
