import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Topics from '../views/tabs/class/Topics'
import ActivitiesClass from '../views/tabs/class/ActivitiesClass'
import { useLayoutEffect } from 'react'

const Tabs = createMaterialTopTabNavigator()

const ClassTabs = ({ route, navigation }) => {
  const { class_name } = route.params
  useLayoutEffect(() => {
    navigation.setOptions({
      title: class_name,
    })
  }, [route])
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#F5F9FF',
        },
      }}
    >
      <Tabs.Screen
        name="TopicsClass"
        options={{
          tabBarLabel: 'Temas',
        }}
      >
        {() => <Topics class_name={class_name} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="ActivitiesClass"
        component={ActivitiesClass}
        options={{
          tabBarLabel: 'Actividades',
        }}
      />
    </Tabs.Navigator>
  )
}

export default ClassTabs
