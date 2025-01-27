import 'react-native-gesture-handler'
import { useCallback, useEffect, useState } from 'react'
import './global.css'

import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from 'navigation/RootNavigator'
import { useFontsLoader } from 'hooks/index.hooks'
// import NetInfo from '@react-native-community/netinfo'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { LoadingProvider } from 'context/LoadingContext'
import Loading from 'components/loading/Loading'
import { StatusBar } from 'react-native'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const fontsLoaded = useFontsLoader()

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
      <NavigationContainer>
        <StatusBar backgroundColor={'#741D1D'} barStyle={'light-content'} />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}
