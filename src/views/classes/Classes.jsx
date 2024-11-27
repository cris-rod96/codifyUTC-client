import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useRef, useState } from 'react'
import {
  Text,
  TextInput,
  View,
  Animated,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native'
import { useModal } from '../../context/ModalContext'
import Select from 'react-native-picker-select'

const ClassesCourse = () => {
  const navigation = useNavigation()
  const { isVisible, toggleModal } = useModal()

  const data = [
    {
      materia: 'Matemáticas',
      tema: 'Álgebra Lineal',
      temas: ['Vectores', 'Matrices', 'Determinantes'],
      actividades: ['Ejercicio 1', 'Ejercicio 2', 'Tarea 1'],
      fechaCreacion: '2024-01-10',
      fechaCierre: '2024-01-24',
      estado: 'Activa',
    },
    {
      materia: 'Historia',
      tema: 'Revolución Francesa',
      temas: ['Causas', 'Eventos Principales', 'Consecuencias'],
      actividades: ['Lectura 1', 'Ensayo', 'Exposición'],
      fechaCreacion: '2024-02-01',
      fechaCierre: '2024-02-15',
      estado: 'Finalizada',
    },
    {
      materia: 'Física',
      tema: 'Cinemática',
      temas: ['Velocidad', 'Aceleración', 'Movimiento Uniforme'],
      actividades: ['Simulación', 'Práctica 1', 'Quiz'],
      fechaCreacion: '2024-03-05',
      fechaCierre: '2024-03-20',
      estado: 'Activa',
    },
  ]

  const [expanded, setExpanded] = useState(null)
  const animation = useRef(new Animated.Value(0)).current

  const toggleAccordion = (index) => {
    if (expanded === index) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(null))
    } else {
      setExpanded(index)
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start()
    }
  }

  // Calcula la altura dinámica basada en la cantidad de temas
  const getAnimatedHeight = (temasLength) => {
    const temaHeight = 40 // Ajusta este valor según el tamaño de los elementos
    return temasLength * temaHeight
  }

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      expanded !== null
        ? getAnimatedHeight(data[expanded]?.temas.length || 0)
        : 0,
    ], // Verificación de temas
  })

  const getStatusStyle = (estado) => {
    switch (estado.toLowerCase()) {
      case 'activa':
        return { bg: 'bg-green-200', text: 'text-green-800' }
      case 'finalizada':
        return { bg: 'bg-red-200', text: 'text-red-800' }
      default:
        return { bg: 'bg-gray-200', text: 'text-gray-800' }
    }
  }

  return (
    <View className="p-6 bg-gray-50 min-h-screen">
      {/* Buscador */}
      <View className="flex flex-row items-center bg-white rounded-lg shadow-lg p-3 mb-6">
        <Ionicons name="search" size={20} color={'#DCDCDC'} />
        <TextInput
          placeholder="Buscar"
          className="bg-transparent py-2 px-3 flex-1 text-lg font-semibold text-gray-600"
        />
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.materia}-${index}`}
        renderItem={({ item, index }) => {
          const isExpanded = expanded === index
          const statusStyle = getStatusStyle(item.estado)

          return (
            <View className="my-4 rounded-lg overflow-hidden bg-white shadow-xl border border-gray-300">
              {/* Encabezado del acordeón */}
              <TouchableOpacity
                className={`flex-row justify-between items-center p-4 transition-colors duration-300 ${
                  isExpanded ? 'bg-[#741D1D]' : 'bg-gray-50 hover:bg-gray-100'
                } rounded-lg`}
                onPress={() => toggleAccordion(index)}
              >
                <View>
                  <Text
                    className={`text-xl font-semibold ${
                      isExpanded ? 'text-white' : 'text-gray-800'
                    } `}
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 13,
                    }}
                  >
                    {item.materia}
                  </Text>
                  <Text
                    className={`text-sm ${
                      isExpanded ? 'text-white' : 'text-gray-500'
                    }`}
                    style={{
                      fontFamily: 'Mulish_800ExtraBold',
                      fontSize: 14,
                    }}
                  >
                    {item.tema}
                  </Text>
                </View>
                <Ionicons
                  name={
                    isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'
                  }
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>

              {/* Contenido del acordeón */}
              {isExpanded && (
                <Animated.View
                  style={[{ height: animatedHeight }, styles.animatedContainer]}
                >
                  <View className="flex flex-col gap-2 p-4 space-y-4">
                    <Text
                      style={{ fontFamily: 'Jost_600SemiBold', fontSize: 18 }}
                    >
                      Temasos
                    </Text>

                    {item.temas.map((tema, index) => (
                      <View
                        className="flex flex-col space-y-3 px-2"
                        key={index}
                      >
                        <View className="flex flex-row items-center gap-2">
                          <Ionicons name="caret-forward" size={18} />
                          <Text
                            style={{
                              fontFamily: 'Mulish_700Bold',
                              fontSize: 13,
                              color: '#202244',
                            }}
                          >
                            {tema}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </Animated.View>
              )}

              {/* Botón fuera de la animación */}
              {isExpanded && (
                <TouchableOpacity
                  className="flex items-center flex-row justify-center bg-[#741D1D] py-3 mt-5 gap-2"
                  onPress={() =>
                    navigation.navigate('DetailClass', {
                      class_name: item.tema,
                    })
                  }
                >
                  <Ionicons name="eye" size={18} color="#fff" />
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: 'white',
                    }}
                  >
                    Ver clase
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )
        }}
      />

      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {}}
      >
        <ScrollView className="pb-20">
          <View className="flex h-full  bg-[#F5F9FF]  px-5 py-10">
            {/* Header */}
            <View className="flex flex-row items-center gap-2">
              <Ionicons
                name="arrow-back"
                size={26}
                color="black"
                onPress={toggleModal}
              />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 21,
                }}
              >
                Agregar clase
              </Text>
            </View>

            <View className="mt-10 flex flex-col gap-3">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: '#202244',
                }}
              >
                Añade una imagen de portada
              </Text>
              <View className="w-full h-[200px] bg-[#FFFEFE] flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-xl">
                <Ionicons name="cloud-upload" size={40} color={'#741D1D'} />
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#545454',
                  }}
                >
                  Presiona aquí para subir
                </Text>
              </View>

              {/* Formulario */}
              <View className="flex flex-col gap-3">
                <View className="mt-5 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm flex justify-center items-center">
                  <Select
                    onValueChange={(value) => {}}
                    items={[
                      { label: 'Desarrollo Web', value: 'Desarrollo Web' },
                      { label: 'Desarrollo Movil', value: 'Desarrollo Movil' },
                      {
                        label: 'Desarrollo de Software',
                        value: 'Desarrollo de Software',
                      },
                      {
                        label: 'Desarrollo de Aplicaciones',
                        value: 'Desarrollo de Aplicaciones',
                      },
                      {
                        label: 'Desarrollo de Videojuegos',
                        value: 'Desarrollo de Videojuegos',
                      },
                    ]}
                    placeholder={{
                      label: 'Selecciona el curso',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    style={{
                      inputIOS: {
                        fontSize: 14,
                        fontFamily: 'Mulish_700Bold',
                        color: '#202244',
                      },
                      inputAndroid: {
                        fontSize: 14,
                        fontFamily: 'Mulish_700Bold',
                        color: '#000',
                      },
                      placeholder: {
                        fontSize: 12,
                        fontFamily: 'Mulish_700Bold',
                      },
                    }}
                  />
                </View>

                <TextInput
                  placeholder="Tema principal"
                  className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                  }}
                />

                <View className="flex flex-col gap-3">
                  <View className="flex flex-row justify-between">
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 18,
                        color: '#202244',
                      }}
                    >
                      Contenido
                    </Text>
                    <TouchableOpacity className="flex flex-row gap-1 items-center">
                      <Text
                        style={{
                          fontFamily: 'Mulish_700Bold',
                          fontSize: 14,
                          color: '#741D1D',
                        }}
                      >
                        Añadir Tema
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="w-full h-auto px-10 py-5 bg-[#FFFEFE] rounded-lg border border-gray-200">
                    <View className="flex items-center justify-center w-full h-auto p-5 bg-[#FFFEFE] rounded-lg border border-gray-200">
                      <Text
                        style={{
                          fontFamily: 'Mulish_400Regular',
                          fontSize: 14,
                          color: '#999595',
                        }}
                      >
                        Aún no hay temas añadidos. Usa el botón "Añadir Tema"
                        para empezar.
                      </Text>
                    </View>
                    {/* Cuando haya contenido */}
                    {/* <View className="flex flex-row justify-between items-center">
                      <Text
                        style={{
                          fontFamily: 'Mulish_800ExtraBold',
                          fontSize: 12,
                          color: '#999595',
                        }}
                      >
                        ¿Qué es una variable?
                      </Text>
                      <View className="flex flex-row gap-2 items-center">
                        <TouchableOpacity className="flex items-center justify-center">
                          <Ionicons name="reader" color={'#1BA81B'} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Ionicons
                            name="trash-sharp"
                            size={18}
                            color={'#741D1D'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View> */}
                  </View>
                </View>

                <TouchableOpacity className="flex flex-row items-center justify-center bg-[#741D1D] py-4 mt-5 gap-2 relative rounded-full">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: '#FFFFFF',
                    }}
                  >
                    Guardar
                  </Text>
                  <Ionicons
                    name="chevron-forward-circle-sharp"
                    className="absolute right-3"
                    size={24}
                    color={'#FFFFFF'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#741D1D',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ClassesCourse
