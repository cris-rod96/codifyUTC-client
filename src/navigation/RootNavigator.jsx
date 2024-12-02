import { createStackNavigator } from '@react-navigation/stack'
import {
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { Home, SplashScreen } from '../views'
import { Welcome1, Welcome2, Welcome3 } from '../views/welcome'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import RecoveryPassword from '../views/recovery_password/RecoveryPassword'
import ActivationCode from '../views/activation_code/ActivationCode'
import ChangePassword from '../views/change_password/ChangePassword'
import Setup from '../views/setup/Setup'
import RecoveryCode from '../views/activation_code/RecoveryCode'
import TabNavigator from './TabNavigator'
import ThirdSession from '../views/third_session/ThirdSession'

const Stack = createStackNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#F5F9FF',
        },
        transitionSpec: {
          open: TransitionSpecs.ScaleFromCenterAndroidSpec, // Animación personalizada para abrir
          close: TransitionSpecs.FadeOutToBottomAndroidSpec, // Animación personalizada para cerrar
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Animación horizontal estilo iOS
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={Welcome1} />
      <Stack.Screen name="Welcome2" component={Welcome2} />
      <Stack.Screen name="Welcome3" component={Welcome3} />
      <Stack.Screen name="ThirdSession" component={ThirdSession} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPassword}
        options={{
          headerShown: true,
          headerTitle: 'Recuperar contraseña',
          headerStyle: {
            elevation: 0,
            backgroundColor: '#F5F9FF',
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen name="ActivationCode" component={ActivationCode} />
      <Stack.Screen name="RecoveryCode" component={RecoveryCode} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          headerTitle: 'Crear nueva contraseña',
          headerStyle: {
            elevation: 0,
            backgroundColor: '#F5F9FF',
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="Setup"
        component={Setup}
        options={{
          headerShown: true,
          headerTitle: 'Completar perfil',
          headerStyle: {
            elevation: 0,
            backgroundColor: '#F5F9FF',
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen name="Landing" component={TabNavigator} />
    </Stack.Navigator>
  )
}

export default RootNavigator
