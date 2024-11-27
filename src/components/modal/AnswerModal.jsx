import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native'

const AnswerModal = ({ onClose, placeholder, bgColor, onSave }) => {
  const [answerText, setAnswerText] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  const toggleSwitch = () => setIsCorrect((previousState) => !previousState)

  const handleSave = () => {
    onSave({ text: answerText, isCorrect })
    onClose()
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
            <Text style={{ fontFamily: 'Jost_600SemiBold', fontSize: 18 }}>
              Añadir respuesta
            </Text>
            <TouchableOpacity onPressIn={onClose}>
              <Ionicons name="close-circle" size={30} color={'#FF5A5F'} />
            </TouchableOpacity>
          </View>

          <TextInput
            className={`w-full h-[100px] rounded-3xl text-center placeholder:text-white`}
            multiline
            placeholder={placeholder}
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 16,
              color: 'white',
              backgroundColor: bgColor,
            }}
            onChangeText={setAnswerText}
          />

          <View className="flex flex-row items-center justify-between mt-5">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
              }}
            >
              Respuesta correcta
            </Text>

            <Switch
              value={isCorrect}
              onValueChange={toggleSwitch}
              trackColor={{ false: '#767577', true: '#741D1D' }} // Track rojo cuando activado
              thumbColor={isCorrect ? '#741D1D' : '#f4f3f4'} // Rojo para el thumb cuando activado
            />
          </View>
          {/* Botón para guardar */}
          <TouchableOpacity
            onPress={handleSave}
            className="mt-5 bg-[#741D1D] p-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">
              Guardar Respuesta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AnswerModal
