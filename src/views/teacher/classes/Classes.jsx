import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native'
import { useSelector } from 'react-redux'
import { classesAPI } from 'api/index.api'
import { useLoading } from 'context/LoadingContext'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import { FontAwesome6, Octicons } from '@expo/vector-icons'

const Classes = () => {
  const { showLoading, hideLoading } = useLoading()
  const [courses, setCourses] = useState()
  const [selectedFilter, setSelectedFilter] = useState('Todos')
  const [isMounted, setIsMounted] = useState(false)
  const [classes, setClasses] = useState([])
  const { user } = useSelector((state) => state.user)

  const handleSelectedFilter = (item) => {
    setSelectedFilter(item === selectedFilter ? null : item)
  }

  // Modal para agregar una clase
  const openClassModal = () => {}

  useEffect(() => {
    // showLoading('Cargando clases. Espere un momento...')
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
        .catch((err) => {})
        .finally(() => {
          // hideLoading()
          setIsMounted(true)
        })
    }
  }, [user])

  if (!isMounted) {
    return <View className="flex-1 h-screen w-full bg-[#F5F9FF]"></View>
  }
  return (
    isMounted &&
    (classes.length > 0 ? (
      <View className="flex-1 bg-[#F5F9FF] px-5 pt-5 flex-col py-10">
        {/* Buscador y Filtros */}
        <View className="flex flex-col gap-1">
          {/* Buscador */}
          <View className="flex flex-row pl-3 bg-white border border-gray-200 rounded-2xl h-[55px] overflow-hidden mb-5">
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
          <View className="px-2 mb-10">
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
            contentContainerStyle={{ paddingBottom: 80 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className="bg-white border border-gray-200 rounded-2xl mb-10 overflow-hidden"
                onLongPress={() => Alert.alert('Deseas eliminar este curso')}
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
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 12,
                      color: '#F5F9FF',
                    }}
                  >
                    3 Mins
                  </Text>
                </View>
                {item.Topics.length > 0 ? (
                  <View className="flex flex-col">
                    {item.Topics.map((topic, index) => (
                      <View
                        className="p-5 flex flex-row items-center justify-between border-b border-gray-200"
                        onLongPress={() => console.log('Presionado largo')}
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
                          <TouchableOpacity>
                            <FontAwesome6
                              name="edit"
                              size={16}
                              color="#167F71"
                            />
                          </TouchableOpacity>

                          <TouchableOpacity>
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
                  <View className="p-5">
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
                        Agrega contenido a tu clase para que tus estudiantes las
                        vean.
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    ) : (
      <View className="flex-1 bg-[#F5F9FF] justify-center items-center px-5">
        <TouchableOpacity
          className="w-full bg-white border border-dashed border-gray-200 rounded-xl px-5 py-10 shadow-lg shadow-[#741D1D]"
          onPress={() => openClassModal()}
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
            Agrega clases a tus cursos para que los estudiantes puedan verlas
          </Text>
        </TouchableOpacity>
      </View>
    ))
  )
}

export default Classes
