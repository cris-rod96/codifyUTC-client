import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const ActivityCard = ({
  logo,
  title,
  activityName,
  createdAt,
  availableUntil,
  status,
  questions,
  time,
  participants,
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <View className="flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-xl bg-white">
      {/* Encabezado */}
      <View className="h-16 bg-red-400 flex flex-row gap-3 items-center justify-center">
        <View className="relative w-12 h-12">
          <Image
            source={logo}
            className="absolute w-full h-full object-cover"
          />
        </View>
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 16,
            color: 'white',
          }}
        >
          {title}
        </Text>
      </View>

      {/* Contenido */}
      <View className="flex flex-col px-5 py-3">
        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 14,
            color: '#202244',
          }}
        >
          {activityName}
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 13,
            color: '#202244',
            marginTop: 5,
          }}
        >
          Creado el: {createdAt}
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 13,
            color: '#202244',
          }}
        >
          Disponible hasta: {availableUntil}
        </Text>
        <View className="flex flex-row gap-1 items-center">
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 13,
              color: '#202244',
            }}
          >
            Estado:
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 13,
              color: 'green',
            }}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* Resumen */}
      <View className="flex flex-row items-center justify-between px-10 py-5 border-t border-gray-300">
        <View className="flex flex-col items-center gap-1">
          <Text style={{ fontFamily: 'Jost_600SemiBold', fontSize: 20 }}>
            {questions}
          </Text>
          <Text style={{ fontFamily: 'Mulish_700Bold', fontSize: 12 }}>
            Preguntas
          </Text>
        </View>
        <View className="flex flex-col items-center gap-1">
          <Text style={{ fontFamily: 'Jost_600SemiBold', fontSize: 20 }}>
            {time}
          </Text>
          <Text style={{ fontFamily: 'Mulish_700Bold', fontSize: 12 }}>
            Minutos
          </Text>
        </View>
        <View className="flex flex-col items-center gap-1">
          <Text style={{ fontFamily: 'Jost_600SemiBold', fontSize: 20 }}>
            {participants}
          </Text>
          <Text style={{ fontFamily: 'Mulish_700Bold', fontSize: 12 }}>
            Participantes
          </Text>
        </View>
      </View>

      {/* Botones de acciones */}
      <View className="flex flex-row justify-around bg-gray-100 p-3 border-t border-gray-300">
        <TouchableOpacity
          className="flex flex-row items-center gap-2"
          onPress={onEdit}
        >
          <Ionicons name="pencil" size={18} color="#4CAF50" />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#4CAF50',
            }}
          >
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center gap-2"
          onPress={onDelete}
        >
          <Ionicons name="trash" size={18} color="#F44336" />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#F44336',
            }}
          >
            Eliminar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center gap-2"
          onPress={onClose}
        >
          <Ionicons name="close-circle" size={18} color="#FF9800" />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#FF9800',
            }}
          >
            Cerrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ActivityCard
