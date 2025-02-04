import React, { useEffect, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native'
import { topicsAPI, activitiesAPI } from 'api/index.api'
import Lottie from 'lottie-react-native'
import empty from 'assets/no-data.json'
import puzzle from 'assets/puzzle.png'
import lightning from 'assets/lightning.png'
import brain from 'assets/brain.png'
import quizz from 'assets/quizz.png'

import { Entypo, FontAwesome, Octicons } from '@expo/vector-icons'
import gameDefault from 'assets/game-default.png'
import {
  TopicModal,
  SelectActivityModal,
  EditTopicModal,
  EditActivityModal,
  DeleteQuestionModal,
} from 'components/modal/index.modals'
import { dateUtils } from '../../../utils/index.utils'
import { useSelector } from 'react-redux'

const DetailClassTeacher = ({ route, navigation }) => {
  const { classes, courses } = useSelector((state) => state.teacher)
  const [currentClass, setCurrentClass] = useState({
    id: null,
    name: null,
  })
  const [topics, setTopics] = useState([])
  const [activities, setActivities] = useState([])

  const [refresh, setRefresh] = useState(false)

  const [showTopicModal, setShowTopicModal] = useState(false)
  const toggleShowTopicModal = () => setShowTopicModal((prev) => !prev)

  const [showSelectActivityModal, setShowSelectActivityModal] = useState(false)
  const toggleShowSelecActivityModal = () =>
    setShowSelectActivityModal((prev) => !prev)

  const [showEditTopicModal, setShowEditTopicModal] = useState(false)
  const toggleShowEditTopicModal = () => setShowEditTopicModal((prev) => !prev)

  const [showEditActivityModal, setShowEditActivityModal] = useState(false)
  const toggleShowEditActivityModal = () =>
    setShowEditActivityModal((prev) => !prev)
  const [topicId, setTopicId] = useState(null)
  const [activityId, setActivityId] = useState(null)

  const [showQuestionDelete, setShowQuestionDelete] = useState(false)
  const toggleShowQuestionDelete = () => setShowQuestionDelete((prev) => !prev)

  const editContent = (topic_id) => {
    setTopicId(topic_id)
    toggleShowEditTopicModal()
  }

  const onContinue = () => {
    setRefresh((prev) => !prev)
  }

  const afterDelete = (confirm) => {
    if (confirm) {
      setShowQuestionDelete(false)
      setRefresh((prev) => !prev)
    }
  }

  const handleDelete = (id) => {
    setActivityId(id)
    toggleShowQuestionDelete()
  }

  const handleContinue = (type) => {
    setShowSelectActivityModal(false)
    if (type === 'Quizz Code') {
      navigation.navigate('TabActivity', {
        screen: 'QuizzCode',
        params: {
          class_id: currentClass.id,
        },
      })
    }

    if (type === 'Lightning Code') {
      navigation.navigate('TabActivity', {
        screen: 'LightningCode',
        params: {
          class_id: currentClass.id,
        },
      })
    }
  }

  const getLogo = (typeActivity) => {
    switch (typeActivity) {
      case 'Quizz Code':
        return quizz
      case 'Lightning Code':
        return lightning
      case 'Puzzle Master':
        return puzzle
      case 'Brain Boost':
        return brain
    }
  }

  const editActivity = (id) => {
    setActivityId(id)
    toggleShowEditActivityModal()
  }

  const verifyExpired = (due_date) => {
    const currentDate = dateUtils.formatDate(new Date())
    return currentDate > due_date
  }

  const renderContent = (item, index) => {
    return (
      <View
        className="flex flex-col bg-white border border-gray-200  overflow-hidden pb-10 relative"
        key={item.id}
      >
        {/* Cabecera */}
        <View
          className="px-5 flex flex-col
         items-center relative pt-3"
        >
          <View className="w-full flex flex-row items-center justify-end mb-2 ">
            <TouchableOpacity
              className="flex flex-row items-center gap-2"
              onPress={() => editContent(item.id)}
            >
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#202244',
                }}
              >
                Editar
              </Text>
              <Octicons name="chevron-right" size={15} color={'#202244'} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 15,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            {item.title}
          </Text>
        </View>

        {/* Body */}
        <View className="px-5 pt-3 py-7">
          <Text
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 13,
              textAlign: 'justify',
            }}
          >
            {item.content}
          </Text>
        </View>

        {/* Recurso externo */}
        {item.external_resource && (
          <View className="px-5 pb-3 flex flex-row items-center gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 15,
                color: '#B1B1B1',
              }}
            >
              Recurso externo:{' '}
            </Text>
            <Octicons
              name="link-external"
              size={15}
              aria-label="Visitar"
              color={'#741D1D'}
            />
          </View>
        )}

        <Text
          className="absolute bottom-3 right-3"
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 12,
            color: '#B1B1B1',
          }}
        >
          {index + 1}
        </Text>
      </View>
    )
  }

  const renderActivty = (item) => {
    const activityExpired = verifyExpired(item.due_date)
    return (
      <View className="flex flex-col bg-white rounded-lg" key={item.id}>
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
              <Octicons name="chevron-right" size={15} color={'#202244'} />
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
                  10 segs
                </Text>
              </View>
            </View>
          </View>

          {activityExpired && (
            <View className="px-3 mt-5 flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 14,
                  color: '#741D1D',
                  textAlign: 'center',
                }}
              >
                Esta actividad ya expiró. Te recomendamos cerrarla o eliminarla
                para evitar confusiones.
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 12,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Fecha de expiración: {item.due_date}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          className="flex flex-row items-center justify-center gap-2 h-[40px] bg-[#440b0b] mt-2 rounded-b-lg"
          onPress={() => handleDelete(item.id)}
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
    )
  }

  useEffect(() => {
    if (currentClass.id) {
      setTopics(currentClass.Topics)
      activitiesAPI
        .getByClass(currentClass.id)
        .then((res) => {
          const { activities } = res.data
          setActivities(activities)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          console.log('Finalizando búsqueda de actividades')
        })
    }
  }, [currentClass, refresh])

  useEffect(() => {
    if (route.params) {
      const { id, name } = route.params
      const foundClass = classes.find((classItem) => classItem.id === id)
      setCurrentClass(foundClass)

      navigation.setOptions({
        title: name,
      })
    }
  }, [route.params, navigation, courses])

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      {topics.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        >
          <View className="flex-1 bg-[#F5F9FF] flex flex-col">
            <View className="px-4 py-5">
              <View className="flex flex-row items-center justify-between mb-5">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 18,
                    color: '#202244',
                  }}
                >
                  Contenido
                </Text>

                <TouchableOpacity
                  className="flex flex-row items-center gap-2"
                  onPress={toggleShowTopicModal}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 15,
                      color: '#741D1D',
                    }}
                  >
                    Agregar
                  </Text>
                  <Octicons name="chevron-right" size={15} color={'#741D1D'} />
                </TouchableOpacity>
              </View>
              {/* Topics */}
              <View className="flex flex-col gap-3">
                {/* Mostrar el pdf */}
                {topics.map((topic, index) => renderContent(topic, index))}
              </View>
            </View>

            {/* Actividades */}
            <View className="flex flex-col px-4 mt-10">
              {/* Header */}
              <View className="flex flex-row items-center justify-between">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 18,
                    color: '#202244',
                  }}
                >
                  Actividades
                </Text>

                <TouchableOpacity
                  className="flex flex-row items-center gap-2"
                  onPress={toggleShowSelecActivityModal}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 15,
                      color: '#741D1D',
                    }}
                  >
                    Agregar
                  </Text>
                  <Octicons name="chevron-right" size={15} color={'#741D1D'} />
                </TouchableOpacity>
              </View>
              {activities.length > 0 ? (
                // Activities
                <View className="flex flex-col gap-3 py-5">
                  {activities.map((activity) => renderActivty(activity))}
                </View>
              ) : (
                <View className="mt-5 bg-white border border-dashed border-gray-200 rounded-lg px-5 py-3 flex flex-col gap-1 justify-center items-center">
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
                      color: '#6D6D6D',
                      textAlign: 'center',
                    }}
                  >
                    Agrega una actividad para que tus estudiantes aprendan
                    jugando.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 bg-[#F5F9FF] flex justify-center items-center px-10">
          <View className="flex flex-col justify-center items-center w-full">
            <Lottie
              source={empty}
              autoPlay
              loop
              style={{
                width: 250,
                height: 250,
              }}
            />
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 21,
                color: '#202244',
              }}
            >
              ¡Oops!
            </Text>
            <TouchableOpacity
              className="mt-5 w-full bg-[#741D1D] rounded-full py-3 relative flex flex-row items-center justify-center"
              onPress={toggleShowTopicModal}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                Agregar contenido
              </Text>
              <Octicons
                name="chevron-right"
                size={20}
                color={'white'}
                className="absolute right-5"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TopicModal
        showTopicModal={showTopicModal}
        toggleTopicModal={toggleShowTopicModal}
        ClassId={currentClass.id}
      />

      <SelectActivityModal
        isVisible={showSelectActivityModal}
        onClose={toggleShowSelecActivityModal}
        onContinue={handleContinue}
        hasClass={true}
      />

      <EditTopicModal
        visible={showEditTopicModal}
        onClose={toggleShowEditTopicModal}
        topic_id={topicId}
        onContinue={onContinue}
      />
      <EditActivityModal
        visible={showEditActivityModal}
        onClose={toggleShowEditActivityModal}
        activity_id={activityId}
        onContinue={onContinue}
      />
      <DeleteQuestionModal
        title={'¿Realmente desea eliminar esta actividad?'}
        isVisible={showQuestionDelete}
        onClose={toggleShowQuestionDelete}
        onContinue={afterDelete}
        model={'activities'}
        id={activityId}
      />
    </View>
  )
}

export default DetailClassTeacher
