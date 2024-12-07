import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import quizzLogo from '../../../../assets/quizz.png'
import puzzleLogo from '../../../../assets/puzzle.png'
import lightningLogo from '../../../../assets/lightning.png'
import brainLogo from '../../../../assets/brain.png'
import ActivityCard from '../../../components/cards/ActivityCard'

const ActivitiesCourse = () => {
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

  return (
    <View className="p-6 bg-[#F5F9FF] flex-1">
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
  )
}

export default ActivitiesCourse
