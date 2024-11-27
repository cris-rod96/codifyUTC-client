import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Home } from '../views'
import CourseNavigator from './CourseNavigator'
import Classes from '../views/classes/Classes'
import Activities from '../views/activities/Activities'
import ProfileNavigator from './ProfileNavigator'
import ClassNavigation from './ClassTabs'
import ClassNavigator from './ClassNavigator'
import { useModal } from '../context/ModalContext'

const Tab = createBottomTabNavigator()

function TabNavigator() {
  const { isVisible } = useModal()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#741D1D',
        tabBarInactiveTintColor: '#545454',
        tabBarStyle: {
          display: isVisible ? 'none' : 'flex',
          backgroundColor: '#F5F9FF',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cursos"
        component={CourseNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Clases"
        component={ClassNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Clases',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="book-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Actividades"
        component={Activities}
        options={{
          tabBarLabel: 'Actividades',

          tabBarIcon: ({ size, color }) => (
            <Ionicons name="game-controller-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
