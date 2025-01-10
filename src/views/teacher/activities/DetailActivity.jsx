import { Octicons } from '@expo/vector-icons'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { dateUtils } from '../../../utils/index.utils'

const DetailActivity = ({ route, navigation }) => {
  const [id, setId] = useState(null)
  const [currentActivity, setCurrentActivity] = useState(null)
  const { activities, classes } = useSelector((state) => state.teacher)

  useEffect(() => {
    if (currentActivity) {
      const { ClassId } = currentActivity
      const currentClass = classes.find((_class) => _class.id === ClassId)
      console.log(currentClass)
    }
  }, [currentActivity])

  useEffect(() => {
    if (id) {
      const filterActivity = activities.find((activity) => activity.id === id)
      setCurrentActivity((prev) => filterActivity)
    }
  }, [id])

  useEffect(() => {
    if (route.params) {
      const { activity_id } = route.params
      setId(activity_id)
    }
  }, [route.params])
  return currentActivity ? (
    <View className="flex-1 bg-[#F5F9FF]">
      <Text>
        Aqui van lo detalles de la actividad: El listado de preguntas, cuanta
        correctas e incorrectas
      </Text>
    </View>
  ) : (
    <View></View>
  )
}

export default DetailActivity
