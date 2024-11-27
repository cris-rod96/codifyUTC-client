import { Ionicons } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../views/profiile/Profile'
import EditProfile from '../views/edit/EditProfile'

const ProfileStack = createNativeStackNavigator()
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
