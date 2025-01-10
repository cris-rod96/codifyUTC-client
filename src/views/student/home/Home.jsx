import {
  Animated,
  Easing,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import profileImage from 'assets/profile.png'
import rankingAnimation from 'assets/podium.json'

import LottieView from 'lottie-react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Home = () => {
  const { user } = useSelector((state) => state.user)
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2500)
  }, [])
  const userProgress = {
    level: 3,
    xp: 1500,
    nextLevelXP: 2000,
    rank: 5,
    totalUsers: 50,
  }

  const [rotation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    rotation.setValue(0) // Resetear rotación

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000, // Duración de la animación en milisegundos
        easing: Easing.linear, // Movimiento constante
        useNativeDriver: true, // Mejora el rendimiento
      }),
      {
        iterations: -1,
      }
    ).start()

    setTimeout(() => {
      Animated.timing(rotation).stop()
    }, 3000)
  }

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <View className="flex-1 mx-auto flex-col ">
      {/* Encabezado */}
      <View className="flex flex-row justify-between items-center border-b border-gray-200 py-5 px-5 bg-[#741D1D]">
        <View className="flex flex-col gap-1">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: 'white',
            }}
          >
            Hola, {user.full_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              color: '#f5f9ff',
              letterSpacing: 0.3,
            }}
          >
            {user.role}
          </Text>
        </View>

        <View className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 relative overflow-hidden">
          <Image
            source={
              user.profile_picture
                ? { uri: user.profile_picture }
                : profileImage
            }
            className="absolute w-full h-full object-cover"
          />
        </View>
      </View>

      {/* <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <Text className="text-xl font-bold text-gray-800">
            Nivel {userProgress.level}: Aprendiz de Códigos
          </Text>
          <Text className="text-gray-600">
            Experiencia: {userProgress.xp}/{userProgress.nextLevelXP} XP
          </Text>
          <View className="bg-gray-300 h-2 rounded-full my-2">
            <View
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${(userProgress.xp / userProgress.nextLevelXP) * 100}%`,
              }}
            />
          </View>
          <TouchableOpacity className="mt-2 bg-blue-500 py-2 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Completa un desafío diario
            </Text>
          </TouchableOpacity>
        </View> */}

      {/* Body */}
      <ScrollView
        className="flex-1 bg-[#F5F9FF]"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-5 pt-5 pb-12">
          {/* Recomendaciones */}
          <View className="flex flex-col gap-3 w-full">
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
                onPress={startAnimation}
                className="w-fit flex flex-row items-center"
              >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <MaterialIcons name="refresh" size={20} color="#202244" />
                </Animated.View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="items-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
              <Text
                className="mb-2"
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 15,
                  color: '#202244',
                }}
              >
                Sin novedades que mostrar
              </Text>
              <Text
                className="mb-4"
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 12,
                  color: '#545454',
                }}
              >
                Estas al dia con las novedades
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ranking */}
          <View className="flex flex-col gap-3 w-full">
            <View className="flex flex-row items-center w-full justify-between">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 18,
                  color: '#202244',
                }}
              >
                Clasificación
              </Text>
            </View>
            <View className="bg-white rounded-lg pb-4 mb-4 shadow-md flex flex-col justify-center items-center px-5">
              <LottieView
                source={rankingAnimation}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />

              <Text
                className="text-gray-600"
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 12,
                  color: '#545454',
                }}
              >
                Estás en la posición {userProgress.rank} de{' '}
                {userProgress.totalUsers}.
              </Text>
              <TouchableOpacity className="mt-2 bg-purple-500 py-2 rounded-lg w-full">
                <Text
                  className="text-white text-center font-semibold"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 12,
                    color: 'white',
                  }}
                >
                  Ver Clasificación
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-col gap-3 w-full">
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
            <TouchableOpacity className="items-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
              <Text
                className="mb-2"
                style={{
                  fontFamily: 'Jost_700Bold',
                  fontSize: 15,
                  color: '#202244',
                }}
              >
                Aún no tienes actividades registradas
              </Text>
              <Text
                className="mb-4 text-wrap text-center"
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 12,
                  color: '#545454',
                }}
              >
                Se mostrarán aquí las actividades recientes de la última semana
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
