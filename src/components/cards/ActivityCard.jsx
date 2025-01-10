import { Entypo, Octicons } from '@expo/vector-icons'
import React from 'react'
import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import brainLogo from 'assets/brain.png'
import puzzleLogo from 'assets/puzzle.png'
import logoDefault from 'assets/game-default.png'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { dateUtils } from '../../utils/index.utils'

const ActivityCard = ({ activity, onEdit, onDelete, onClose }) => {
  const getPosterImage = (type) => {
    switch (type) {
      case 'Quizz Code':
        return quizzLogo
      case 'Lightning Code':
        return lightningLogo
      case 'Brain Boost':
        return brainLogo
      case 'Puzzle Master':
        return puzzleLogo
    }
  }
  const viewActivityDetails = (activity_id) => {
    navigation.navigate('DetailActivity', {
      activity_id,
    })
  }

  return (
    <View
      key={activity.id}
      className="mb-10 rounded-lg bg-white border border-gray-200 overflow-hidden"
    >
      {/* Cabecera */}
      <View className="w-full h-[50px] flex justify-center items-center bg-[#741D1D] rounded-t-lg relative">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: 'white',
          }}
        >
          {activity.type}
        </Text>
        <Image
          source={getPosterImage(activity.type)}
          style={{
            width: 45,
            height: 45,
          }}
          className="absolute -bottom-3 left-4 z-50"
        />

        {/* Caja de botones */}
        <TouchableOpacity
          className="flex flex-row items-center gap-2 absolute right-4"
          onPress={() => viewActivityDetails(activity.id)}
        >
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 13,
              color: 'white',
            }}
          >
            Ver
          </Text>
          <Octicons name="chevron-right" size={21} color={'white'} />
        </TouchableOpacity>
      </View>
      <View className="w-full relative h-[180px] ">
        {activity.poster ? (
          <Image
            source={{
              uri: activity.poster,
            }}
            className="absolute w-full h-full object-contain"
          />
        ) : (
          <Image
            source={logoDefault}
            className="absolute w-full h-full object-contain"
          />
        )}

        <View
          className={`absolute z-50 bottom-2 right-3 px-3 py-1  ${
            activity.status === 'Abierta' ? 'bg-green-800' : 'bg-red-900'
          } rounded-full flex flex-row items-center gap-2`}
        >
          <Octicons
            name={activity.status === 'Abierta' ? 'unlock' : 'lock'}
            color={'white'}
          />
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 10,
              color: 'white',
            }}
          >
            {activity.status}
          </Text>
        </View>
      </View>

      <View className="py-4  border-b border-gray-200">
        <View className="px-5 flex flex-row items-center justify-center gap-2">
          <View className="flex-1 flex flex-col gap-1 border border-gray-200 rounded-lg py-3 bg-green-800 relative">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}
            >
              {activity.activities_count}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: 'white',
                textAlign: 'center',
              }}
            >
              {/* {activities.activities_count > 1 ? 'Actividades' : 'Actividad'} */}
            </Text>

            <Octicons
              name="stack"
              size={16}
              color={'white'}
              className="absolute top-1 left-2"
            />
          </View>

          <View className="flex-1 flex flex-col gap-1 border border-gray-200 rounded-lg py-3 bg-slate-900 relative">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}
            >
              {activity.total_time}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: 'white',
                textAlign: 'center',
              }}
            >
              {activity.total_time > 1 ? 'Segundos' : 'Segundo'}
            </Text>

            <Octicons
              name="hourglass"
              size={16}
              color={'white'}
              className="absolute top-1 left-2"
            />
          </View>

          <View className="flex-1 flex flex-col gap-1 border border-gray-200 rounded-lg py-3 bg-green-800 relative">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}
            >
              {activity.total_score}
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: 'white',
                textAlign: 'center',
              }}
            >
              {activity.total_score > 1 ? 'Puntos' : '1 Punto'}
            </Text>

            <Entypo
              name="trophy"
              size={16}
              color={'white'}
              className="absolute top-1 left-2"
            />
          </View>
        </View>
      </View>

      {/* Disponible */}
      <View className="py-2 flex flex-row justify-center items-center gap-2 border-b border-gray-200">
        <Octicons name="calendar" size={12} color={'#B4BDC4'} />
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 12,
            color: '#B4BDC4',
          }}
        >
          Disponible hasta el:{' '}
          {dateUtils.formatDate(new Date(activity.due_date))}
        </Text>
      </View>

      {/*  */}
      <TouchableOpacity
        className="w-full py-3 flex flex-row justify-center items-center bg-[#741D1D] gap-2"
        onPress={() => onDelete(activity.id)}
      >
        <Octicons name="trash" size={18} color={'white'} />
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            size: 18,
            color: 'white',
          }}
        >
          Eliminar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ActivityCard
