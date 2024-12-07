import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useLayoutEffect } from 'react'
import { ActivitiesByClass, TopicsByClass } from '../../views/index.views'

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
        {() => <TopicsByClass class_name={class_name} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="ActivitiesClass"
        component={ActivitiesByClass}
        options={{
          tabBarLabel: 'Actividades',
        }}
      />
    </Tabs.Navigator>
  )
}

export default ClassTabs
