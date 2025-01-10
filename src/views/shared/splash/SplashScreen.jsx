import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import logo from 'assets/logo.png'
import Animated, { FadeInDown } from 'react-native-reanimated'

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 3000)
  }, [navigation])

  return (
    <View className="flex-1 h-screen bg-[#F5F9FF] justify-center items-center">
      <StatusBar
        backgroundColor={'#F5F9FF'}
        barStyle={'dark-content'}
        animated={true}
      />
      <View className="mx-auto h-[200px] w-[80%]">
        <Image source={logo} className="w-full h-full" resizeMode="cover" />
      </View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(800)}
        className="absolute bottom-10 px-2"
      >
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 16,
            color: '#b0b0b0',
            textAlign: 'center',
          }}
        >
          Cargando...
        </Text>
      </Animated.View>
    </View>
  )
}

export default SplashScreen
