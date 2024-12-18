import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

const CoursesSlide = () => {
  const { courses } = useSelector((state) => state.teacher)
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [courses.length])

  useEffect(() => {
    if (flatListRef.current && currentIndex < courses.length) {
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
          Mis cursos
        </Text>

        {courses.length > 0 && (
          <TouchableOpacity className="w-fit flex flex-row items-center">
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
        )}
      </View>

      {/* Contenido condicional */}
      {courses.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={courses}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          initialNumToRender={1}
          windowSize={3}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: 254,
            offset: 254 * index,
          })}
          renderItem={({ item }) => (
            <View
              className="flex flex-col w-[250px] h-[150px] bg-white mr-4 rounded-xl border border-gray-200"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="w-full h-[75px] bg-red-400 rounded-t-xl"></View>
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
                  {item.semester} Sistemas
                </Text>
                <Text
                  style={{
                    fontFamily: 'Mulish_400Regular',
                    fontSize: 12,
                    color: '#888888',
                  }}
                >
                  {item.Students.length} estudiantes
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
            Aún no tienes cursos agregados
          </Text>
          <Text
            className="mb-4"
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 12,
              color: '#545454',
            }}
          >
            Presiona para agregar tu primer curso.
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CoursesSlide
