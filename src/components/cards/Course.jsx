import { Image, Text, TouchableOpacity, View } from 'react-native'
import image from '../../../assets/web-dev.jpg'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const Course = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      className="flex flex-row w-full border border-gray-200 rounded-2xl shadow-lg shadow-gray-300 h-[180px] bg-white overflow-hidden mb-5"
      onPress={() =>
        navigation.navigate('DetailCourse', {
          courseName: 'Informática',
        })
      }
      onLongPress={() => alert('Adios')}
    >
      <View className="w-[50%] h-full relative">
        <Image source={image} className="absolute w-full h-full object-cover" />
      </View>
      <View className="w-full p-3 flex flex-col gap-2">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 12,
            color: '#FF6B00',
          }}
        >
          Desarrollo Web
        </Text>

        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 14,
            color: '#202244',
          }}
        >
          Tercero Sistemas "A"
        </Text>

        <View className="flex flex-row items-center gap-3">
          <Ionicons name="calendar-clear-outline" size={16} color={'#202244'} />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
              color: '#202244',
            }}
          >
            Matutina
          </Text>
        </View>
        <View className="flex flex-row items-center gap-3">
          <Ionicons name="time-outline" size={16} color={'#202244'} />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
              color: '#202244',
            }}
          >
            08:00 - 10:00
          </Text>
        </View>

        <View className="flex flex-row items-center gap-3">
          <Ionicons name="book-outline" size={16} color={'#202244'} />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
              color: '#202244',
            }}
          >
            10 clases
          </Text>
        </View>

        <View className="flex flex-row items-center gap-3">
          <Ionicons name="people-outline" size={16} color={'#202244'} />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
              color: '#202244',
            }}
          >
            19 estudiantes
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Course
