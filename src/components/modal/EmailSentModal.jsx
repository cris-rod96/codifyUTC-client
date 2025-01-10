import { Modal, Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import animation from 'assets/email-sent.json'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const EmailSentModal = ({ isVisible, toggleModal, user }) => {
  const navigation = useNavigation()

  const onContinue = () => {
    navigation.navigate('ActivationCode', {
      email: user.email,
      full_name: user.full_name,
    })
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleModal}
    >
      <View className="flex-1 bg-[#F5F9FF] flex flex-col justify-center items-center px-8">
        <LottieView
          autoPlay
          loop
          source={animation}
          style={{
            width: 150,
            height: 150,
          }}
        />

        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 18,
            color: '#202244',
          }}
        >
          ¡Ya casi estás listo!
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 15,
            color: '#545454',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          Hemos enviado un código de activación a tu correo electrónico. Por
          favor, revisa tu bandeja de entrada y sigue las instrucciones para
          activar tu cuenta.
        </Text>

        <TouchableOpacity
          className="mt-10 py-4 bg-[#741D1D] w-full rounded-full flex items-center justify-center border border-gray-200 relative"
          onPress={onContinue}
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
            size={25}
            color={'white'}
            className="absolute right-7"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default EmailSentModal
