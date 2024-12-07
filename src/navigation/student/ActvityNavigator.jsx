import { createStackNavigator } from '@react-navigation/stack'
import { ActivitiesStudent } from '../../views/index.views'
import ActivitiesTabs from './ActivitiesTabs'
import QuizzCodeFeedback from '../../views/student/feedbacks/QuizzCodeFeedback'

const Stack = createStackNavigator()
const ActvityNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Actitvities"
        component={ActivitiesTabs}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Actividades',
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="FeedbackQuizzCode"
        component={QuizzCodeFeedback}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

export default ActvityNavigator
