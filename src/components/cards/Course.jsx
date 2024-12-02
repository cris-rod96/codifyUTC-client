import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import image from '../../../assets/web-dev.jpg'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { msgUtil } from '../../utils/index.utils'

const Course = ({ course }) => {
  const navigation = useNavigation()

  const shareOnWhatsApp = () => {
    const msg = msgUtil.messageWhatsapp(course, 'Tu profesor')
    const url = `whatsapp://send?text=${encodeURIComponent(msg)}`

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url)
        } else {
          Alert.alert('Error', 'No se pudo abrir WhatsApp.')
        }
      })
      .catch((err) => console.error(err))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Meses de 0 a 11, por eso sumamos 1
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <View className="flex flex-col w-full mb-10 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-lg">
      {/* Header */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailCourse', {
            courseName: course.subject,
          })
        }
      >
        <View className="h-[180px] w-full relative bg-red-500 rounded-t-xl overflow-hidden">
          <Image
            source={course.poster ? { uri: course.poster } : image}
            className="absolute w-full h-full object-cover rounded-t-xl"
          />
        </View>
      </TouchableOpacity>

      {/* Contenido */}
      <View className="flex flex-col gap-3 px-6 py-4">
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
              fontWeight: '600',
            }}
          >
            {course.subject}
          </Text>
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 14,
              color: '#A6A6A6',
              fontWeight: '500',
            }}
          >
            {course.semester} Sistemas
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Ionicons name="people-circle-sharp" size={22} color={'#202244'} />
          <Text style={{ color: '#202244', fontFamily: 'Jost_600SemiBold' }}>
            Estudiantes: <Text style={{ fontWeight: 'bold' }}>20</Text>
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Ionicons name="book-sharp" size={22} color={'#202244'} />
          <Text style={{ color: '#202244', fontFamily: 'Jost_600SemiBold' }}>
            Clases: <Text style={{ fontWeight: 'bold' }}>20</Text>
          </Text>
        </View>

        {/* Nuevo contenido adicional */}
        <View className="flex flex-row items-center gap-2">
          <Ionicons name="key" size={22} color={'#202244'} />
          <Text style={{ color: '#202244', fontFamily: 'Jost_600SemiBold' }}>
            Código de Acceso:{' '}
            <Text style={{ fontWeight: 'bold' }}>{course.access_code}</Text>
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Ionicons name="calendar" size={22} color={'#202244'} />
          <Text style={{ color: '#202244', fontFamily: 'Jost_600SemiBold' }}>
            Fecha de Creación:{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {formatDate(course.created_at)}
            </Text>
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Ionicons name="albums" size={22} color={'#202244'} />
          <Text style={{ color: '#202244', fontFamily: 'Jost_600SemiBold' }}>
            Sección:{' '}
            <Text style={{ fontWeight: 'bold' }}>{course.section}</Text>
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View className="flex flex-row justify-between w-full  ">
        {/* Botón Compartir */}
        <TouchableOpacity
          className="w-1/2 py-3 flex flex-row items-center justify-center bg-[#25D366] "
          onPress={shareOnWhatsApp}
        >
          <Ionicons name="logo-whatsapp" color="white" size={20} />
          <Text style={{ color: 'white', fontFamily: 'Jost_600SemiBold' }}>
            Compartir
          </Text>
        </TouchableOpacity>

        {/* Botón Eliminar */}
        <TouchableOpacity className="w-1/2 py-3 flex flex-row items-center justify-center bg-[#D32F2F] ">
          <Ionicons name="trash" color="white" size={20} />
          <Text style={{ color: 'white', fontFamily: 'Jost_600SemiBold' }}>
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Course
