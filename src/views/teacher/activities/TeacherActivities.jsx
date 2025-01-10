import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  Octicons,
} from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import { useDispatch, useSelector } from 'react-redux'
import activitiesAPI from 'api/activities/activities.api'
import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import brainLogo from 'assets/brain.png'
import puzzleLogo from 'assets/puzzle.png'
import logoDefault from 'assets/game-default.png'
import { useNavigation } from '@react-navigation/native'
import { saveActivities } from 'redux/slices/teacher.slice'
import { dateUtils } from '../../../utils/index.utils'
import gameDefault from 'assets/game-default.png'
import SelectActivityModal from '../../../components/modal/SelectActivityModal'

const TeacherActivities = () => {
  const navigation = useNavigation()
  const { activities } = useSelector((state) => state.teacher)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [showSelectActivityModal, setShowSelectActivityModal] = useState(false)
  const toggleShowSelecActivityModal = () =>
    setShowSelectActivityModal((prev) => !prev)

  const handleContinue = (type) => {
    console.log(type)
    if (type === 'Quizz Code') {
      navigation.navigate('TabActivity', {
        screen: 'QuizzCode',
      })
    }
  }

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

  const viewActivityDetails = (activity_id) => {
    navigation.navigate('DetailActivity', {
      activity_id,
    })
  }

  const fetchData = () => {
    if (user) {
      activitiesAPI
        .getByTeacher(user.id)
        .then((res) => {
          const { activities } = res.data
          dispatch(saveActivities(activities))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const deleteActivity = (id) => {
    Alert.alert('Eliminar actividad', '¿Deseas eliminar esta actividad?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          activitiesAPI
            .deleteActivity(id)
            .then((res) => {
              fetchData()
            })
            .catch((err) => {
              console.log(err)
            })
        },
      },
    ])
  }

  useEffect(() => {
    fetchData()
  }, [user])

  return (
    <View className="flex-1 flex flex-col h-full w-full bg-[#F5F9FF] px-5 py-5">
      <SelectActivityModal
        isVisible={showSelectActivityModal}
        onClose={toggleShowSelecActivityModal}
        onContinue={handleContinue}
      />
      {/* Mostrar barra de búsqueda solo si hay actividades */}
      {activities.length > 0 && (
        <View className="flex flex-col gap-5">
          {/* Buscador */}
          <View className="flex flex-row items-center justify-between h-[55px] bg-white rounded-xl overflow-hidden border border-gray-200 pr-2">
            {/* Icono de busqueda */}
            <View className="w-12 flex justify-center items-center">
              <Octicons name="search" size={18} />
            </View>
            {/* Input de busqueda */}
            <TextInput
              style={{
                fontFamily: 'Mulush_700Bold',
                fontSize: 16,
                color: '#B4BDC4',
              }}
              className="flex-1 h-full pl-2"
              // onChangeText={(value) => handleSearch(value)}
              // defaultValue={search}
            />
            {/* Icono de filtros */}
            <TouchableOpacity
              className="w-10 h-10 justify-center items-center rounded-lg"
              // onPress={toggleModal}
            >
              <FontAwesome6 name="sliders" size={17} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Área desplazable para cursos */}
      {activities.length > 0 ? (
        <ScrollView
          className="flex-1 mt-5"
          showsVerticalScrollIndicator={false}
        >
          {activities.map((item) => (
            <View className="flex flex-col bg-white rounded-lg">
              {/* Poster and Logo */}
              <View className="w-full h-[160px] relative rounded-t-lg">
                <Image
                  source={item.poster ? { uri: item.poster } : gameDefault}
                  className="absolute w-full h-full object-contain rounded-t-lg"
                />

                <Image
                  source={getLogo(item.type)}
                  className="absolute w-[35px] h-[35px] top-3 right-5"
                />

                <View
                  className="px-3 py-1 absolute w-[60px] bottom-3 rounded-full flex flex-row items-center justify-center right-3"
                  style={{
                    backgroundColor:
                      item.status === 'Abierta' ? '#008b07' : '#b10303',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 10,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View className="flex flex-col px-3 py-5">
                <View className="flex flex-row items-center justify-between ">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 16,
                      color: '#202244',
                    }}
                  >
                    {item.type}
                  </Text>

                  <TouchableOpacity
                    className="flex flex-row items-center gap-2"
                    onPress={() => editActivity(item.id)}
                  >
                    <Text
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 12,
                        color: '#202244',
                      }}
                    >
                      Editar
                    </Text>
                    <Octicons
                      name="chevron-right"
                      size={15}
                      color={'#202244'}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row gap-2 justify-between items-center mt-5">
                  <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
                    <Entypo name="game-controller" size={24} />
                    <View className="flex flex-row items-center gap-1">
                      <Text
                        style={{
                          fontFamily: 'Mulish_800ExtraBold',
                          fontSize: 14,
                          color: '#202244',
                        }}
                      >
                        {item.activities_count} juegos
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
                    <Entypo name="trophy" size={24} />
                    <View className="flex flex-row items-center gap-1">
                      <Text
                        style={{
                          fontFamily: 'Mulish_800ExtraBold',
                          fontSize: 14,
                          color: '#202244',
                        }}
                      >
                        {item.total_score} pts
                      </Text>
                    </View>
                  </View>

                  <View className="flex-1 px-3 py-5 border border-gray-200 rounded-lg flex flex-col justify-center gap-1 items-center">
                    <FontAwesome name="hourglass-half" size={24} />
                    <View className="flex flex-row items-center gap-1">
                      <Text
                        style={{
                          fontFamily: 'Mulish_800ExtraBold',
                          fontSize: 14,
                          color: '#202244',
                        }}
                      >
                        {item.total_time} segs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                className="flex flex-row items-center justify-center gap-2 h-[40px] bg-[#440b0b] mt-5 rounded-b-lg"
                onPress={() => deleteActivity(item.id)}
              >
                <Octicons name="trash" size={16} color={'white'} />
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontStyle: 16,
                    color: 'white',
                  }}
                >
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
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

          <TouchableOpacity
            className="w-full py-4 bg-[#741D1D] rounded-full flex flex-row items-center justify-center mt-5"
            onPress={toggleShowSelecActivityModal}
          >
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
              }}
            >
              Agregar actividad
            </Text>
            <Octicons
              name="chevron-right"
              size={18}
              color={'white'}
              className="absolute right-4"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default TeacherActivities
