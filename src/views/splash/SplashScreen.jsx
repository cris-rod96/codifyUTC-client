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
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    StatusBar.setHidden(true)

    setTimeout(() => {
      navigation.navigate('Welcome')
    }, 3500)
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
