import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import profile from '../../../../assets/profile.png'

const Students = () => {
  const students = [
    {
      name: 'Cristhian Rodríguez',
      email: 'cristhian.rodriguez1596@utc.edu.ec',
      points: 147,
      medal: '#FFD700',
    }, // Oro
    {
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      points: 130,
      medal: '#C0C0C0',
    }, // Plata
    {
      name: 'María García',
      email: 'maria.garcia@example.com',
      points: 120,
      medal: '#CD7F32',
    }, // Bronce
    {
      name: 'Ana López',
      email: 'ana.lopez@example.com',
      points: 110,
      medal: null,
    }, // Sin medalla
  ]

  return (
    <View className="p-6 bg-[#F5F9FF] flex-1">
      {/* Barra de búsqueda */}
      <View className="flex flex-row items-center bg-white rounded-lg shadow-lg p-3 mb-6">
        <Ionicons name="search" size={20} color={'#DCDCDC'} />
        <TextInput
          placeholder="Buscar"
          className="bg-transparent py-2 px-3 flex-1 text-lg font-semibold text-gray-600"
        />
      </View>

      {/* Lista de estudiantes */}
      <View className="flex flex-col gap-3">
        {students.map((student, index) => (
          <View
            key={index}
            className="flex flex-row items-center gap-3 py-5 border-b border-gray-300"
          >
            {/* Contenedor de la medalla */}
            <View className="w-8 h-8 flex items-center justify-center">
              {student.medal ? (
                <Ionicons name="ribbon" size={30} color={student.medal} />
              ) : (
                <View className="w-6 h-6" /> // Espacio vacío
              )}
            </View>

            {/* Foto de perfil */}
            <View className="w-12 h-12 rounded-full bg-red-400 relative overflow-hidden">
              <Image
                source={profile}
                className="absolute w-full h-full object-cover"
              />
            </View>

            {/* Información del estudiante */}
            <View>
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 13,
                  color: '#202244',
                }}
              >
                {student.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 10,
                  color: '#545454',
                }}
              >
                {student.email}
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 10,
                  color: '#202244',
                }}
              >
                {student.points} ptos
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Students
