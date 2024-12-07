import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, ScrollView, View, TextInput } from 'react-native'
import Course from '../../../components/cards/Course'
import LottieView from 'lottie-react-native'
import emptyData from '../../../../assets/no-data.json'

const HomeActivities = () => {
  const [activities, setActivites] = useState([]) // Simulación de actividades

  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] px-5 py-5">
      {/* Mostrar barra de búsqueda solo si hay actividades */}
      {activities.length > 0 && (
        <View className="flex flex-col gap-5">
          {/* Buscador */}
          <View className="flex flex-row items-center bg-white rounded-3xl border border-gray-200 shadow-lg shadow-gray-300">
            <View className="w-10 h-10 flex items-center justify-center">
              <Ionicons name="search" size={20} color={'#DCDCDC'} />
            </View>
            <TextInput
              placeholder="Buscar actividad"
              className="bg-transparent py-5 flex-1"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 16,
                color: '#B4BDC4',
              }}
            />
          </View>
        </View>
      )}

      {/* Área desplazable para cursos */}
      {activities.length > 0 ? (
        <ScrollView className="flex-1 mt-5">
          {activities.map((activity) => (
            <Course key={activity.id} data={activity} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <LottieView
            autoPlay
            loop
            source={emptyData}
            style={{ width: 200, height: 200 }}
          />
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 18,
              color: '#202244',
              marginTop: 20,
            }}
          >
            Aún no has agregado actividades
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 14,
              color: '#545454',
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            Agrega actvidades a tus clases para que tus estudiantes puedan
            aprender jugando.
          </Text>
        </View>
      )}
    </View>
  )
}

export default HomeActivities
