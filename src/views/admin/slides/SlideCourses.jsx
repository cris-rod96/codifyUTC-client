import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import logoDefault from 'assets/bg-tech.jpg'

const SlideCourses = () => {
  const navigation = useNavigation()
  const { courses } = useSelector((state) => state.admin)

  const viewAllCourses = () => {
    navigation.navigate('CoursesAdmin')
  }

  const renderCourse = ({ item }) => {
    return (
      <View className="flex flex-col w-[300px] h-auto bg-white mr-4  rounded-xl border border-gray-200 gap-1 overflow-hidden">
        {/* Poster */}
        <View className="relative w-full h-[180px]">
          <Image
            source={item.poster ? { uri: item.poster } : logoDefault}
            className="absolute w-full h-full object-cover"
            resizeMode="cove"
          />
        </View>

        <View className="px-3 py-5 flex flex-col">
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 16,
              color: '#202244',
            }}
          >
            {item.subject}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 14,
              color: '#202244',
            }}
          >
            {item.section}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
              color: '#202244',
            }}
          >
            {item.semester} Sistemas
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View className="flex flex-col gap-3 w-full">
      <View className="flex flex-row items-center w-full justify-between ">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: '#202244',
          }}
        >
          Cursos
        </Text>

        {courses && courses.length > 0 && (
          <TouchableOpacity
            className="w-fit flex flex-row items-center gap-2"
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
            <Octicons name="chevron-right" size={16} color="#0961F5" />
          </TouchableOpacity>
        )}
      </View>
      {courses && courses.length > 0 ? (
        <FlatList
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
          renderItem={renderCourse}
        />
      ) : (
        <View className="w-full bg-white px-3 py-5 border border-dashed border-gray-300 flex flex-col items-center justify-center rounded-xl">
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 13,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            No hay cursos creados
          </Text>
        </View>
      )}
    </View>
  )
}

export default SlideCourses
