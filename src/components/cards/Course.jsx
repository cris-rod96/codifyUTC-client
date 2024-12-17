import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome, Ionicons, Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { msgUtil, storageUtil } from 'utils/index.utils'
import { useEffect, useState } from 'react'

const Course = ({ course, deleteCourse }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const navigation = useNavigation()
  const shareOnWhatsApp = () => {
    const msg = msgUtil.messageWhatsapp(course, currentUser.full_name)
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url)
        } else {
          Alert.alert('Oops!', 'No se pudo abrir WhatsApp')
        }
      })
      .catch((err) => {
        console.log(err)
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

  const handleDeleteCourse = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este curso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteCourse(course.id),
        },
      ]
    )
  }

  useEffect(() => {
    storageUtil.getSecureData('session_info').then((res) => {
      const { user } = JSON.parse(res)
      setCurrentUser(user)
    })
  }, [])

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-white rounded-lg shadow-lg p-4 m-2"
      onPress={() => navigation.navigate('DetailCourse', { course })}
    >
      {/* FOTO DEL CURSO */}
      <Image
        source={{ uri: course.poster }}
        className="h-48 w-full rounded-lg mb-4 shadow-md"
        resizeMode="cover"
      />

      {/* Información principal */}
      <View className="mb-4">
        <View className="flex flex-row items-start justify-between mb-3">
          <View>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#545454',
              }}
            >
              {course.semester} Semestre
            </Text>
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#333',
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
                color: '#555',
              }}
            >
              {course.section}
            </Text>
          </View>
        </View>

        {/* Información visual */}
        <View className="flex flex-row gap-2">
          {/* Tarjeta Estudiantes */}
          <View className="flex flex-col justify-center items-center border border-gray-200 p-2 w-[48%] bg-gray-50 rounded-md shadow-sm">
            <Octicons name="people" size={24} color="#333" />
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
              Estudiantes
            </Text>
          </View>
          {/* Tarjeta Clases */}
          <View className="flex flex-col justify-center items-center border border-gray-200 p-2 w-[48%] bg-gray-50 rounded-md shadow-sm">
            <Octicons name="stack" size={24} color="#333" />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
              }}
            >
              {course.Classes.length}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
              }}
            >
              Clases
            </Text>
          </View>
        </View>

        {/* Código de acceso */}
        <View className="flex flex-col justify-center items-center border border-gray-300 p-2 mt-3 bg-gray-100 rounded-md shadow-sm">
          <Octicons name="key" size={22} color="#741D1D" />
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

      {/* Acciones */}
      <View className="flex-row justify-between mt-2 gap-2">
        {/* Botón Compartir */}
        <TouchableOpacity
          className="bg-green-600 p-2 rounded-lg flex-row items-center flex-auto shadow-md justify-center gap-2"
          onPress={shareOnWhatsApp}
        >
          <Octicons name="share-android" size={18} color="white" />
          <Text
            style={{
              fontFamily: 'Mulish_500Medium',
              color: 'white',
            }}
          >
            Compartir
          </Text>
        </TouchableOpacity>

        {/* Botón Eliminar */}
        <TouchableOpacity
          className="bg-red-600 p-2 rounded-lg flex-row items-center flex-auto shadow-md justify-center gap-2"
          onPress={handleDeleteCourse}
        >
          <Octicons name="trash" size={20} color="white" />
          <Text
            style={{
              fontFamily: 'Mulish_500Medium',
              color: 'white',
            }}
          >
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default Course
