import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useLayoutEffect } from 'react'
import { ActivitiesByClass, TopicsByClass } from 'views/index.views'

const Tabs = createMaterialTopTabNavigator()

const ClassTabs = ({ route, navigation }) => {
  const { class_name, id } = route.params
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
        sceneStyle: {
          backgroundColor: '#F5F9FF',
        },
        swipeEnabled: false,
      }}
    >
      <Tabs.Screen
        name="TopicsClass"
        options={{
          tabBarLabel: 'Temas',
        }}
      >
        {() => <TopicsByClass class_name={class_name} id={id} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="ActivitiesClass"
        options={{
          tabBarLabel: 'Actividades',
        }}
      >
        {() => <ActivitiesByClass class_id={id} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  )
}

export default ClassTabs
