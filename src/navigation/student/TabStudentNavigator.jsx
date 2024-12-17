import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ClassStudent, HomeStudent } from 'views/index.views'
import { Octicons } from '@expo/vector-icons'
import ProfileNavigator from '../shared/ProfileNavigator'
import RankingTabs from './RankingTabs'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import Activities from '../../views/student/activities/Activities'

const Tabs = createBottomTabNavigator()

const TabStudentNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#741D1D',
        tabBarInactiveTintColor: '#202244',
        sceneStyle: {
          backgroundColor: '#F5F9FF',
        },
        tabBarStyle: {
          backgroundColor: '#F5F9FF',
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Tabs.Screen
        name="HomeStudent"
        component={HomeStudent}
        options={{
          tabBarLabel: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={21} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ClassStudent"
        component={ClassStudent}
        options={{
          tabBarLabel: 'Clases',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="stack" size={21} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#741D1D',
            borderBottomColor: '#000',
            elevation: 1,
          },
          headerTitle: 'Mis Clases',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
        }}
      />
      <Tabs.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarLabel: 'Actividades',
          headerStyle: {
            backgroundColor: '#741D1D',
          },
          headerTitle: 'Actividades',
          headerTitleAlign: 'center',
          sceneStyle: {
            backgroundColor: '#F5F9FF',
          },

          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: 'white',
          },
          tabBarIcon: ({ size, color }) => (
            <Octicons name="rocket" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Clasificacion"
        component={RankingTabs}
        options={{
          tabBarLabel: 'Clasificación',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },

          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },

          tabBarIcon: ({ size, color }) => (
            <Octicons name="star" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
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
    </Tabs.Navigator>
  )
}

export default TabStudentNavigator
