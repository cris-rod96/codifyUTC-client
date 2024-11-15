import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
} from 'react-native'
import logo from '../../../assets/logo.png'

const SplashScreen = () => {
  const [dots, setDots] = useState('')
  const opacity = new Animated.Value(1) // Valor de opacidad inicial

  useEffect(() => {
    StatusBar.setHidden(true)
    // Cambiar los puntos y animar opacidad cada 500 ms
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === '...' ? '.' : prevDots + '.'))

      // Animación de opacidad
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0, // Opacidad a 0
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1, // Opacidad a 1
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }, 500)

    // Limpiar intervalo al desmontar componente
    return () => clearInterval(interval)
  }, [])

  return (
    <View className="flex-1 justify-center items-center pt-5 bg-[#F5F9FF]">
      <View>
        <Image source={logo} className="w-[150] h-[150] resize" />
        <Text className="text-center text-3xl" style={styles.name}>
          Codify UTC
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 40,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Mulish_400Regular_Italic',
  },

  name: {
    fontFamily: 'Jost_600SemiBold',
  },
})

export default SplashScreen
