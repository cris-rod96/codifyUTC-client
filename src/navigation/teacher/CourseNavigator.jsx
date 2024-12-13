import CourseTabs from './CourseTabs'
import { useCourseModal } from 'context/CourseModalContext'
import { Courses } from 'views/index.views'
import { createStackNavigator } from '@react-navigation/stack'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()

function CourseNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
        },
      }}
    >
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          headerTitle: 'Mis Cursos',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="DetailCourse"
        component={CourseTabs}
        options={{
          headerStyle: {
            backgroundColor: '#741D1D',
          },

          headerTitleStyle: {
            fontFamily: 'Jost_600SemiBold',
            color: 'white',
          },

          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  )
}

export default CourseNavigator
