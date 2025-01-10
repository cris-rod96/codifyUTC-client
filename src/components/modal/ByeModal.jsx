import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import LottieView from 'lottie-react-native'
import rocket from 'assets/bye-rocket.json'
import { Octicons } from '@expo/vector-icons'

const ByeModal = ({ isVisible, onClose, toggleLeaveCourseModal }) => {
  const [loading, setLoading] = useState(true)
  const [showFarewell, setShowFarewell] = useState(false)

  const closeModals = () => {
    toggleLeaveCourseModal()
  }

  useEffect(() => {
    setLoading(true)
    setShowFarewell(false)
    setTimeout(() => {
      setLoading(false)
      setShowFarewell(true)
    }, 2500)
  }, [])
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View className="flex-1 bg-[#F5F9FF] flex justify-center items-center px-6">
        {loading && (
          <View className="flex flex-col gap-3 justify-center items-center">
            <ActivityIndicator size={'large'} color={'#741D1D'} />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 14,
                color: '#202244',
              }}
            >
              Abandonando el curso espere un momento...
            </Text>
          </View>
        )}

        {showFarewell && (
          <View className="flex flex-col gap-2 px-5 w-full">
            <LottieView
              autoPlay
              loop
              source={rocket}
              style={{
                width: 250,
                height: 250,
              }}
            />

            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 15,
                color: '#202244',
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              Cada paso, incluso uno hacia atrás, forma parte de tu camino de
              aprendizaje.
            </Text>

            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 13,
                color: '#545454',
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              Adiós y ¡Gracias por formar parte de esta experiencia!
            </Text>

            <TouchableOpacity
              className="relative bg-[#741D1D]  rounded-full py-4 flex flex-row items-center justify-center mt-10"
              onPress={closeModals}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                Continuar
              </Text>
              <Octicons
                name="chevron-right"
                size={20}
                color={'white'}
                className="absolute right-5"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  )
}

export default ByeModal
