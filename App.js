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
import { CourseModalProvider } from './src/context/CourseModalContext'
import { Provider } from 'react-redux'
import store from './src/redux/store'

export default function App() {
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

  return (
    <Provider store={store}>
      <CourseModalProvider>
        <ModalProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
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
