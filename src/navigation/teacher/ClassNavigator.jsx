import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import ClassTabs from './ClassTabs'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useModal } from '../../context/ModalContext'
import {
  BrainBoost,
  Classes,
  LightningCode,
  PuzzleMaster,
  QuizzCode,
} from '../../views/index.views'

const Stack = createStackNavigator()

const ClassNavigator = () => {
  const { toggleModal } = useModal()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },

        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
        },
        headerLeft: () => null,
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
        }}
      />
      <Stack.Screen name="DetailClass" component={ClassTabs} />
      <Stack.Screen name="QuizzCode" component={QuizzCode} />
      <Stack.Screen name="LightningCode" component={LightningCode} />
      <Stack.Screen name="PuzzleMaster" component={PuzzleMaster} />
      <Stack.Screen name="BrainBoost" component={BrainBoost} />
    </Stack.Navigator>
  )
}

export default ClassNavigator
