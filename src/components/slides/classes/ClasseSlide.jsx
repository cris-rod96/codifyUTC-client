import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import program from 'assets/programacion.jpg'
import { useNavigation } from '@react-navigation/native'

const ClassesSlide = () => {
  const navigation = useNavigation()
  const { classes } = useSelector((state) => state.teacher)
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewClasses = () => {
    navigation.navigate('TabClass')
  }

  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date)
    } else if (!(date instanceof Date)) {
      throw new Error('Fecha inválida')
    }

    return date
      .toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .reverse()
      .join('-') // Convertir a formato YYYY-MM-DD
  }

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
          <TouchableOpacity
            className="w-fit flex flex-row items-center"
            onPress={viewClasses}
          >
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
              className="flex flex-col w-[250px]  bg-white mr-4 rounded-xl border border-gray-200"
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
              <View className="w-full h-[125px] rounded-t-xl relative overflow-hidden">
                <Image
                  source={program}
                  className="absolute w-full h-full object-contain"
                  resizeMode="cover"
                />
              </View>

              {/* Detalles del curso */}
              <View className="py-3 px-3">
                <Text
                  style={{
                    fontFamily: 'Jost_700Bold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {item.topic}
                </Text>
                <View className="flex flex-row items-center gap-2">
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 12,
                      color: '#202244',
                    }}
                  >
                    Fecha de creación:
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 12,
                      color: '#888888',
                    }}
                  >
                    {formatDate(item.created_at)}
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
