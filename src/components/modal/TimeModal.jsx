import { Octicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const TimeModal = ({ visible, onClose, handleQuestion }) => {
  const times = [
    { value: 10, label: '10 segundos' },
    { value: 15, label: '15 segundos' },
    { value: 20, label: '20 segundos' },
    { value: 25, label: '25 segundos' },
    { value: 30, label: '30 segundos' },
    { value: 35, label: '35 segundos' },
    { value: 40, label: '40 segundos' },
  ]

  const [valueSelected, setSelectedValue] = useState(null)

  const handleSelect = (value) => {
    setSelectedValue(value)
    handleQuestion('time_limit', value)
  }

  const handleClose = () => {
    setSelectedValue(null)
    onClose()
  }

  const renderRadioButton = ({ item }) => {
    const isSelected = item.value === valueSelected

    return (
      <Pressable
        className="flex flex-row items-center gap-3"
        onPress={() => handleSelect(item.value)}
      >
        {/* Contenedor del radio button */}
        <View
          className={`w-6 h-6 rounded-full border-2 ${
            isSelected ? 'border-[#741D1D]' : 'border-gray-400'
          } flex items-center justify-center transition-all duration-200`}
        >
          {/* Punto central si está seleccionado */}
          {isSelected && (
            <View className="w-3 h-3 rounded-full bg-[#741D1D]"></View>
          )}
        </View>

        {/* Texto de la opción */}
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 15,
            color: isSelected ? '#741D1D' : '#202244',
            transition: 'color 0.2s',
          }}
        >
          {item.label}
        </Text>
      </Pressable>
    )
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="w-full bg-white rounded-lg p-6">
          {/* Encabezado del modal */}
          <View className="flex-row justify-between items-center mb-4">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Límite de tiempo
            </Text>
            <Pressable onPress={handleClose}>
              <Octicons name="x" size={24} color="#741D1D" />
            </Pressable>
          </View>

          {/* Lista de opciones */}
          <View className="flex flex-col gap-2">
            <FlatList
              data={times}
              renderItem={renderRadioButton}
              keyExtractor={(item) => item.value.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />

            <TouchableOpacity
              className="mt-2 px-4 py-3 bg-[#741D1D] rounded-lg"
              onPress={onClose}
            >
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 15,
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default TimeModal
