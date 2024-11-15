import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Home = () => {
  return (
    <View className="flex flex-col gap-3">
      <View className="flex flex-col items-end">
        <TouchableOpacity className="w-auto">
          <Text
            className="text-end"
            style={{ fontFamily: 'Jost_600SemiBold', fontSize: 15 }}
          >
            Omitir
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full h-[400] bg-red-400"></View>
      <View className="flex flex-col gap-2">
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 24,
            color: '#202244',
          }}
        >
          Gamificación Interactiva
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            color: '#545454',
          }}
        >
          Aprende programación mientras superas retos y obtienes puntos
        </Text>
      </View>
    </View>
  )
}

export default Home
