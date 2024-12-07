import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'

const AccessCodeModal = ({ isVisible, toggleModal, toggleUpdateClass }) => {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAccess = () => {
    setLoading(true)
    setMessage(null)

    // Simular una petición
    setTimeout(() => {
      setLoading(false)
      setMessage('Acceso exitoso') // Cambia a un mensaje según el resultado real
      toggleUpdateClass()
      toggleModal()
    }, 2000) // Simulación de 2 segundos
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}
    >
      {/* Fondo semitransparente */}
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        {/* Contenedor del Modal */}
        <View className="w-[80%] bg-white rounded-2xl p-6 shadow-lg relative">
          {/* Botón de cierre */}
          <TouchableOpacity
            className="absolute top-3 right-3"
            onPress={toggleModal}
          >
            <Ionicons name="close-circle-sharp" size={28} color="#741D1D" />
          </TouchableOpacity>

          {/* Título */}
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#202244',
              textAlign: 'center',
            }}
            className="mb-4"
          >
            Código de Acceso
          </Text>

          {/* Input para el código */}
          <TextInput
            placeholder="Introduce tu código"
            placeholderTextColor="#9E9E9E"
            className={`w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black ${
              !message && 'mb-4'
            }`}
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
            }}
          />

          {message && (
            <Text
              className="my-2 text-center"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 11,
                color: '#741D1D',
              }}
            >
              {message}
            </Text>
          )}

          {/* Botón de acceso */}
          <TouchableOpacity
            className="w-full bg-[#741D1D] flex-row items-center justify-center py-3 rounded-full"
            onPress={handleAccess}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}
                  className="mr-2"
                >
                  Acceder
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="white"
                  className="absolute right-5"
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AccessCodeModal
