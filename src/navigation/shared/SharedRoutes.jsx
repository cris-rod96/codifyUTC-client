import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import {
  changePasswordOptions,
  navigatorOptions,
  recoveryOptions,
  setupOptions,
} from 'config/index.config'
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
} from 'views/index.views'

const SharedStack = createStackNavigator()

function SharedRoutes() {
  return (
    <SharedStack.Navigator
      initialRouteName="Login"
      screenOptions={navigatorOptions(TransitionSpecs, CardStyleInterpolators)}
    >
      <SharedStack.Screen name="Splash" component={SplashScreen} />
      <SharedStack.Screen name="Login" component={Login} />
      <SharedStack.Screen name="Welcome" component={Welcome1} />
      <SharedStack.Screen name="Welcome2" component={Welcome2} />
      <SharedStack.Screen name="Welcome3" component={Welcome3} />
      <SharedStack.Screen name="ThirdSession" component={ThirdSession} />
      <SharedStack.Screen name="Register" component={Register} />
      <SharedStack.Screen
        name="RecoveryPassword"
        component={RecoveryPassword}
        options={recoveryOptions}
      />
      <SharedStack.Screen name="RecoveryCode" component={RecoveryCode} />
      <SharedStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={changePasswordOptions}
      />

      <SharedStack.Screen name="ActivationCode" component={ActivationCode} />
      <SharedStack.Screen
        name="Setup"
        component={Setup}
        options={setupOptions}
      />
    </SharedStack.Navigator>
  )
}

export default SharedRoutes
