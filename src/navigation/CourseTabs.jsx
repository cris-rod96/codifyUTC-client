import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ClassesCourse from '../views/tabs/course/Classes'
import ActivitiesCourse from '../views/tabs/course/Activities'
import Students from '../views/tabs/course/Students'
import { useLayoutEffect } from 'react'

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
        component={ClassesCourse}
        options={{ tabBarLabel: 'Clases' }}
      />
      <Tab.Screen
        name="ActivitiesCourse"
        component={ActivitiesCourse}
        options={{ tabBarLabel: 'Actividades' }}
      />
      <Tab.Screen
        name="Students"
        component={Students}
        options={{
          tabBarLabel: 'Estudiantes',
        }}
      />
    </Tab.Navigator>
  )
}

export default CourseTabs
