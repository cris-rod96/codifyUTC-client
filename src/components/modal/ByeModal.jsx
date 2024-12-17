import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import byeRocket from 'assets/bye-rocket.json'
import { Octicons } from '@expo/vector-icons'

const ByeModal = ({ showByeModal, toggleByeModal }) => {
  return (
    <Modal
      visible={showByeModal}
      animationType="slide"
      transparent={toggleByeModal}
      onRequestClose={() => {}}
    >
      <View className="bg-[#F5F9FF] flex-1 flex-col justify-center items-center">
        <LottieView
          autoPlay
          loop
          source={byeRocket}
          style={{ width: 200, height: 200 }}
        />

        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 22,
            color: '#202244',
            marginTop: 20,
          }}
        >
          ¡Hasta pronto!
        </Text>

        <Text
          style={{
            fontFamily: 'Mulish_400Regular',
            fontSize: 15,
            color: '#555',
            textAlign: 'center',
            marginHorizontal: 20,
            marginTop: 10,
          }}
        >
          ¡Gracias por haber formado parte de este curso! Sabemos que cada paso
          en tu camino es importante, y estamos seguros de que grandes cosas te
          esperan. ¡Éxitos en lo que venga! 😊
        </Text>

        <TouchableOpacity className="mt-10 w-[200px] py-3 bg-[#741D1D] rounded-full flex justify-center items-center relative">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Continuar
          </Text>
          <Octicons
            name="chevron-right"
            size={21}
            color={'#fff'}
            className="absolute right-5"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default ByeModal
