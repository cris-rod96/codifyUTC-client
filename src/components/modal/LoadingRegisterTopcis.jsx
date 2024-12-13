import React, { useEffect, useState } from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

const LoadingRegisterTopics = ({
  isLoading,
  results = [],
  toggleModalResults,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0) // Para manejar el índice del resultado actual
  const [allResultsShown, setAllResultsShown] = useState(false) // Para mostrar un mensaje final

  useEffect(() => {
    let timer
    if (currentIndex < results.length) {
      // Mostrar resultados uno por uno con un retraso
      timer = setTimeout(() => setCurrentIndex((prev) => prev + 1), 1000)
    } else if (results.length > 0) {
      setAllResultsShown(true) // Marcar como completado cuando se muestren todos los resultados
    }

    return () => clearTimeout(timer)
  }, [currentIndex, results])

  return (
    <Modal
      visible={isLoading}
      transparent
      animationType="slide"
      onRequestClose={toggleModalResults}
    >
      <View
        style={{ flex: 1, backgroundColor: '#F5F9FF', paddingHorizontal: 10 }}
      >
        {/* Botón para cerrar */}
        <TouchableOpacity
          style={{ position: 'absolute', top: 16, right: 16 }}
          onPress={toggleModalResults}
        >
          <Ionicons name="close-circle-sharp" size={30} color="#741D1D" />
        </TouchableOpacity>

        {/* Contenido del Modal */}
        <View style={{ marginTop: 60, paddingHorizontal: 10 }}>
          {/* Mensaje de Cargando */}
          {!allResultsShown && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <ActivityIndicator size="small" color="#741D1D" />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: '#202244',
                  marginLeft: 8,
                }}
              >
                Creando contenido de la clase
              </Text>
            </View>
          )}

          {/* Mensaje Final */}
          {allResultsShown && (
            <Animatable.Text
              animation="fadeIn"
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#202244',
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Todos los resultados han sido procesados
            </Animatable.Text>
          )}

          {/* Tabla de Resultados */}
          {results.slice(0, currentIndex).map((result, index) => (
            <Animatable.View
              key={index}
              animation="fadeIn"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              {/* Ícono de Éxito/Error */}
              <Ionicons
                name={result.success ? 'checkmark-circle' : 'close-circle'}
                size={24}
                color={result.success ? 'green' : 'red'}
              />

              {/* Detalles del Resultado */}
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 12,
                    color: result.success ? 'green' : 'red',
                  }}
                >
                  {result.success
                    ? 'Tema creado con éxito'
                    : 'No se creó el tema'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 14,
                    color: '#202244',
                  }}
                >
                  {result.data?.title || 'Título no disponible'}
                </Text>
                {!result.success && result.message && (
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 12,
                      color: '#741D1D',
                    }}
                  >
                    {result.message}
                  </Text>
                )}
              </View>
            </Animatable.View>
          ))}
        </View>
      </View>
    </Modal>
  )
}

export default LoadingRegisterTopics
