import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons'
import CourseNavigator from './CourseNavigator'
import ProfileNavigator from '../shared/ProfileNavigator'
import ClassNavigator from './ClassNavigator'
import { Activities, Home } from 'views/index.views'

const Tab = createBottomTabNavigator()

function TabsTeacherNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#741D1D',
        tabBarInactiveTintColor: '#202244',
        tabBarStyle: {
          backgroundColor: '#F5F9FF',
        },
        lazy: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={21} color={color} />
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
            <Octicons name="mortar-board" size={21} color={color} />
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
            <Octicons name="stack" size={21} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Actividades"
        component={Activities}
        options={{
          tabBarLabel: 'Actividades',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },

          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },

          tabBarIcon: ({ size, color }) => (
            <Octicons name="rocket" size={21} color={color} />
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
            <Octicons name="person" size={21} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsTeacherNavigator
