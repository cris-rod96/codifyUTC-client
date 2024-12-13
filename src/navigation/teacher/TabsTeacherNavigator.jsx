import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import CourseNavigator from './CourseNavigator'
import ProfileNavigator from '../shared/ProfileNavigator'
import ClassNavigator from './ClassNavigator'
import { useModal } from '../../context/ModalContext'
import { useCourseModal } from '../../context/CourseModalContext'
import { Activities, Classes, Home } from '../../views/index.views'

const Tab = createBottomTabNavigator()

function TabsTeacherNavigator() {
  const { isVisible } = useModal()
  const { isVisible: isVisibleCourseModal } = useCourseModal()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#741D1D',
        tabBarInactiveTintColor: '#545454',
        tabBarStyle: {
          display: isVisible || isVisibleCourseModal ? 'none' : 'flex',
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
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },

          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },

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

export default TabsTeacherNavigator
