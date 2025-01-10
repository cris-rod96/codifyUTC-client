import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import ActivityCard from '../../../components/cards/ActivityCard'

import quizzLogo from '../../../../assets/quizz.png'
import SelectActivityModal from '../../../components/modal/SelectActivityModal'
import { useEffect, useState } from 'react'
import TestModal from '../../../components/modal/TestModal'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const ActivitiesClass = () => {
  const { activities } = useSelector((state) => state.teacher)
  const [modalVisible, setModalVisible] = useState(false)
  const [newModalVisible, setNewModalVisible] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const navigation = useNavigation()

  const handleContinue = (activity) => {
    setSelectedActivity(activity)
    setModalVisible(false)
    setNewModalVisible(true)

    if (activity === 'quizz') {
      navigation.navigate('QuizzCode')
    }

    if (activity === 'lightning') {
      navigation.navigate('LightningCode')
    }

    if (activity === 'puzzle') {
      navigation.navigate('PuzzleMaster')
    }

    if (activity === 'brain') {
      navigation.navigate('BrainBoost')
    }
  }

  const toggleModal = () => setModalVisible((prev) => !prev)
  return (
    <View className="flex-1 w-full bg-[#F5F9FF] relative">
      <View className="bg-blue-600 py-4 px-6 flex-row items-center justify-between shadow-md">
        <View className="flex flex-row items-center">
          <Ionicons
            name="game-controller-sharp"
            size={24}
            color={'white'}
            className="mr-4"
          />
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 20,
              color: 'white',
            }}
          >
            Actividades
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPressIn={toggleModal}>
            <Ionicons name="add-circle-sharp" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Actividades */}
      <View className="flex-1 pt-4 py-20">
        <ScrollView className="p-4">
          {/* {activities.map((activity) => {
            return (
              <ActivityCard
                activity={activity}
                onEdit={() => {}}
                onDelete={() => {}}
                onClose={() => {}}
              />
            )
          })} */}
        </ScrollView>
      </View>

      {modalVisible && (
        <SelectActivityModal
          onClose={toggleModal}
          // onContinue={handleContinue}
        />
      )}

      {/* {newModalVisible && <TestModal activity={selectedActivity} />} */}
    </View>
  )
}

export default ActivitiesClass
