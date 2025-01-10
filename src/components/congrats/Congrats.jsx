import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import clap from 'assets/clap.json'

const Congrats = () => {
  return (
    <View className="flex flex-1 flex-col justify-center items-center px-8">
      <LottieView
        autoPlay
        loop
        source={clap}
        style={{ width: 300, height: 300 }}
      />

      <Text
        style={{
          fontFamily: 'Jost_600SemiBold',
          fontSize: 25,
          color: 'white',
          letterSpacing: 1.5,
          marginTop: 10,
        }}
      >
        ¡Felicidades!
      </Text>
      <Text
        style={{
          fontFamily: 'Mulish_600SemiBold',
          fontSize: 20,
          color: 'white',
          marginTop: 5,
          textAlign: 'center',
        }}
      >
        Has completado esta actividad con éxito.
      </Text>

      <Text
        style={{
          fontFamily: 'Mulish_400Regular',
          fontSize: 14,
          color: '#B4B4B4',
          letterSpacing: 1.2,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        🎉 Estamos analizando tu desempeño. ¡Prepárate para descubrir tus
        resultados!
      </Text>
    </View>
  )
}

export default Congrats
