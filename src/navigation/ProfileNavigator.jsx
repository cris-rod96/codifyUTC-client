import { Ionicons } from '@expo/vector-icons'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import Profile from '../views/profiile/Profile'
import EditProfile from '../views/edit/EditProfile'

const ProfileStack = createStackNavigator()
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
          color: '#741D1D',
        },
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },
        contentStyle: {
          backgroundColor: '#F5F9FF',
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Editar perfil',
          headerTitleAlign: 'left',
        }}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator
