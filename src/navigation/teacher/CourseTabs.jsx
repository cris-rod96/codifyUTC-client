import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useLayoutEffect } from 'react'
import {
  ActivitiesByCourse,
  ClassesByCourse,
  StudentsByCourse,
} from '../../views/index.views'

const Tab = createMaterialTopTabNavigator()

function CourseTabs({ route, navigation }) {
  const { courseName } = route.params || {}

  useLayoutEffect(() => {
    if (courseName) {
      navigation.setOptions({
        title: courseName,
      })
    }
  }, [courseName, navigation])
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ClassesCourse"
        component={ClassesByCourse}
        options={{ tabBarLabel: 'Clases' }}
      />
      <Tab.Screen
        name="ActivitiesCourse"
        component={ActivitiesByCourse}
        options={{ tabBarLabel: 'Actividades' }}
      />
      <Tab.Screen
        name="Students"
        component={StudentsByCourse}
        options={{
          tabBarLabel: 'Estudiantes',
        }}
      />
    </Tab.Navigator>
  )
}

export default CourseTabs
