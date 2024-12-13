import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Loading from '../../../components/loading/Loading'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { lectureUtils } from '../../../utils/index.utils'
import { classesAPI } from '../../../api/classes/classes.api'

const Classes = () => {
  const [classes, setClasses] = useState([])
  const { user } = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { id } = user
    classesAPI
      .getByUser(id)
      .then((res) => {
        const { classes: arrClasses } = res.data
        setClasses(arrClasses)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [user.id])
  return isLoading ? (
    <Loading message={'Cargando clases..'} />
  ) : (
    <View className="bg-[#F5F9FF] flex-1 px-5 pt-10">
      {/* Floating Button */}
      <TouchableOpacity className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300">
        <Ionicons name="add" size={25} color={'white'} />
      </TouchableOpacity>

      {classes.length > 0 ? (
        <View className="flex-1 flex-col w-full ">
          {/* BUSCADOR */}
          <View className="w-full flex flex-row items-center bg-white border border-gray-200 rounded-2xl px-2 shadow-lg shadow-gray-300 mb-10 ">
            <View className="w-8 h-8 flex items-center justify-center">
              <MaterialIcons name="search" size={20} color={'#DCDCDC'} />
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
          {/* Lista de Clases */}
          {/* Contenedor principal */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="w-full bg-white rounded-2xl shadow-lg shadow-gray-300 mb-10">
              {classes.length > 0 ? (
                classes.map((currentClass, index) => (
                  <View className="border-b border-[#E8F1FF]">
                    {/* Nombre de la clase */}
                    <View className="w-full flex items-center justify-center h-[50px] bg-[#741D1D]">
                      <Text
                        style={{
                          fontFamily: 'Jost_700Bold',
                          fontSize: 16,
                          color: 'white',
                        }}
                      >
                        {currentClass.courseName}
                      </Text>
                    </View>
                    <View className="px-5 " key={index}>
                      {/* Header */}

                      <TouchableOpacity
                        className="flex flex-row items-center justify-between pt-5"
                        // onPress={() =>
                        //   goToClass(currentClass.id, currentClass.topic)
                        // }
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
                                // onPress={toggleContentTopicModal}
                              >
                                <Ionicons
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
                          // onPress={() => openTopicModal(currentClass.id)}
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
      ) : (
        <TouchableOpacity className="flex flex-col items-center bg-white p-6 rounded-lg border border-dashed border-gray-300">
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 15,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            Aún no tienes clases agregadas
          </Text>
          <Text
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
      )}
    </View>
  )
}

export default Classes
