import { useEffect } from 'react'
import { Text, View } from 'react-native'

const QuizzCodeFeedback = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${route.params?.title} - Feedback`,
    })
  }, [route])
  return (
    <View>
      <Text>
        View en desarrollo. Aqui se mostrarán los detalles de la actividad que
        realizaste
      </Text>
    </View>
  )
}

export default QuizzCodeFeedback
