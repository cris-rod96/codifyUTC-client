// import React, { useState } from 'react'
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'

// const Topics = () => {
//   // Lista de subtemas con contenido detallado
//   const temas = [
//     {
//       titulo: 'Introducción a las Variables',
//       descripcion:
//         'Las variables son espacios en la memoria que permiten almacenar y manipular datos en un programa. Son fundamentales para cualquier lenguaje de programación.',
//     },
//     {
//       titulo: 'Tipos de Datos',
//       descripcion:
//         'Los tipos de datos definen qué tipo de valor puede almacenar una variable. Ejemplos incluyen números, cadenas de texto, booleanos y más.',
//     },
//     {
//       titulo: 'Declaración de Variables',
//       descripcion:
//         "La declaración de variables consiste en asignar un nombre a un espacio en memoria. Por ejemplo, en JavaScript puedes usar 'var', 'let' o 'const'.",
//     },
//   ]

//   // Estados
//   const [expandedIndex, setExpandedIndex] = useState(null) // Controla el acordeón
//   const [completed, setCompleted] = useState([]) // Controla subtemas completados

//   // Alterna la expansión de un subtema
//   const toggleExpand = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index)
//   }

//   // Marca un subtema como leído
//   const markAsCompleted = (index) => {
//     if (!completed.includes(index)) {
//       setCompleted([...completed, index])
//     }
//   }

//   // Calcula el progreso
//   const progress = (completed.length / temas.length) * 100

//   return (
//     <View className="flex-1 bg-gray-100">
//       {/* Header */}
//       <View className="bg-blue-600 py-4 px-6 flex-row items-center shadow-md">
//         <Ionicons
//           name="code-outline"
//           size={24}
//           color="white"
//           className="mr-2"
//         />
//         <Text className="text-white text-xl font-semibold">
//           Clase: Las Variables
//         </Text>
//       </View>

//       {/* Barra de Progreso */}
//       <View className="w-full bg-gray-300 h-2 mt-2">
//         <View className="bg-blue-500 h-2" style={{ width: `${progress}%` }} />
//       </View>
//       <Text className="text-center text-gray-700 mt-1">
//         Progreso: {completed.length} de {temas.length} subtemas leídos
//       </Text>

//       {/* Contenedor Scrollable */}
//       <ScrollView className="flex-1 px-4 py-4">
//         {temas.map((tema, index) => (
//           <TouchableOpacity
//             key={index}
//             className="bg-white shadow-md rounded-lg p-4 mb-4"
//             onPress={() => {
//               toggleExpand(index)
//               markAsCompleted(index)
//             }}
//           >
//             <View className="flex-row items-center justify-between">
//               <Text className="text-gray-700 font-medium">{tema.titulo}</Text>
//               <Ionicons
//                 name={
//                   expandedIndex === index
//                     ? 'chevron-up-outline'
//                     : 'chevron-down-outline'
//                 }
//                 size={20}
//                 color="gray"
//               />
//             </View>
//             {expandedIndex === index && (
//               <Text className="text-gray-600 mt-2">{tema.descripcion}</Text>
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   )
// }

// export default Topics

import React, { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Topics = ({ class_name }) => {
  const [temas, setTemas] = useState([
    {
      titulo: 'Introducción a las Variables',
      descripcion:
        'Las variables son espacios en la memoria que permiten almacenar y manipular datos en un programa.',
    },
    {
      titulo: 'Tipos de Datos',
      descripcion:
        'Los tipos de datos definen qué tipo de valor puede almacenar una variable. Ejemplos incluyen números, cadenas de texto, booleanos.',
    },
    {
      titulo: 'Declaración de Variables',
      descripcion:
        "La declaración de variables consiste en asignar un nombre a un espacio en memoria. Ejemplo: 'let' en JavaScript.",
    },
    {
      titulo: 'Ámbito de las Variables',
      descripcion:
        'El ámbito define dónde y cómo se puede acceder a una variable dentro de un programa.',
    },
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [nuevoSubtema, setNuevoSubtema] = useState({
    titulo: '',
    descripcion: '',
  })

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const agregarSubtema = () => {
    setTemas([...temas, nuevoSubtema])
    setNuevoSubtema({ titulo: '', descripcion: '' })
    closeModal()
  }

  return (
    <View className="flex-1 w-full bg-[#F5F9FF] relative">
      <View className="bg-blue-600 py-4 px-6 flex flex-row items-center justify-between shadow-md">
        <View className="flex flex-row items-center">
          <Ionicons
            name="book-outline"
            size={24}
            color={'white'}
            className="mr-4"
          />
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 20,
              color: 'white',
            }}
          >
            {class_name}
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPressIn={() => openModal()}>
            <Ionicons name="add-circle-sharp" size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash" size={22} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Subtemas */}
      <View className="flex-1 pt-4 py-20">
        <ScrollView className="flex-1 p-4">
          {temas.map((tema, index) => (
            <View
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <View>
                <Text
                  className="text-gray-700"
                  style={{ fontFamily: 'Jost_600SemiBold', fontSize: 16 }}
                >
                  {tema.titulo}
                </Text>
                <Text
                  className="text-gray-600 mt-2"
                  style={{
                    fontFamily: 'Mulish_400Regular',
                    fontSize: 13,
                    color: '#545454',
                  }}
                >
                  {tema.descripcion}
                </Text>
              </View>

              {/* Botones de Editar y Eliminar */}
              <View className="flex flex-row items-center justify-between mt-4">
                <TouchableOpacity
                  className="flex flex-row items-center gap-2 bg-yellow-500 p-2 rounded-md justify-center"
                  style={{ width: '48%' }}
                >
                  <Ionicons name="pencil-outline" size={20} color="white" />
                  <Text style={{ color: 'white' }}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex flex-row items-center gap-2 bg-red-600 p-2 rounded-md justify-center"
                  style={{ width: '48%' }}
                >
                  <Ionicons name="trash-bin-outline" size={20} color="white" />
                  <Text style={{ color: 'white' }}>Borrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Header */}

      {/* Modal para Agregar Subtema */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View className="flex-1 justify-center items-center bg-black/50 px-5">
            {/* Contenedor principal del modal */}
            <View className="bg-white w-full rounded-2xl p-6 shadow-lg">
              {/* Header del modal */}
              <View className="flex flex-row justify-between items-center mb-5">
                <Text className="text-lg font-semibold text-[#202244]">
                  Agregar Subtema
                </Text>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name="close-circle" size={28} color="#741D1D" />
                </TouchableOpacity>
              </View>

              {/* Campo para título */}
              <TextInput
                placeholder="Título del Subtema"
                className="h-12 w-full border border-gray-300 rounded-lg px-4 text-sm"
              />

              {/* Campo para descripción */}
              <TextInput
                placeholder="Descripción del Subtema"
                className="h-44 w-full border border-gray-300 rounded-lg px-4 mt-4 text-sm"
                multiline
                textAlignVertical="top"
                scrollEnabled
              />

              {/* Botón para agregar */}
              <TouchableOpacity
                className="bg-[#741D1D] w-full rounded-lg py-3 mt-5 flex items-center justify-center"
                onPress={agregarSubtema}
              >
                <Text className="text-white font-semibold text-base">
                  Agregar Subtema
                </Text>
              </TouchableOpacity>

              {/* Botón para cancelar */}
              <TouchableOpacity
                className="bg-gray-300 w-full rounded-lg py-3 mt-3 flex items-center justify-center"
                onPress={closeModal}
              >
                <Text className="text-gray-700 font-semibold text-base">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

export default Topics
