import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import LottieView from 'lottie-react-native'
import congrats from 'assets/congrats.json'
import loadingAnimation from 'assets/loading.json'
import noRegisterAnimation from 'assets/no-register.json'
import errorAnimation from 'assets/error.json'

import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const CongratsActivity = ({
  isVisible,
  onClose,
  loading,
  success,
  classId,
}) => {
  const { classes } = useSelector((state) => state.teacher)
  const [currentClassName, setCurrentClassName] = useState('')
  const navigation = useNavigation()

  const handleClose = () => {
    onClose()
    navigation.navigate()
  }
  useEffect(() => {
    if (classId) {
      const currentClass = classes.find((curent) => curent.id === classId)
      setCurrentClassName(currentClass.topic)
    }
  }, [classId])
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {loading ? (
        <View className="flex-1 bg-[#F5F9FF] flex justify-center items-center px-6">
          <LottieView
            loop
            autoPlay
            source={loadingAnimation}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 15,
              color: '#202244',
            }}
          >
            Creando actividad. Espere un momento...
          </Text>
        </View>
      ) : success ? (
        <View className="flex-1 bg-[#F5F9FF] flex justify-center items-center px-10">
          <LottieView
            loop
            autoPlay={true}
            source={congrats}
            style={{ width: 200, height: 200 }}
          />

          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 20,
              color: '#222044',
              marginTop: 20,
            }}
          >
            ¡Bien hecho!
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 15,
            }}
            className="text-gray-400 mt-2 text-center"
          >
            La Actividad se ha creado con éxito
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 12,
              color: '#741D1D',
            }}
            className="text-gray-400 mt-2 text-center"
          >
            Ahora tus estudiantes podrán aprender jugando.
          </Text>

          <TouchableOpacity className="mt-10 w-full bg-[#741D1D] py-4 rounded-full flex items-center justify-center relative">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: 'white',
              }}
            >
              Continuar
            </Text>

            <Octicons
              name="chevron-right"
              size={20}
              color={'white'}
              className="absolute right-8"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 bg-[#F5F9FF] flex justify-center items-center px-10">
          <LottieView
            loop
            autoPlay
            source={errorAnimation}
            style={{
              width: 300,
              height: 300,
            }}
          />
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 18,
              color: '#202244',
            }}
          >
            No se pudo crear la actividad
          </Text>
          <View className="w-full px-5 py-5 bg-white border-2 border-dashed border-gray-200 rounded-lg mt-6">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 14,
                color: '#202244',
                textAlign: 'center',
              }}
            >
              Ocurrió un error inesperado. Por favor intenta más tarde.
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 12,
                color: '#545454',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              Si el problema persiste. Contacte con un administrador.
            </Text>
          </View>

          <TouchableOpacity
            className="mt-10 w-full rounded-full py-4 bg-[#741D1D] relative flex items-center justify-center"
            onPress={() =>
              navigation.navigate('DetailClass', {
                screen: 'ActivitiesClass',
                class_name: currentClassName,
                id: classId,
              })
            }
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
              }}
            >
              Continuar
            </Text>

            <Octicons
              name="chevron-right"
              size={21}
              color={'white'}
              className="absolute right-6"
            />
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  )
}

export default CongratsActivity
