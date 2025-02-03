import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack'

import {
  changePasswordOptions,
  navigatorOptions,
  recoveryOptions,
  setupOptions,
} from 'config/index.config'
import { useLayoutEffect, useState } from 'react'
import {
  ActivationCode,
  ChangePassword,
  Login,
  RecoveryCode,
  RecoveryPassword,
  Register,
  Setup,
  OnBoarding,
  TeacherActivities,
  Courses,
  Home,
  Classes,
  TopicsByClass,
  ActivitiesByClass,
  Profile,
  DetailClassTeacher,
  HomeStudent,
  ClassStudent,
  ActivitiesStudent,
  Students,
  BrainBoost,
  QuizzCode,
  PuzzleMaster,
  LightningCode,
  NewPassword,
  DetailCourse,
  RankingStudent,
} from 'views/index.views'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import EditProfile from '../views/shared/edit/EditProfile'
import DetailActivity from '../views/teacher/activities/DetailActivity'
import DetailClass from '../views/student/class/DetailClass'
import Feedback from '../components/feedback/Feedback'
import LightningCodeFeedback from '../views/student/feedbacks/LightningCodeFeedback'

const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const TeacherTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#741d1d',
        tabBarInactiveTintColor: '#202244',
        tabBarStyle: {
          backgroundColor: '#F5F9FF',
        },
        sceneStyle: {
          backgroundColor: '#F5F9FF',
        },
        lazy: true,
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={21} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TabCourse"
        component={CourseNavigator}
        options={{
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="mortar-board" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="TabClass"
        component={ClassNavigator}
        options={{
          tabBarLabel: 'Clases',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },
          tabBarIcon: ({ color, size }) => (
            <Octicons name="stack" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="TabActivity"
        component={ActivitiesNavigator}
        options={{
          tabBarLabel: 'Juegos',
          headerTitle: 'Actividades',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },
          sceneStyle: {
            backgroundColor: '#f5f9ff',
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },

          tabBarIcon: ({ size, color }) => (
            <Octicons name="rocket" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="TeacherStudents"
        component={Students}
        options={{
          headerShown: true,
          headerTitle: 'Alumnos',
          tabBarLabel: 'Alumnos',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },
          sceneStyle: {
            backgroundColor: '#F5F9FF',
          },
          tabBarIcon: ({ size, color }) => (
            <Octicons name="people" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Perfil"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          headerTitle: 'Perfil',
          tabBarLabel: 'Perfil',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },
          sceneStyle: {
            backgroundColor: '#F5F9FF',
          },
          tabBarIcon: ({ size, color }) => (
            <Octicons name="person" size={21} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

const ClassStudentNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
          color: '#202244',
        },
      }}
    >
      <Stack.Screen
        name="ClassStudent"
        component={ClassStudent}
        options={{
          headerTitle: 'Clases',
          headerStyle: {
            backgroundColor: '#741D1D',
            borderBottomColor: '#000',
            elevation: 1,
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
          headerLeft: () => null,
        }}
      />

      <Stack.Screen
        name="DetailClass"
        component={DetailClass}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

const StudentsTabs = () => {
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
        component={ClassStudentNavigator}
        options={{
          tabBarLabel: 'Clases',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="stack" size={21} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#741D1D',
            borderBottomColor: '#000',
            elevation: 1,
          },
          sceneStyle: {
            backgroundColor: '#F5F9FF',
          },
          headerTitle: 'Clases disponibles',
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
        }}
      />
      <Tabs.Screen
        name="ActivitiesStudent"
        component={ActivitiesStudentNavigator}
        options={{
          tabBarLabel: 'Actividades',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="rocket" size={21} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#741D1D',
            borderBottomColor: '#000',
            elevation: 1,
          },
          headerTitle: 'Actividades',
          headerShown: false,
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
        }}
      />
      <Tabs.Screen
        name="RankingStudent"
        component={RankingStudent}
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="Trophy" size={21} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#741D1D',
            borderBottomColor: '#000',
            elevation: 1,
          },
          headerTitle: 'Ranking',
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
        }}
      />
      <Tabs.Screen
        name="ProfileStudent"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Configuración',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="gear" size={21} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#741D1D',
            borderBottomColor: '#000',
            elevation: 1,
          },
          headerTitle: 'Configuración',
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
        }}
      />
    </Tabs.Navigator>
  )
}

const CourseNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          color: '#202244',
          fontSize: 21,
        },
      }}
    >
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          headerTitle: 'Cursos',
          headerLeft: () => null,
        }}
      />

      <Stack.Screen name="DetailCourse" component={DetailCourse} />
    </Stack.Navigator>
  )
}

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
          color: '#202244',
        },
      }}
    >
      <Stack.Screen
        name="Classes"
        component={Classes}
        options={{
          headerTitle: 'Clases',
          headerLeft: () => null,
        }}
        initialParams={{ course_id: null }}
      />

      <Stack.Screen
        name="DetailClassTeacher"
        component={DetailClassTeacher}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

const ActivitiesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
          color: '#202244',
        },
        headerShown: false,
      }}
      initialRouteName="TeacherActivities"
    >
      <Stack.Screen
        name="TeacherActivities"
        component={TeacherActivities}
        options={{
          headerTitle: 'Actividades',
          headerStyle: {
            backgroundColor: '#f5f9ff',
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },
          headerShown: true,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="DetailActivity"
        component={DetailActivity}
        options={{
          headerShown: true,
          headerTitle: 'Detalle de Actividad',
        }}
      />
      <Stack.Screen
        name="QuizzCode"
        component={QuizzCode}
        options={({ navigation }) => ({
          headerTitle: 'Quizz Code',
          headerLeft: () => null,
        })}
      />

      <Stack.Screen
        name="LightningCode"
        component={LightningCode}
        options={{
          headerTitle: 'Lightning Code',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="BrainBoost"
        component={BrainBoost}
        options={{
          headerTitle: 'Brain Boost',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="PuzzleMaster"
        component={PuzzleMaster}
        options={{
          headerTitle: 'Puzzle Master',
          headerLeft: () => null,
        }}
      />

      {/* Luego colocar el resto */}
    </Stack.Navigator>
  )
}

const ActivitiesStudentNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="StundentActivities"
        component={ActivitiesStudent}
        options={{
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#741D1D',
            borderBottomColor: '#000',
            elevation: 1,
          },
          headerTitle: 'Actividades',
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
          },
        }}
      />

      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerShown: true,
          headerTitle: 'Resultados',
        }}
      />

      <Stack.Screen
        name="LCFeedback"
        component={LightningCodeFeedback}
        options={{
          headerShown: true,
          headerTitle: 'Resultados',
        }}
      />
    </Stack.Navigator>
  )
}

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
          color: '#202244',
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: 'Perfil del usuario',
          headerLeft: () => {},
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Editar perfil',
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerTitle: 'Nueva contraseña',
        }}
      />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'OnBoarding'}
      screenOptions={navigatorOptions(TransitionSpecs, CardStyleInterpolators)}
    >
      {/* RUTAS COMPARTIDAS */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Setup"
        component={Setup}
        options={{
          headerShown: true,
          headerTitle: 'Completar perfil',
          headerStyle: {
            backgroundColor: '#F5F9FF',
          },
          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 21,
            color: '#202244',
          },
        }}
      />
      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPassword}
        options={recoveryOptions}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={changePasswordOptions}
      />
      <Stack.Screen name="RecoveryCode" component={RecoveryCode} />
      <Stack.Screen
        name="ActivationCode"
        component={ActivationCode}
        options={{
          headerShown: false,
        }}
      />

      {/* Rutas del docente */}

      <Stack.Screen name="TabsTeacherNavigator" component={TeacherTabs} />

      {/* Rutas del estudiante */}
      <Stack.Screen name="TabStudentNavigator" component={StudentsTabs} />
    </Stack.Navigator>
  )
}

export default RootNavigator
