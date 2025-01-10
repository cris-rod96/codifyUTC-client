import { Ionicons, Octicons } from '@expo/vector-icons'
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from 'react-native'
import ActivityCard from '../../../components/cards/ActivityCard'

import quizzLogo from 'assets/quizz.png'
import lightningLogo from 'assets/lightning.png'
import puzzleLogo from 'assets/puzzle.png'
import brainLogo from 'assets/brain.png'

import SelectActivityModal from 'components/modal/SelectActivityModal'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import activitiesAPI from '../../../api/activities/activities.api'
import { useLoading } from 'context/LoadingContext'

// {
//   id: {
//     type: DataTypes.UUID,
//     primaryKey: true,
//     defaultValue: DataTypes.UUIDV4,
//   },

//   poster: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },

//   created_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   due_date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },

//   status: {
//     type: DataTypes.ENUM,
//     values: ['Abierta', 'Cerrada', 'Cancelada'],
//     defaultValue: 'Abierta',
//   },

//   activities_count: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   total_time: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },

//   type: {
//     type: DataTypes.ENUM,
//     values: ['Quizz Code', 'Flash Code', 'Output Battle', 'Puzzle Code'],
//     allowNull: false,
//   },

//   ClassId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: 'Classes',
//       key: 'id',
//     },
//   },
// },

const ActivitiesByClass = ({ class_id }) => {
  const [activities, setActivites] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const { showLoading, hideLoading } = useLoading()

  const [isVisible, setIsVisible] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)
  const [newModalVisible, setNewModalVisible] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const navigation = useNavigation()

  const palette = {
    'Quizz Code': {
      bgColor: '#D99152',
      textColor: '#fff',
    },
    'Lightning Code': {
      bgColor: '#741D1D',
      textColor: '#fff',
    },
    'Puzzle Master': {
      bgColor: '#2E1A1A',
      textColor: '#fff',
    },
    'Brain Boost': {
      bgColor: '#8C3A3A',
      textColor: '#fff',
    },
  }

  const handleContinue = (typeActivity) => {
    setSelectedActivity(typeActivity)
    setIsVisible(false)
    setNewModalVisible(true)

    if (typeActivity === 'Quizz Code') {
      navigation.navigate('QuizzCode', {
        class_id,
      })
    }

    if (typeActivity === 'Lightning Code') {
      navigation.navigate('LightningCode')
    }

    if (typeActivity === 'Puzzle Master') {
      navigation.navigate('PuzzleMaster')
    }

    if (typeActivity === 'Brain Boost') {
      navigation.navigate('BrainBoost')
    }
  }

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

  const toggleModal = () => setIsVisible((prev) => !prev)

  const renderActivity = (item, index) => {
    const logo = getImage(item.type)
    const mb = activities.length - 1 === index ? 'mb-10' : 'mb-16'
    return (
      <TouchableOpacity
        className={`bg-white w-full rounded-xl border border-gray-200 flex relative h-[200px] ${mb}`}
        key={index}
        onPress={() =>
          Alert.alert('Próximamente: Detalle de la actividad: ', item.type)
        }
      >
        <Image
          source={logo}
          className="w-14 h-14 absolute -top-6 left-5 z-50"
        />
        <View
          className={`py-5 bg-[${
            palette[item.type].bgColor
          }] rounded-t-xl relative flex flex-row  justify-center items-center`}
        >
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 18,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            {item.type}
          </Text>

          <TouchableOpacity className="absolute right-6">
            <Octicons name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View className="px-5 py-3 flex flex-col">
          {/* Fecha de creacion */}
          <View className="flex flex-row items-center gap-3 justify-center">
            <Octicons name="calendar" size={14} />
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#202244',
              }}
            >
              Fecha de creación: {item.created_at}
            </Text>
          </View>

          <View className="flex flex-row mt-4 gap-2">
            <View className="flex-1 flex flex-col gap-1 border-b border-gray-200 py-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 20,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                10
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 12,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Actividades
              </Text>
            </View>
            <View className="flex-1 flex flex-col gap-1 border-b border-gray-200 py-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 20,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                5
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 12,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Minutos
              </Text>
            </View>

            <View className="flex-1 flex flex-col gap-1 border-b border-gray-200 py-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 20,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                0
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 12,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Participantes
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="absolute bottom-0 left-0 py-2 w-full bg-[#F5F9FF] rounded-b-xl flex flex-row items-center gap-1 justify-center">
          <Octicons name="alert" size={14} color="#741D1D" />
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              color: '#741D1D',
              textAlign: 'center',
            }}
          >
            Disponible hasta: {item.due_date}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (class_id) {
      // showLoading('Cargando actividades. Espere un momento...')
      activitiesAPI
        .getByClass(class_id)
        .then((res) => {
          const { activities } = res.data
          setActivites(activities)
        })
        .catch((err) => {
          console.log(err.message)
        })
        .finally(() => {
          setIsMounted(true)
          hideLoading()
        })
    }
    console.log(class_id)
  }, [class_id])
  return (
    <>
      <StatusBar backgroundColor={'#741D1D'} barStyle={'light-content'} />
      <SelectActivityModal
        isVisible={isVisible}
        onClose={toggleModal}
        onContinue={handleContinue}
      />
      {isMounted &&
        (activities.length > 0 ? (
          <View className="flex-1 relative">
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="px-5 pt-10  relative">
                {activities.map((activity, index) =>
                  renderActivity(activity, index)
                )}
              </View>
            </ScrollView>

            <TouchableOpacity
              className="absolute bottom-5 right-3 w-10 h-10 rounded-full bg-[#741D1D] flex justify-center items-center"
              onPress={toggleModal}
            >
              <Octicons name="plus" size={23} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex flex-1 justify-center items-center px-5">
            <TouchableOpacity
              className="bg-white border border-dashed border-gray-200 w-full px-3 py-5 rounded-lg flex flex-col gap-2"
              onPress={toggleModal}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Clase sin actividades
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 12,
                  color: '#545454',
                  textAlign: 'center',
                }}
              >
                Agrega actividades a tu clase para que los estudiantes puedan
                aprender con ellas de una manera divertida y efectiva.
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </>
  )
}

export default ActivitiesByClass
