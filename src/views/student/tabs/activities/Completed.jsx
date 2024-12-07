import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { activities, typeActivities } from '../../../../mocks/activities'
import { MaterialIcons } from '@expo/vector-icons'
import quizzLogo from '../../../../../assets/quizz.png'
import puzzleLogo from '../../../../../assets/puzzle.png'
import brainLogo from '../../../../../assets/brain.png'
import lightningLogo from '../../../../../assets/lightning.png'

const Completed = ({ route, navigation }) => {
  const [filteredActivities, setFilteredActivities] = useState(activities)

  const goToFeedBack = (type) => {
    console.log(type)
    navigation.navigate('FeedbackQuizzCode', {
      title: type,
    })
  }

  const filterActivities = (type) => {
    if (type === 'Todas') {
      setFilteredActivities(activities)
      return
    }
    const filtered = activities.filter((activity) => activity.type === type)
    setFilteredActivities(filtered)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className={`px-5 py-3 mr-2 rounded-full ${
        item.id === 'todas' ? 'bg-[#741D1D]' : 'bg-[#E8F1FF]'
      }`}
      onPress={() => filterActivities(item.title)}
    >
      <Text
        style={{
          fontFamily: 'Mulish_700Bold',
          fontSize: 10,
          color: item.id === 'todas' ? '#FFFFFF' : '#202244',
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  )

  const getImage = (type) => {
    switch (type) {
      case 'Quizz Code':
        return quizzLogo
      case 'Puzzle Master':
        return puzzleLogo
      case 'Brain Boost':
        return brainLogo
      case 'Lightning Code':
        return lightningLogo
    }
  }

  const renderActivity = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl border border-gray-200 h-[150px]  shadow-sm shadow-gray-300 flex flex-row overflow-hidden w-full relative mb-5"
      onPress={() => goToFeedBack(item.type)}
    >
      <View className="w-[45%] bg-white h-full relative flex  items-center justify-center">
        <View className="w-[100px] h-[100px] relative">
          <Image
            source={getImage(item.type)}
            className="absolute w-full h-full object-cover"
          />
        </View>
      </View>

      {/* Data de la actividad */}
      <View className="w-[55%] p-4 h-full flex flex-col gap-1">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 12,
            color: '#741D1D',
          }}
        >
          {item.type}
        </Text>
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 14,
            color: '#202244',
          }}
        >
          Introducción a React
        </Text>
        <View className="flex flex-row gap-2 items-center">
          <MaterialIcons name="quiz" size={18} color={'#741D1D'} />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              color: '#202244',
            }}
          >
            {item.questions || item.chaallenges} preguntas
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <MaterialIcons name="timer" size={18} color={'#741D1D'} />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              color: '#202244',
            }}
          >
            {item.time} minutos
          </Text>
        </View>
        <View className="px-3 py-1 rounded-full bg-[#055205] absolute top-1 right-2">
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 9,
              color: '#FFFFFF',
            }}
          >
            {item.status}
          </Text>
        </View>

        <TouchableOpacity className="flex flex-row items-center justify-center py-2 rounded-full gap-1">
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              textAlign: 'center',
              color: '#741D1D',
            }}
          >
            Realizar actividad
          </Text>

          <MaterialIcons
            name="keyboard-double-arrow-right"
            size={18}
            color={'#741D1D'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <View className="w-[90%] mx-auto py-10 flex flex-col gap-4">
        <FlatList
          data={typeActivities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          // pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

        {/* Lista de actividades */}

        <FlatList
          data={filteredActivities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default Completed
