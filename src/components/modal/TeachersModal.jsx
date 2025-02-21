import { Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const TeachersModal = ({ visible, onClose, handleTeacher, teachers }) => {
  const [mapTeachers, setMapTeachers] = useState([])
  const [valueSelected, setSelectedValue] = useState(null)
  const handleSelect = (id, name) => {
    setSelectedValue(id)
    handleTeacher(id, name)
  }

  const renderRadioButton = ({ item }) => {
    const isSelected = item.value === valueSelected

    return (
      <Pressable
        className="flex flex-row items-center gap-3"
        onPress={() => handleSelect(item.value, item.label)}
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

  useEffect(() => {
    const mapTeacher = teachers.map((tch) => ({
      value: tch.id,
      label: tch.full_name,
    }))
    setMapTeachers(mapTeacher)
  }, [])
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="w-full bg-white rounded-lg p-6">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Seleccione al docente
            </Text>

            <Pressable onPress={onClose}>
              <Octicons name="x" size={24} color={'#741d1d'} />
            </Pressable>
          </View>

          <View className="flex flex-col gap-2">
            <FlatList
              data={mapTeachers}
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

export default TeachersModal
