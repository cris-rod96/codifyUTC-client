import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

const ActivitiesSlide = () => {
  const activities = []
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [activities.length])

  useEffect(() => {
    if (flatListRef.current && currentIndex < activities.length) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      })
    }
  }, [currentIndex])

  return (
    <View className="flex flex-col gap-3 w-full">
      {/* Encabezado común */}
      <View className="flex flex-row items-center w-full justify-between">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: '#202244',
          }}
        >
          Mis actividades
        </Text>
        {activities.length > 0 && (
          <TouchableOpacity className="w-fit flex flex-row items-center">
            <Text
              style={{
                fontFamily: 'Mulish_800ExtraBold',
                fontSize: 12,
                color: '#0961F5',
                textAlign: 'center',
              }}
            >
              Ver todas
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#0961F5" />
          </TouchableOpacity>
        )}
      </View>

      {/* Contenido condicional */}
      {activities.length > 0 ? (
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
      ) : (
        <TouchableOpacity className="items-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
          <Text
            className="mb-2"
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 15,
              color: '#202244',
            }}
          >
            Aún no tienes actividades creadas
          </Text>
          <Text
            className="mb-4"
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 12,
              color: '#545454',
            }}
          >
            Presiona para agregar tu primer actividad.
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ActivitiesSlide
