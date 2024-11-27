import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Courses from '../views/courses/Courses'
import CourseTabs from './CourseTabs'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

function CourseNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          headerTitle: 'Cursos',
          headerRight: () => (
            <TouchableOpacity className="mr-4" onPressIn={() => alert('Hi')}>
              <Ionicons name="add-circle-sharp" size={26} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="DetailCourse" component={CourseTabs} />
    </Stack.Navigator>
  )
}

export default CourseNavigator
