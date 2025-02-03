import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { activitiesAPI } from 'api/index.api'
import gameDefault from 'assets/game-default.png'
import newLogo from 'assets/newLogo.png'

import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'

const NewsSlide = () => {
  const { userCourse } = useSelector((state) => state.student)

  const [activities, setActivities] = useState([])

  const renderActivity = ({ item, index }) => {
    return (
      <View
        className="flex flex-col w-[250px] h-auto  bg-white mr-4 rounded-xl border border-gray-200 relative"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
        key={item.id}
      >
        <View className="w-full h-[125px] bg-red-400 rounded-t-xl relative overflow-hidden">
          <Image
            className="absolute w-full h-full object-contain"
            resizeMode="cover"
            source={gameDefault}
          />
          {index === 0 && (
            <Image
              source={newLogo}
              className="absolute z-50 -top-1 -left-1 w-12 h-12"
            />
          )}
        </View>
        <View className="py-3 px-3  relative">
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 14,
              color: '#202244',
            }}
          >
            {item.type}
          </Text>
          <View className="flex flex-row items-center gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 14,
                color: '#202244',
              }}
            >
              Creado el:
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 13,
                color: '#888',
              }}
            >
              {item.created_at}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  useEffect(() => {
    console.log(userCourse)
    if (userCourse) {
      activitiesAPI
        .getByTeacher(userCourse.Course.TeacherId)
        .then((res) => {
          const { activities } = res.data
          setActivities(activities)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userCourse])

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
          Últimas novedades
        </Text>

        <TouchableOpacity
          // onPress={startAnimation}
          className="w-fit flex flex-row items-center"
        >
          <View>
            <MaterialIcons name="refresh" size={20} color="#202244" />
          </View>
        </TouchableOpacity>
      </View>

      {userCourse === null && (
        <View className="bg-white w-full border border-dashed border-gray-200 py-5 flex flex-col justify-center items-center px-5">
          <Text
            style={{
              fontFamily: 'Jost_400Regular',
              fontSize: 16,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            Debes inscribirte en el curso creado por tu docente para acceder a
            las últimas novedades. ¡No esperes más y únete ahora!
          </Text>
        </View>
      )}

      {userCourse !== null &&
        (activities && activities.length > 0 ? (
          <FlatList
            data={activities}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialNumToRender={1}
            windowSize={3}
            keyExtractor={(item) => item.id}
            getItemLayout={(data, index) => ({
              length: 254,
              offset: 254 * index,
            })}
            renderItem={renderActivity}
          />
        ) : (
          <View className="bg-white w-full border border-dashed border-gray-200 py-5 flex flex-col justify-center items-center px-5">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 15,
                color: '#888',
                textAlign: 'center',
              }}
            >
              ¡Mantente al día con las actualizaciones más recientes! Por ahora,
              no hay novedades nuevas, pero pronto habrá más información para
              ti.📢🚀
            </Text>
          </View>
        ))}
    </View>
  )
}

export default NewsSlide
