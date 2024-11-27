import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import profile from '../../../assets/profile.png'
import { Ionicons } from '@expo/vector-icons'
const Home = () => {
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const data = [
    { id: '1', text: 'Slide 1' },
    { id: '2', text: 'Slide 2' },
    { id: '3', text: 'Slide 3' },
    { id: '4', text: 'Slide 4' },
  ]

  const classes = [
    {
      id: '1',
      text: 'Slide 1',
      activitiesCount: 5,
      creationDate: '2024-03-01',
    },
    {
      id: '2',
      text: 'Slide 2',
      activitiesCount: 3,
      creationDate: '2024-02-15',
    },
    {
      id: '3',
      text: 'Slide 3',
      activitiesCount: 8,
      creationDate: '2024-01-20',
    },
    {
      id: '4',
      text: 'Slide 4',
      activitiesCount: 2,
      creationDate: '2023-12-05',
    },
  ]

  const activities = [
    {
      id: '1',
      coverImage: 'https://via.placeholder.com/250',
      activityType: 'Quizz Code',
      creationDate: '2024-11-20',
      deadline: '2024-11-30 23:59',
      className: 'Programación Web',
      studentsCompleted: 15,
      status: 'Abierto',
    },
    {
      id: '2',
      coverImage: 'https://via.placeholder.com/250',
      activityType: 'Puzzle',
      creationDate: '2024-10-15',
      deadline: '2024-10-25 18:00',
      className: 'Estructuras de Datos',
      studentsCompleted: 10,
      status: 'Cerrada',
    },
    {
      id: '3',
      coverImage: 'https://via.placeholder.com/250',
      activityType: 'Puzzle',
      creationDate: '2024-10-15',
      deadline: '2024-10-25 18:00',
      className: 'Estructuras de Datos',
      studentsCompleted: 10,
      status: 'Cerrada',
    },
    {
      id: '4',
      coverImage: 'https://via.placeholder.com/250',
      activityType: 'Puzzle',
      creationDate: '2024-10-15',
      deadline: '2024-10-25 18:00',
      className: 'Estructuras de Datos',
      studentsCompleted: 10,
      status: 'Cerrada',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
    }, 3000)

    return () => clearInterval(timer) // Limpia el temporizador al desmontar
  }, [data.length])

  useEffect(() => {
    if (flatListRef.current && currentIndex < data.length) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      })
    }
  }, [currentIndex])

  return (
    <ScrollView>
      <View className="flex flex-col gap-10 p-5 bg-[#F5F9FF] ">
        {/* Encabezado */}
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 24,
                color: '#202244',
              }}
            >
              Hola, Cristhian
            </Text>

            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: '#545454',
              }}
            >
              Bienvenido a Codify UTC
            </Text>
          </View>

          <View className="w-12 h-12 rounded-full bg-red-400 relative overflow-hidden">
            <Image
              source={profile}
              className="absolute w-full h-full object-cover"
            />
          </View>
        </View>

        {/* Sección de cursos */}
        <View className="flex flex-col gap-3 w-full">
          <View className="flex flex-row items-center w-full justify-between ">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Mis cursos
            </Text>
            <TouchableOpacity className="w-fit flex flex-row items-center ">
              <Text
                style={{
                  fontFamily: 'Mulish_800ExtraBold',
                  fontSize: 12,
                  color: '#0961F5',
                  textAlign: 'center',
                }}
              >
                Ver todos
              </Text>

              <Ionicons name="chevron-forward" size={16} color="#0961F5" />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialNumToRender={1} // Renderiza solo el primer elemento inicialmente
            windowSize={3} // Carga solo los elementos cercanos
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                className="flex flex-col w-[250px] h-[150px] bg-white mr-4 rounded-xl border border-gray-200"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2, // Sombras ligeras para Android
                }}
              >
                {/* Imagen del curso */}
                <View className="w-full h-[75px] bg-red-400 rounded-t-xl"></View>

                {/* Detalles del curso */}
                <View className="py-3 px-3 flex-1">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: '#202244',
                    }}
                  >
                    {item.text}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 12,
                      color: '#545454',
                    }}
                  >
                    Programación Web
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_400Regular',
                      fontSize: 12,
                      color: '#888888',
                    }}
                  >
                    20 estudiantes
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Sección de clases */}
        <View className="flex flex-col gap-3">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
            }}
          >
            Mis clases
          </Text>

          <FlatList
            data={classes}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialNumToRender={1} // Renderiza solo el primer elemento inicialmente
            windowSize={3} // Carga solo los elementos cercanos
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                className="flex flex-col w-[250px] h-[150px] bg-white mr-4 rounded-xl border border-gray-200"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2, // Sombras ligeras para Android
                }}
              >
                {/* Imagen del curso */}
                <View className="w-full h-[75px] bg-red-400 rounded-t-xl"></View>

                {/* Detalles del curso */}
                <View className="py-3 px-3 flex-1">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: '#202244',
                    }}
                  >
                    {item.text}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 12,
                      color: '#545454',
                    }}
                  >
                    {item.activitiesCount} actividades
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_400Regular',
                      fontSize: 12,
                      color: '#888888',
                    }}
                  >
                    Fecha de creación: {item.creationDate}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        {/* Sección de Actividades */}
        <View className="flex flex-col gap-3">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
            }}
          >
            Actividades
          </Text>

          <FlatList
            data={activities}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialNumToRender={1} // Renderiza solo el primer elemento inicialmente
            windowSize={3} // Carga solo los elementos cercanos
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                className="flex flex-col w-[250px] h-auto bg-white mr-4 rounded-xl border border-gray-200 relative"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2, // Sombras ligeras para Android
                }}
              >
                {/* Imagen del curso */}
                <View className="w-full h-[100px] bg-red-400 rounded-t-xl"></View>

                {/* Detalles del curso */}
                <View className="py-3 px-3 flex-1 w-full">
                  <View className="flex flex-row justify-between items-center">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 16,
                        color: '#202244',
                      }}
                    >
                      {item.activityType}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Mulish_800ExtraBold',
                        fontSize: 12,
                        color: '#202244',
                      }}
                    >
                      {item.creationDate}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 12,
                        color: '#545454',
                      }}
                    >
                      Fecha Límite:
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 10,
                        color: '#545454',
                      }}
                    >
                      {item.deadline}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 12,
                        color: '#545454',
                      }}
                    >
                      Clase:
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 10,
                        color: '#545454',
                      }}
                    >
                      {item.className}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 12,
                        color: '#545454',
                      }}
                    >
                      Participantes:
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 10,
                        color: '#545454',
                      }}
                    >
                      {item.studentsCompleted}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 12,
                        color: '#545454',
                      }}
                    >
                      Estado:
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 10,
                        color: '#545454',
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Home
