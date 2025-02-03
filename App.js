import 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import './global.css'

import { NavigationContainer, useNavigation } from '@react-navigation/native'
import RootNavigator from 'navigation/RootNavigator'
import { useFontsLoader } from 'hooks/index.hooks'
import { Provider, useDispatch } from 'react-redux'
import store from 'redux/store'
import { LoadingProvider } from 'context/LoadingContext'
import Loading from 'components/loading/Loading'
import { StatusBar } from 'react-native'
import { storageUtil } from 'utils/index.utils'
import { saveUser } from './src/redux/slices/user.slice'

function AppContent() {
  const [appIsReady, setAppIsReady] = useState(false)
  const fontsLoaded = useFontsLoader()
  const dispatch = useDispatch()

  useEffect(() => {
    storageUtil
      .getSecureData('session_info')
      .then((res) => {
        if (res) {
          const { user } = JSON.parse(res)
          dispatch(saveUser(user))
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }, [dispatch])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#741D1D'} barStyle={'light-content'} />
      <RootNavigator />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Provider>
  )
}
