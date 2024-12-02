import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Classes from '../views/classes/Classes'
import ClassTabs from './ClassTabs'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useModal } from '../context/ModalContext'
import QuizzCode from '../views/games/QuizzCode'
import LightningCode from '../views/games/LightningCode'
import PuzzleMaster from '../views/games/PuzzleMaster'
import BrainBoost from '../views/games/BrainBoost'

const Stack = createNativeStackNavigator()

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
      }}
    >
      <Stack.Screen
        name="Classes"
        component={Classes}
        options={{
          headerTitle: 'Clases',
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },

          headerRight: () => (
            <TouchableOpacity className="mr-4" onPressIn={toggleModal}>
              <Ionicons name="add-circle-sharp" size={26} color={'#741D1D'} />
            </TouchableOpacity>
          ),
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
