import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native'
import SplashScreen from './src/views/splash/SplashScreen'
import Home from './src/views/home/Home'
import { useEffect, useState } from 'react'
import './global.css'
import {
  useFonts,
  Jost_100Thin,
  Jost_200ExtraLight,
  Jost_300Light,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_900Black,
  Jost_100Thin_Italic,
  Jost_200ExtraLight_Italic,
  Jost_300Light_Italic,
  Jost_400Regular_Italic,
  Jost_500Medium_Italic,
  Jost_600SemiBold_Italic,
  Jost_700Bold_Italic,
  Jost_800ExtraBold_Italic,
  Jost_900Black_Italic,
} from '@expo-google-fonts/jost'

import {
  Mulish_200ExtraLight,
  Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
  Mulish_900Black,
  Mulish_200ExtraLight_Italic,
  Mulish_300Light_Italic,
  Mulish_400Regular_Italic,
  Mulish_500Medium_Italic,
  Mulish_600SemiBold_Italic,
  Mulish_700Bold_Italic,
  Mulish_800ExtraBold_Italic,
  Mulish_900Black_Italic,
} from '@expo-google-fonts/mulish'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  const [fontsLoaded] = useFonts({
    Jost_100Thin,
    Jost_200ExtraLight,
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold,
    Jost_800ExtraBold,
    Jost_900Black,
    Jost_100Thin_Italic,
    Jost_200ExtraLight_Italic,
    Jost_300Light_Italic,
    Jost_400Regular_Italic,
    Jost_500Medium_Italic,
    Jost_600SemiBold_Italic,
    Jost_700Bold_Italic,
    Jost_800ExtraBold_Italic,
    Jost_900Black_Italic,
    Mulish_200ExtraLight,
    Mulish_300Light,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_800ExtraBold,
    Mulish_900Black,
    Mulish_200ExtraLight_Italic,
    Mulish_300Light_Italic,
    Mulish_400Regular_Italic,
    Mulish_500Medium_Italic,
    Mulish_600SemiBold_Italic,
    Mulish_700Bold_Italic,
    Mulish_800ExtraBold_Italic,
    Mulish_900Black_Italic,
  })

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
      StatusBar.setHidden(false)
    }, 3500)
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: Platform.OS === 'android' && 30,
            }}
          >
            <Home />
          </View>
          <StatusBar backgroundColor="#F5F9FF" barStyle="dark-content" />
        </SafeAreaView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
})
