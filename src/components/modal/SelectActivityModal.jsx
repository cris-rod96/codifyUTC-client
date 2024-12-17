import { Ionicons } from '@expo/vector-icons'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import puzzleLogo from 'assets/puzzle.png'
import brainLogo from 'assets/brain.png'

const SelectActivityModal = ({ onClose, onContinue }) => {
  const [selectedActivity, setSelectedActivity] = useState(null)

  // Actividades disponibles
  const activities = [
    { id: 'quizz', image: quizzLogo, title: 'Quizz Code' },
    { id: 'lightning', image: lightningLogo, title: 'Lightning Code' },
    { id: 'puzzle', image: puzzleLogo, title: 'Puzzle Master' },
    { id: 'brain', image: brainLogo, title: 'Brain Boost' },
  ]

  // Manejar selección
  const handleSelect = (id) => {
    setSelectedActivity(id)
  }

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="bg-white w-full rounded-3xl p-6 shadow-2xl">
          {/* Header */}
          <View className="flex flex-row justify-between items-center mb-6">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Selecciona la actividad
            </Text>
            <TouchableOpacity onPressIn={onClose}>
              <Ionicons name="close-circle" size={30} color={'#FF5A5F'} />
            </TouchableOpacity>
          </View>

          {/* Actividades */}
          <View className="flex flex-row flex-wrap justify-between gap-2">
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                onPress={() => handleSelect(activity.id)}
                className={`w-[48%] flex flex-col items-center justify-center ${
                  selectedActivity === activity.id
                    ? 'bg-blue-100'
                    : 'bg-gray-50'
                } border border-gray-200 rounded-2xl p-5 shadow-sm`}
              >
                <View className="w-20 h-20 mb-3">
                  <Image
                    source={activity.image}
                    className="w-full h-full object-contain"
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Jost_500Medium',
                    fontSize: 14,
                    color: '#374151',
                  }}
                >
                  {activity.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botón Continuar */}
          <TouchableOpacity
            disabled={!selectedActivity}
            onPress={() => onContinue(selectedActivity)}
            className={`mt-6 w-full p-4 rounded-xl ${
              selectedActivity ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: selectedActivity ? '#ffffff' : '#9ca3af',
                textAlign: 'center',
              }}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default SelectActivityModal
