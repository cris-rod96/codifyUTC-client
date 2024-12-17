import { FontAwesome6, Octicons } from '@expo/vector-icons'
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import StatusActivityModal from '../../../components/modal/StatusActivityModal'
import { useEffect, useState } from 'react'

import quizzImage from 'assets/quizz.png'
import puzzleImage from 'assets/puzzle.png'
import brainImage from 'assets/brain.png'
import lightningImage from 'assets/lightning.png'

const Activities = () => {
  const [openModal, setOpenModal] = useState(false)
  const [options, setOptions] = useState(null)
  const [activities, setActivities] = useState([])
  const toggleModal = () => setOpenModal((prev) => !prev)

  const data = [
    {
      id: 1,
      status: 'pending',
      type: 'quizz',
      descriptions: [
        {
          label: 'Preguntas',
          value: 12,
        },
        {
          label: 'Minutos',
          value: 6,
        },
        {
          label: 'Participantes',
          value: 12,
        },
      ],

      overdue: false,
      overdue_date: 30 - 12 - 2024,
    },

    {
      id: 2,
      status: 'completed',
      type: 'lightning',
      descriptions: [
        {
          label: 'Preguntas',
          value: 12,
        },
        {
          label: 'Minutos',
          value: 6,
        },
        {
          label: 'Participantes',
          value: 12,
        },
      ],
      overdue: false,
      overdue_date: 30 - 12 - 2024,
    },

    {
      id: 3,
      status: 'pending',
      type: 'brain',
      descriptions: [
        {
          label: 'Preguntas',
          value: 12,
        },
        {
          label: 'Minutos',
          value: 6,
        },
        {
          label: 'Participantes',
          value: 12,
        },
      ],
      overdue: false,
      overdue_date: 30 - 12 - 2024,
    },

    {
      id: 4,
      status: 'pending',
      type: 'puzzle',
      descriptions: [
        {
          label: 'Preguntas',
          value: 12,
        },
        {
          label: 'Minutos',
          value: 6,
        },
        {
          label: 'Participantes',
          value: 12,
        },
      ],
      overdue: true,
      overdue_date: 30 - 12 - 2024,
    },
  ]

  const [search, setSearch] = useState('')
  const handleSearch = (text) => setSearch(text)

  const getImage = (type) => {
    switch (type) {
      case 'quizz':
        return quizzImage
      case 'puzzle':
        return puzzleImage
      case 'brain':
        return brainImage
      case 'lightning':
        return lightningImage
    }
  }

  const renderActivities = (item, index) => {
    const bgColor = item.status === 'pending' ? 'bg-red-800' : 'bg-green-800'
    const image = getImage(item.type)
    const mb = index === activities.length - 1 ? 'mb-10' : 'mb-24'
    return (
      <View
        className={`bg-white rounded-xl border border-gray-200 pt-16 shadow-sm shadow-red-800 ${mb}`}
      >
        <Image
          source={image}
          className="w-[100px] h-[100px] absolute -top-16 left-1/2 -translate-x-1/2"
        />

        <View className="flex flex-row gap-2 px-5">
          {item.descriptions.map((desc, index) => (
            <View
              className={`flex-1 flex justify-center items-center py-5 border border-gray-200 rounded-lg ${bgColor}`}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 24,
                  color: 'white',
                }}
              >
                {desc.value}
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 12,
                  color: 'white',
                }}
              >
                {desc.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View className="mt-5 flex flex-col gap-1">
          {item.status === 'pendiente' && (
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#202244',
                textAlign: 'center',
              }}
            >
              Disponible hasta el: 21-10-2024
            </Text>
          )}
          <TouchableOpacity
            className={`py-3 flex justify-center items-center ${bgColor} rounded-b-xl relative`}
          >
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                color: 'white',
                fontSize: 14,
              }}
            >
              {item.status === 'pendiente' ? 'Realizar' : 'Completado'}
            </Text>

            <Octicons
              name="arrow-right"
              size={21}
              color="white"
              className="absolute right-5"
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  useEffect(() => {
    setActivities(data)
  }, [])

  useEffect(() => {
    if (options !== null) {
      const newActivities = data.filter((activity) => {
        const matchesStatus =
          options.status.length > 0
            ? options.status.includes(activity.status)
            : true

        const matchesTypes =
          options.types.length > 0
            ? options.types.includes(activity.type)
            : true
        return matchesStatus && matchesTypes
      })

      setActivities(newActivities)
    }
  }, [options])

  return (
    <View className="flex-1 flex-col px-5 py-3">
      <StatusBar backgroundColor={'#741D1D'} barStyle={'light-content'} />
      {/* Filtros (Buscador,buscar por tipo de juego y estado) */}
      <View className="flex flex-col gap-1">
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
            onChangeText={(value) => handleSearch(value)}
            defaultValue={search}
          />
          {/* Icono de filtros */}
          <TouchableOpacity
            className="w-10 h-10 justify-center items-center bg-[#7D1D1D] rounded-lg"
            onPress={toggleModal}
          >
            <FontAwesome6 name="sliders" size={17} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Activities */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
      >
        <View className="flex-1 mt-20">
          {activities.map((activity, index) =>
            renderActivities(activity, index)
          )}
        </View>
      </ScrollView>

      {/* Modal con el status de las actividades */}
      <StatusActivityModal
        openModal={openModal}
        toggleModal={toggleModal}
        setOptions={setOptions}
      />
    </View>
  )
}

export default Activities
