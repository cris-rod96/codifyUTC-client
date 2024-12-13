import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import quizzLogo from 'assets/quizz.png'
import puzzleLogo from 'assets/puzzle.png'
import lightningLogo from 'assets/lightning.png'
import brainLogo from 'assets/brain.png'
import ActivityCard from 'components/cards/ActivityCard'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Loading from '../../../components/loading/Loading'

const ActivitiesByCourse = ({ courseId }) => {
  const { classes } = useSelector((state) => state.teacher)
  const [isLoading, setIsLoading] = useState(false)
  const [allClassActivities, setAllClassActivities] = useState([])

  const handleEdit = (id) => {
    console.log(`Edit activity with ID: ${id}`)
    // Implementar lógica de edición
  }

  const handleDelete = (id) => {
    console.log(`Delete activity with ID: ${id}`)
    // Implementar lógica de eliminación
  }

  const handleClose = (id) => {
    console.log(`Close activity with ID: ${id}`)
    // Implementar lógica para cerrar la actividad
  }

  useEffect(() => {
    setIsLoading(true)
    if (courseId) {
      const classesFound = classes.filter(
        (currentClass) => currentClass.CourseId === courseId
      )

      const activities = classesFound.flatMap(
        (currentClass) => currentClass.Activities
      )

      setAllClassActivities(activities)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return isLoading ? (
    <Loading message={'Cargando Actividades'} />
  ) : (
    <View className="px-6 flex-1 justify-center items-center">
      <TouchableOpacity className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300">
        <Ionicons name="add" size={25} color={'white'} />
      </TouchableOpacity>
      {allClassActivities.length > 0 ? (
        <View className="p-6 bg-[#F5F9FF] flex-1 ">
          <View className="flex flex-row items-center bg-white rounded-lg shadow-lg p-3 mb-6">
            <Ionicons name="search" size={20} color={'#DCDCDC'} />
            <TextInput
              placeholder="Buscar"
              className="bg-transparent py-2 px-3 flex-1 text-lg font-semibold text-gray-600"
            />
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex flex-col gap-5">
              {/* Ejemplo de una tarjeta de actividad */}
              <ActivityCard
                logo={quizzLogo}
                title="Quizz Code"
                activityName="Programación Avanzada"
                createdAt="2023-09-01"
                availableUntil="2023-09-30"
                status="Activa"
                questions={5}
                time={60}
                participants={10}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={handleClose}
              />

              <ActivityCard
                logo={puzzleLogo}
                title="Puzzle Game"
                activityName="Programación Avanzada"
                createdAt="2023-09-01"
                availableUntil="2023-09-30"
                status="Activa"
                questions={5}
                time={60}
                participants={10}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={handleClose}
              />

              <ActivityCard
                logo={lightningLogo}
                title="Quizz Code"
                activityName="Programación Avanzada"
                createdAt="2023-09-01"
                availableUntil="2023-09-30"
                status="Activa"
                questions={5}
                time={60}
                participants={10}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={handleClose}
              />

              <ActivityCard
                logo={brainLogo}
                title="Quizz Code"
                activityName="Programación Avanzada"
                createdAt="2023-09-01"
                availableUntil="2023-09-30"
                status="Activa"
                questions={5}
                time={60}
                participants={10}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={handleClose}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <TouchableOpacity className="flex flex-col items-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
          <Text
            className="mb-2"
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 15,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            Aún no hay actividades generadas
          </Text>
          <Text
            className="mb-4"
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 12,
              color: '#545454',
              textAlign: 'center',
            }}
          >
            Agrega actividades para que tus estudiantes puedan aprender jugando
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ActivitiesByCourse
