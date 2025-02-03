import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import courseImage from 'assets/web-dev.jpg'
import { useNavigation } from '@react-navigation/native'

const CoursesSlide = () => {
  const navigation = useNavigation()
  const { courses } = useSelector((state) => state.teacher)
  const flatListRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewAllCourses = () => {
    navigation.navigate('TabCourse')
  }

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
          Cursos
        </Text>

        {courses.length > 0 && (
          <TouchableOpacity
            className="w-fit flex flex-row items-center"
            onPress={viewAllCourses}
          >
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
              className="flex flex-col w-[250px] h-auto  bg-white mr-4 rounded-xl border border-gray-200 relative"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
              key={item.id}
            >
              <View className="w-full h-[125px] bg-red-400 rounded-t-xl relative overflow-hidden">
                <Image
                  className="absolute w-full h-full object-contain"
                  resizeMode="cover"
                  source={item.poster ? { uri: item.poster } : courseImage}
                />
              </View>
              <View className="py-3 px-3  relative">
                <Text
                  style={{
                    fontFamily: 'Jost_700Bold',
                    fontSize: 14,
                    color: '#202244',
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
                  {item.Students.length === 1
                    ? '1 estudiante'
                    : `${item.Students.length} estudiantes`}
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
