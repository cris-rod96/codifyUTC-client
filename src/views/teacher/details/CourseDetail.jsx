import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { View } from 'react-native'

const CourseDetail = ({ route }) => {
  const { course } = route.params
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: course.name,
    })
  }, [course])
  return <View>CourseDetail</View>
}

export default CourseDetail
