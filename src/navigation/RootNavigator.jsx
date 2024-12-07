import { createStackNavigator } from '@react-navigation/stack'
import {
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import TabsTeacherNavigator from './teacher/TabsTeacherNavigator'
import TabStudentNavigator from './student/TabStudentNavigator'

import {
  changePasswordOptions,
  navigatorOptions,
  recoveryOptions,
  setupOptions,
} from '../config/index.config'
import { useEffect, useState } from 'react'
import { storageUtil } from '../utils/index.utils'
import Loading from '../components/loading/Loading'
import {
  ActivationCode,
  ChangePassword,
  Login,
  RecoveryCode,
  RecoveryPassword,
  Register,
  Setup,
  SplashScreen,
  ThirdSession,
  Welcome1,
  Welcome2,
  Welcome3,
} from '../views/index.views'

const Stack = createStackNavigator()

function RootNavigator() {
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    storageUtil
      .getSecureData('user_info')
      .then((res) => {
        const infoUser = JSON.parse(res)
        const { user } = infoUser
        setUserType(user.role)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={navigatorOptions(TransitionSpecs, CardStyleInterpolators)}
    >
      {/* RUTAS COMPARTIDAS */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Welcome" component={Welcome1} />
      <Stack.Screen name="Welcome2" component={Welcome2} />
      <Stack.Screen name="Welcome3" component={Welcome3} />
      <Stack.Screen name="ThirdSession" component={ThirdSession} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPassword}
        options={recoveryOptions}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={changePasswordOptions}
      />
      <Stack.Screen name="RecoveryCode" component={RecoveryCode} />
      <Stack.Screen
        name="ActivationCode"
        component={ActivationCode}
        options={setupOptions}
      />

      <Stack.Screen
        name="TabsTeacherNavigator"
        component={TabsTeacherNavigator}
      />
      <Stack.Screen
        name="TabStudentNavigator"
        component={TabStudentNavigator}
      />
    </Stack.Navigator>
  )
}

export default RootNavigator
