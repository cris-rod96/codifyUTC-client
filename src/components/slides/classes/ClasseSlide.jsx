
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

const ClassesSlide = () => {
  const { classes } = useSelector((state) => state.teacher)
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % classes.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [classes.length])

  useEffect(() => {
    if (flatListRef.current && currentIndex < classes.length) {
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
          Mis clases
        </Text>

        {classes.length > 0 && (
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
      {classes.length > 0 ? (
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
              key={item.id}
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
            Aún no tienes clases agregadas
          </Text>
          <Text
            className="mb-4"
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 12,
              color: '#545454',
            }}
          >
            Presiona para agregar tu primer clase.
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ClassesSlide
