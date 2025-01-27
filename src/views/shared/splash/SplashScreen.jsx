import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import logo from 'assets/logo.png'
import logoCodify from 'assets/logo_codify.png'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { storageUtil } from '../../../utils/index.utils'

const SplashScreen = () => {
  const navigation = useNavigation()
  const [hasLaunched, setHasLaunched] = useState(false)

  useEffect(() => {
    if (!hasLaunched) {
      navigation.push('OnBoarding')
    }
  }, [hasLaunched])

  useEffect(() => {
    storageUtil.getSecureData('hasLaunched').then((res) => setHasLaunched(res))
  }, [])

  return (
    <View className="flex-1 h-screen bg-[#741D1D] justify-center items-center">
      <StatusBar hidden />
      <Image
        source={logoCodify}
        style={{
          width: 300,
          height: 300,
        }}
      />
    </View>
  )
}

export default SplashScreen
