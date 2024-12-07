import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import profileImage from '../../../../assets/profile.png'
import { ClasseSlide } from '../../../components/slides/index.slides'
import LevelCard from '../../../components/cards/LevelCard'
import level1Insignia from '../../../../assets/level1_code_explorer.png'
import rankingAnimation from '../../../../assets/podium.json'

import LottieView from 'lottie-react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
const Home = () => {
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

  return (
    <ScrollView className="flex-1 bg-[#F5F9FF]">
      <View className="flex-1 w-[90%] mx-auto flex-col gap-10 py-12">
        {/* Encabezado */}
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-col gap-1">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Hola, Cristhian Rodríguez
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 11,
                color: '#545454',
              }}
            >
              Tercero Sistemas "A" | Desarrollo Web
            </Text>
          </View>

          <View className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 relative overflow-hidden">
            <Image
              source={profileImage}
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

        <View className="flex flex-col justify-center items-center gap-5 bg-white p-4 rounded-2xl shadow-lg shadow-gray-300">
          {/* Imagen del nivel */}
          <View className="w-[150px] h-[150px] relative rounded-full overflow-hidden mb-4">
            <Image
              source={level1Insignia}
              className="w-full h-full object-cover"
            />
          </View>

          {/* Título del nivel */}
          <Text
            style={{
              fontFamily: 'PressStart2P_400Regular',
              fontSize: 10,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            Has llegado al nivel 1
          </Text>

          {/* Subtítulo del nivel */}
          <Text
            style={{
              fontFamily: 'PressStart2P_400Regular',
              fontSize: 9,
              color: '#741D1D',
              textAlign: 'center',
            }}
          >
            Explorador de Códigos
          </Text>

          {/* Barra de progreso */}
          <View className="w-[80%] flex flex-col gap-2">
            <View className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
              {/* Barra de progreso */}
              <View
                className="h-full bg-blue-500 flex justify-center items-center"
                style={{ width: '50%' }}
              >
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 7,
                    color: 'white',
                  }}
                >
                  100xp
                </Text>
              </View>
            </View>

            {/* Textos de puntajes */}
            <View className="flex flex-row justify-between text-xs text-gray-600">
              <Text
                style={{
                  fontFamily: 'PressStart2P_400Regular',
                  fontSize: 8,
                  color: '#4B4B4B',
                }}
              >
                0xp
              </Text>
              <Text
                style={{
                  fontFamily: 'PressStart2P_400Regular',
                  fontSize: 6,
                  color: '#4B4B4B',
                }}
              >
                Nivel 2 | 200xp
              </Text>
            </View>
          </View>

          {/* Botón de acción o mensaje motivacional */}
          <View className="mt-1 w-full flex justify-center items-center">
            <Text
              style={{
                fontFamily: 'PressStart2P_400Regular',
                fontSize: 10,
                color: '#4B4B4B',
                fontStyle: 'italic',
              }}
            >
              ¡Sigue adelante, Explorador!
            </Text>
          </View>
        </View>

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
  )
}

export default Home
