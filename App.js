import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native'
import { useEffect, useState } from 'react'
import './global.css'

import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigation/RootNavigator'
import useFontsLoader from './src/hooks/useFontsLoader'
import { ModalProvider } from './src/context/ModalContext'
import { CourseModalProvider } from './src/context/CourseModalContext'
import NetInfo from '@react-native-community/netinfo'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { AccessCodeModalProvider } from './src/context/AccessCodeModalContext'

export default function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const fontsLoaded = useFontsLoader()

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
      // StatusBar.setHidden(false)
    }, 3500)
  }, [])

  if (!fontsLoaded) {
    return null
  }

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     console.log(state.isConnected)
  //     setIsConnected(state.isConnected)
  //   })

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])

  // useEffect(() => {
  //   // coloca la !
  //   if (!isConnected) {
  //     console.log('NO estas conectado')
  //   }
  // }, [isConnected])

  return (
    <Provider store={store}>
      <CourseModalProvider>
        <ModalProvider>
          <AccessCodeModalProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AccessCodeModalProvider>
        </ModalProvider>
      </CourseModalProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
})
