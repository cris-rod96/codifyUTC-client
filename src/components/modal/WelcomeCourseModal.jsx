import { Modal, Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import welcome from 'assets/welcome.json'
import { Octicons } from '@expo/vector-icons'
const WelcomeCourseModal = ({ isVisible, updateClasses }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={updateClasses}
      animationType="fade"
    >
      <View className="flex-1 bg-[#F5F9FF] flex flex-col justify-center items-center gap-1">
        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 36,
            color: '#741D1D',
          }}
        >
          ¡Registro exitoso!
        </Text>
        <LottieView
          autoPlay
          loop
          source={welcome}
          style={{
            width: 250,
            height: 250,
          }}
        />
        <View className="px-5 flex flex-col items-center gap- justify-center w-full">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 17,
              color: '#202244',
            }}
          >
            Ahora formas parte de este curso
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 14,
              color: '#545454',
              textAlign: 'center',
            }}
          >
            Explora las clases y actividades que tu docente ha dejado para tu
            aprendizaje
          </Text>

          <TouchableOpacity
            className="w-full flex flex-row justify-center items-center py-4 bg-[#741D1D] rounded-full mt-10 relative"
            onPress={updateClasses}
          >
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
              size={21}
              color={'white'}
              className="absolute right-6"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default WelcomeCourseModal
