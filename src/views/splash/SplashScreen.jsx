import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StatusBar, Text, View } from 'react-native'

import Animated, { FadeInDown } from 'react-native-reanimated'

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 3000)
  }, [navigation])

  return (
    <View className="flex-1 h-screen bg-red-900 justify-center items-center">
      <StatusBar hidden />
      <Text
        className="text-white"
        style={{ fontFamily: 'Jost_600SemiBold', fontSize: 30 }}
      >
        {'<Codify UTC/>'}
      </Text>

      <Animated.View
        entering={FadeInDown.delay(300).duration(800)}
        className="absolute bottom-20"
      >
        <Text
          className="text-white"
          style={{ fontFamily: 'Mulish_700Bold', fontSize: 10 }}
        >
          ¡Aprende a programar jugando!
        </Text>
      </Animated.View>
    </View>
  )
}

export default SplashScreen

// const navigation = useNavigation()

// StatusBar.setHidden(true)

// // useEffect(() => {
// //   // StatusBar.setHidden(true)
// //   storageUtil
// //     .getSecureData('user_info')
// //     .then((res) => {
// //       if (res) {
// //         navigation.navigate('Landing')
// //       } else {
// //         storageUtil.getSecureData('welcome').then((res) => {
// //           if (res) {
// //             navigation.navigate('Login')
// //           } else {
// //             navigation.navigate('Welcome')
// //           }
// //         })
// //       }
// //     })
// //     .catch((err) => {
// //       console.log(err)
// //     })
// // }, [])
