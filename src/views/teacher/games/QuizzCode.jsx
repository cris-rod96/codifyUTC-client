import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Select from 'react-native-picker-select'

import { useState } from 'react'
import AnswerModal from '../../../components/modal/AnswerModal'
import { pickerImagesUtil } from '../../../utils/index.utils'

const QuizzCode = () => {
  const [imageUri, setImageUri] = useState(null)
  const [selectedValue, setSelectedValue] = useState({
    placeholder: '',
    bgColor: '',
    optionIndex: null,
  })
  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const [answers, setAnswers] = useState({}) // Objeto para almacenar respuestas por índice

  // Mostrar/Cerrar el modal y establecer opción seleccionada
  const toggleAnswerModal = (placeholder, bgColor, optionIndex) => {
    setSelectedValue({ placeholder, bgColor, optionIndex })
    setShowAnswerModal((prev) => !prev)
  }

  // Guardar respuesta en la opción seleccionada
  const handleSave = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [selectedValue.optionIndex]: answer.text,
    }))
    setShowAnswerModal(false) // Cierra el modal después de guardar
  }

  // Funcion para abrir la galeria
  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) setImageUri(uri)
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 16 }}
    >
      <View className="py-5">
        {/* Box Image */}
        <TouchableOpacity
          className="w-full h-[200px] bg-black rounded-xl justify-center items-center mb-6"
          onPressIn={pickImage}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            <>
              <Ionicons name="cloud-upload-sharp" size={50} color="#FFFFFF" />
              <Text className="text-white text-base font-bold mt-2">
                Añadir portada (Opcional)
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Select Time Limit */}
        <View className="h-14 bg-white border border-gray-300 rounded-lg justify-center px-4 mb-6">
          <Select
            onValueChange={(value) => {}}
            items={[
              { label: '5 segundos', value: 5 },
              { label: '10 segundos', value: 10 },
              { label: '15 segundos', value: 15 },
              { label: '20 segundos', value: 20 },
              { label: '25 segundos', value: 25 },
              { label: '30 segundos', value: 30 },
            ]}
            placeholder={{ label: 'Límite de tiempo', value: null }}
            style={{
              inputIOS: {
                fontSize: 14,
                fontFamily: 'Mulish_700Bold',
                color: '#000',
              },
              inputAndroid: {
                fontSize: 14,
                fontFamily: 'Mulish_700Bold',
                color: '#202244',
              },
              placeholder: { fontSize: 14, fontFamily: 'Mulish_700Bold' },
            }}
          />
        </View>

        {/* Question Input */}
        <TextInput
          className="h-14 bg-white border border-gray-300 rounded-lg text-center mb-6"
          placeholder="Añadir pregunta"
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            color: '#9D9D9D',
          }}
        />

        {/* Options Section */}
        <Text className="text-lg font-bold text-gray-800 mb-4">Opciones</Text>
        <View className="flex-row flex-wrap justify-between">
          {['#A70808', '#130DB2', '#CBA715', '#1BA81B'].map((color, index) => (
            <TouchableOpacity
              key={index}
              className="w-[48%] h-24 rounded-lg justify-center items-center mb-4"
              style={{ backgroundColor: color }}
              onPressIn={() =>
                toggleAnswerModal(`Opción ${index + 1}`, color, index)
              }
            >
              <Text className="text-white font-bold text-sm">
                {answers[index] || `Opción ${index + 1}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add to Quiz Button */}
        <TouchableOpacity className="w-full h-14 bg-[#741D1D] rounded-lg justify-center items-center mb-6">
          <Text className="text-white text-lg font-semibold">
            Añadir al Quizz
          </Text>
        </TouchableOpacity>

        {/* Added Questions Section */}
        <View className="w-full pt-5 mt-10 border-t border-gray-300">
          <Text className="text-center text-xl font-bold mb-5">
            Preguntas añadidas
          </Text>

          {/* Pregunta añadida ejemplo */}
          <View className="space-y-4">
            <View className="flex flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <View className="flex-1 flex-row items-center">
                <Ionicons
                  name="help-circle-sharp"
                  size={20}
                  color="#202244"
                  className="mr-2"
                />
                <Text className="text-gray-800 text-base font-semibold">
                  ¿Qué son las variables en JavaScript?
                </Text>
              </View>

              <View className="flex flex-row items-center gap-1">
                <TouchableOpacity className="p-2 bg-yellow-500 rounded-full">
                  <Ionicons name="pencil" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 bg-red-500 rounded-full">
                  <Ionicons name="trash" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Modal de respuestas */}
        {showAnswerModal && (
          <AnswerModal
            onClose={() => setShowAnswerModal(false)}
            placeholder={selectedValue.placeholder}
            bgColor={selectedValue.bgColor}
            onSave={handleSave}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default QuizzCode
