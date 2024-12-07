import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  ActivitiesStudent,
  ClassStudent,
  HomeStudent,
} from '../../views/index.views'
import { Ionicons } from '@expo/vector-icons'
import ProfileNavigator from '../shared/ProfileNavigator'
import RankingTabs from './RankingTabs'
import { useState } from 'react'
import { useAccesssCodeModal } from '../../context/AccessCodeModalContext'
import ActivitiesTabs from './ActivitiesTabs'
import ActvityNavigator from './ActvityNavigator'

const Tabs = createBottomTabNavigator()

const TabStudentNavigator = () => {
  const { isVisible } = useAccesssCodeModal()
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#741D1D',
        tabBarInactiveTintColor: '#545454',
        tabBarStyle: {
          display: isVisible ? 'none' : 'flex',
          backgroundColor: '#F5F9FF',
        },
      }}
    >
      <Tabs.Screen
        name="HomeStudent"
        component={HomeStudent}
        options={{
          tabBarLabel: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ClassStudent"
        component={ClassStudent}
        options={{
          tabBarLabel: 'Clases',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Activities"
        component={ActvityNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Actividades',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },
          headerTitle: 'Actividades',

          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },

          tabBarIcon: ({ size, color }) => (
            <Ionicons name="game-controller-sharp" size={size} color={color} />
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
            <Ionicons name="trophy-sharp" size={size} color={color} />
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
            <Ionicons name="person-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default TabStudentNavigator
