import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import GeneralRanking from '../../views/student/tabs/ranking/GeneralRanking'
import CourseRanking from '../../views/student/tabs/ranking/CourseRanking'

const Tabs = createMaterialTopTabNavigator()

const RankingTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#F5F9FF',
        },
      }}
    >
      <Tabs.Screen
        name="CourseRanking"
        component={CourseRanking}
        options={{
          tabBarLabel: 'Tercero Sistemas',
          sceneStyle: { backgroundColor: '#F5F9FF' },
        }}
      />
      <Tabs.Screen
        name="GeneralRanking"
        component={GeneralRanking}
        options={{
          tabBarLabel: 'General',
          sceneStyle: { backgroundColor: '#F5F9FF' },
        }}
      />
    </Tabs.Navigator>
  )
}

export default RankingTabs
