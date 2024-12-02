import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Courses from '../views/courses/Courses'
import CourseTabs from './CourseTabs'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useModal } from '../context/ModalContext'
import { useCourseModal } from '../context/CourseModalContext'

const Stack = createNativeStackNavigator()

function CourseNavigator() {
  const { toggleModal } = useCourseModal()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F9FF',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Jost_600SemiBold',
          fontSize: 21,
        },
      }}
      j
    >
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          headerTitle: 'Cursos',
          headerRight: () => (
            <TouchableOpacity className="mr-4 " onPressIn={toggleModal}>
              <Ionicons name="add-circle-sharp" size={26} color={'#741D1D'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="DetailCourse" component={CourseTabs} />
    </Stack.Navigator>
  )
}

export default CourseNavigator
