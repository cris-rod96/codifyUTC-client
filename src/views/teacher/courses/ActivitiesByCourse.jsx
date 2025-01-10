import { Ionicons, Octicons } from '@expo/vector-icons'
import {
  FlatList,
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
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Loading from '../../../components/loading/Loading'
import activitiesAPI from '../../../api/activities/activities.api'
import SelectActivityModal from '../../../components/modal/SelectActivityModal'

const ActivitiesByCourse = ({ courseId }) => {
  const navigation = useNavigation()
  const { classes } = useSelector((state) => state.teacher)
  const [isLoading, setIsLoading] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [allClassActivities, setAllClassActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)

  const toggleSelectActivityModal = () => {
    setShowActivityModal((prev) => !prev)
  }

  const onContinue = (activity) => {
    setSelectedActivity(activity)
    setShowActivityModal(false)


    if (activity === 'Quizz Code') {
      navigation.navigate('TabActivity', {
        screen: 'QuizzCode',
      })
    }

    if (activity === 'lightning') {
      navigation.navigate('LightningCode')
    }

    if (activity === 'puzzle') {
      navigation.navigate('PuzzleMaster')
    }

    if (activity === 'brain') {
      navigation.navigate('BrainBoost')
    }
  }

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

  const renderActivity = ({ item }) => {
    return <ActivityCard activity={item} />
  }

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true)
      try {
        if (courseId) {
          // Filtrar las clases relacionadas con el curso
          const classesFound = classes.filter(
            (currentClass) => currentClass.CourseId === courseId
          )

          // Obtener actividades para cada clase
          const activitiesPromises = classesFound.map(({ id }) =>
            activitiesAPI.getByClass(id).then((res) => res.data.activities)
          )

          // Esperar que todas las solicitudes terminen
          const activitiesResults = await Promise.all(activitiesPromises)

          // Combinar todas las actividades en un solo array
          const combinedActivities = activitiesResults.flat()
          setAllClassActivities(combinedActivities)
        }
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [courseId, classes])

  return isLoading ? (
    <Loading message={'Cargando Actividades'} />
  ) : (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
        onPress={toggleSelectActivityModal}
      >
        <Ionicons name="add" size={25} color={'white'} />
      </TouchableOpacity>
      {allClassActivities && allClassActivities.length > 0 ? (
        <View className="bg-[#F5F9FF] flex-1 flex-col w-full">
          <View className="border-b border-gray-200">
            <View className="w-full flex flex-row items-center bg-white border border-gray-200 px-2 shadow-lg shadow-gray-300 ">
              <View className="w-8 h-8 flex items-center justify-center">
                <Octicons name="search" size={20} color={'#DCDCDC'} />
              </View>
              <TextInput
                placeholder="Buscar"
                className="py-5 bg-transparent flex-1"
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 13,
                  color: '#B4BDC4',
                }}
              />
            </View>
          </View>
          {allClassActivities && (
            <FlatList
              data={allClassActivities}
              renderItem={renderActivity}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            />
          )}
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

      <SelectActivityModal
        isVisible={showActivityModal}
        onClose={toggleSelectActivityModal}
        onContinue={onContinue}
      />
    </View>
  )
}

export default ActivitiesByCourse
