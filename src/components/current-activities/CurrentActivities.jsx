import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { responsesAPI } from 'api/index.api'
import poster from 'assets/bg-tech.jpg'
import { FlatList } from 'react-native-gesture-handler'
import { dateUtils } from 'utils/index.utils'
import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import brainLogo from 'assets/brain.png'
import puzzleLogo from 'assets/puzzle.png'
const CurrentActivities = () => {
  const [responses, setResponses] = useState([])
  const { user } = useSelector((state) => state.user)

  const getLogo = (type) => {
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

  useEffect(() => {
    if (user) {
      responsesAPI.getByStudent(user.id).then((res) => {
        const { responses } = res.data
        setResponses(responses)
      })
    }
  }, [])

  return (
    <View className="flex flex-col gap-3 w-full mb-4">
      <View className="flex flex-row items-center w-full justify-between">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: '#202244',
          }}
        >
          Actividades recientes
        </Text>
      </View>
      {responses && responses.length > 0 ? (
        <FlatList
          data={responses}
          keyExtractor={(item) => item.id}
          horizontal
          initialNumToRender={1}
          windowSize={3}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          getItemLayout={(data, index) => ({
            length: 254,
            offset: 254 * index,
          })}
          renderItem={({ item }) => (
            <View className="flex flex-col w-[250px] h-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
              <View className="w-full h-[150px] relative">
                <Image
                  className="absolute w-full h-full object-contain"
                  resizeMode="cover"
                  source={
                    item.Activity.poster
                      ? { uri: item.Activity.poster }
                      : poster
                  }
                />

                <View className="w-full h-full flex justify-center items-center absolute top-0 left-0">
                  <Image
                    source={getLogo(item.Activity.type)}
                    className="w-[75px] h-[75px] object-contain"
                    resizeMode="cover"
                  />
                </View>
              </View>

              <View className="px-3 py-5 flex flex-col">
                <View className="flex flex-row items-center justify-between">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 15,
                      color: '#202244',
                    }}
                  >
                    {item.Activity.type}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#888',
                    }}
                  >
                    {item.score_total} / {item.Activity.total_score}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'Mulish_600SemiBold',
                    fontSize: 13,
                    color: '#888',
                  }}
                >
                  Realizado el{' '}
                  {dateUtils.formatDate(new Date(item.completionDate))}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View className="mt-2 w-full bg-white flex flex-col px-3 py-5">
          <Text
            style={{
              fontFamily: 'Jost_400Regular',
              fontSize: 16,
              textAlign: 'center',
              color: '#202244',
            }}
          >
            No se encontraron actividades. Realiza una actividad para que
            aparezca en recientes.
          </Text>
        </View>
      )}
    </View>
  )
}

export default CurrentActivities
