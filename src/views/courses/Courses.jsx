import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
} from 'react-native'
import Course from '../../components/cards/Course'

const Courses = () => {
  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] px-5 py-5">
      {/* Contenedor fijo (Input y búsqueda) */}
      <View className="flex flex-col gap-5">
        {/* Buscador */}
        <View className="flex flex-row items-center bg-white rounded-3xl border border-gray-200 shadow-lg shadow-gray-300">
          <View className="w-10 h-10 flex items-center justify-center">
            <Ionicons name="search" size={20} color={'#DCDCDC'} />
          </View>
          <TextInput
            placeholder="Buscar"
            className="bg-transparent py-5 flex-1"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 16,
              color: '#B4BDC4',
            }}
          />
        </View>
      </View>

      {/* Área desplazable para cursos */}
      <ScrollView className="flex-1 mt-5 ">
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
      </ScrollView>
    </View>
  )
}

export default Courses
