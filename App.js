import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native'
import { useEffect, useState } from 'react'
import './global.css'

import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigation/RootNavigator'
import useFontsLoader from './src/hooks/useFontsLoader'
import { ModalProvider } from './src/context/ModalContext'
import { ToastProvider } from './src/context/ToastContext'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  const fontsLoaded = useFontsLoader()

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
    <ModalProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <View
            className="w-full "
            style={{
              flex: 1,
              // paddingTop: Platform.OS === 'ios' ? 0 : 30,
            }}
          >
            <RootNavigator />
          </View>
          <StatusBar backgroundColor="#F5F9FF" barStyle="dark-content" />
        </SafeAreaView>
      </NavigationContainer>
    </ModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
})
