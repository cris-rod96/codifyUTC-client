import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import ClassTabs from './ClassTabs'
import {
  BrainBoost,
  Classes,
  LightningCode,
  PuzzleMaster,
  QuizzCode,
} from 'views/index.views'

const Stack = createStackNavigator()

const ClassNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },

        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Classes"
        component={Classes}
        options={{
          headerTitle: 'Mis Clases',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="DetailClass"
        component={ClassTabs}
        options={{
          headerStyle: {
            backgroundColor: '#741D1D',
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#F5F9FF',
          },

          headerTintColor: '#F5F9FF',
        }}
      />
      <Stack.Screen name="QuizzCode" component={QuizzCode} />
      <Stack.Screen name="LightningCode" component={LightningCode} />
      <Stack.Screen name="PuzzleMaster" component={PuzzleMaster} />
      <Stack.Screen name="BrainBoost" component={BrainBoost} />
    </Stack.Navigator>
  )
}

export default ClassNavigator
