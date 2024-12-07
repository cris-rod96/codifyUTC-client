import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { View } from 'react-native'

const CourseDetail = ({ route }) => {
  const { courseName } = route.params
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: courseName,
    })
  }, [courseName])
  return <View>CourseDetail</View>
}

export default CourseDetail
