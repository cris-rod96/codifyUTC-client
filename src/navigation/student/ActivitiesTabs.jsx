import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Completed, Overdue, Pending } from '../../views/index.views'

const Tabs = createMaterialTopTabNavigator()

const ActivitiesTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#F5F9FF',
        },
      }}
    >
      <Tabs.Screen
        name="ActivitiesPending"
        component={Pending}
        options={{
          tabBarLabel: 'Pendientes',
          tabBarIndicatorStyle: { backgroundColor: '#741D1D' },
        }}
      />
      <Tabs.Screen
        name="ActivitiesCompleted"
        component={Completed}
        options={{
          tabBarLabel: 'Completadas',
          tabBarIndicatorStyle: { backgroundColor: '#741D1D' },
        }}
      />
      <Tabs.Screen
        name="ActivitiesOverdue"
        component={Overdue}
        options={{
          tabBarLabel: 'Atrasadas',
          tabBarIndicatorStyle: { backgroundColor: '#741D1D' },
        }}
      />
    </Tabs.Navigator>
  )
}

export default ActivitiesTabs
