import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import logoDefault from 'assets/bg-tech.jpg'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { msgUtil } from '../../utils/index.utils'
import { useSelector } from 'react-redux'
const Course = ({ course, onContinue }) => {
  const { user } = useSelector((state) => state.user)
  const navigation = useNavigation()

  const goToScreen = (tabName, screenName) => {
    navigation.navigate(tabName, {
      screen: screenName,
    })
  }

  const shareOnWP = () => {
    const msg = msgUtil.messageWhatsapp(course, user.full_name)
    const url = `whatsapp://send?text=${encodeURIComponent(msg)}`

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url)
        } else {
          console.log('Error al compartir')
        }
      })
      .catch((err) => {
        console.log('No se puede compartir en estos momentos')
      })
  }

  const goToCourseDetail = (id, subject) => {
    navigation.navigate('DetailCourse', {
      courseId: id,
      courseName: subject,
    })
  }

  const getIconSection = (section) => {
    switch (section) {
      case 'Matutina':
        return <Ionicons name="sunny" size={16} color={'gold'} />
      case 'Vespertina':
        return <Ionicons name="partly-sunny" size={16} color={'#FFA500'} />
      case 'Nocturna':
        return <Ionicons name="moon" size={16} color="darkblue" />
    }
  }
  return (
    <View className="w-full bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* Foto del curso */}
      <View className="w-full h-[180px] relative mb-3">
        <Image
          source={course.poster ? { uri: course.poster } : logoDefault}
          className="w-full h-full absolute object-contain"
          resizeMode="cover"
        />
      </View>

      {/* Información General */}
      <View className="flex flex-col px-3 mb-3">
        <View className="flex flex-row items-start justify-between mb-3">
          <View className="flex flex-col">
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 13,
                color: '#888',
              }}
            >
              {course.semester} Semestre
            </Text>

            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 16,
                color: '#202244',
              }}
            >
              {course.subject}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            {getIconSection(course.section)}
            <Text
              style={{
                fontFamily: 'Mulish_500Medium',
                color: '#888',
                fontSize: 13,
              }}
            >
              {course.section}
            </Text>
          </View>
        </View>

        {/* Tarjetas */}
        <View className="flex flex-row gap-2 justify-between">
          <TouchableOpacity
            className="flex flex-col justify-center items-center border border-gray-200 w-[48%] p-2 bg-gray-50 rounded-md relative"
            onPress={() => goToScreen('TeacherStudents', 'Students')}
          >
            <Octicons
              name="people"
              size={18}
              color={'#333'}
              className="absolute top-2 left-2"
            />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
              }}
            >
              {course.Students.length}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
              }}
            >
              {course.Students.length === 1 ? 'Alumno' : 'Alumnos'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col justify-center items-center border border-gray-200 w-[48%] p-2 bg-gray-50 rounded-md relative"
            onPress={() => goToScreen('TabClass', 'Classes')}
          >
            <Octicons
              name="stack"
              size={18}
              color={'#333'}
              className="absolute top-2 left-2"
            />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
              }}
            >
              {course.Classes.filter((cls) => !cls.isDeleted).length}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
              }}
            >
              {course.Classes.filter((cls) => !cls.isDeleted).length === 1
                ? 'Clase'
                : 'Clases'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cpodigo de acceso */}
        <View className="flex flex-col items-center justify-center border border-gray-200 p-2 mt-3 bg-gray-50 rounded-md relative">
          <Octicons
            name="lock"
            size={18}
            color={'333'}
            className="absolute top-3 left-3"
          />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 20,
              color: '#741D1D',
            }}
          >
            {course.access_code}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
            }}
          >
            Código de acceso
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-between">
        <TouchableOpacity
          className="flex flex-row  items-center justify-center bg-green-700 py-3 gap-2 flex-1"
          onPress={shareOnWP}
        >
          <Octicons name="share-android" size={18} color={'white'} />
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
            }}
          >
            Compartir
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row  items-center justify-center bg-purple-800 py-3 gap-2 flex-1"
          onPress={() => goToCourseDetail(course.id, course.subject)}
        >
          <Octicons name="pencil" size={18} color={'white'} />
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
            }}
          >
            Editar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Course
