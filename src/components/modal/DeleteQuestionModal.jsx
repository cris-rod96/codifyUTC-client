import React, { useEffect } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import warning from 'assets/warning.json'
import { Octicons } from '@expo/vector-icons'
import { activitiesAPI, classesAPI, topicsAPI, coursesAPI } from 'api/index.api'
const DeleteQuestionModal = ({
  title,
  isVisible,
  onClose,
  onContinue,
  model,
  id,
}) => {
  const handleContinue = () => {
    switch (model) {
      case 'topics':
        topicsAPI
          .delete(id)
          .then((res) => {
            onContinue(true)
          })
          .catch((err) => {
            console.log(err)
          })
        break

      case 'classes':
        classesAPI
          .delete(id)
          .then((res) => {
            onContinue(true)
          })
          .catch((err) => {
            console.log(err.message)
          })
        break

      case 'activities':
        activitiesAPI
          .deleteActivity(id)
          .then((res) => {
            onContinue(true)
          })
          .catch((err) => {
            onContinue(false)
          })
        break

      case 'courses':
        coursesAPI
          .deleteCourse(id)
          .then((res) => {
            onContinue(true)
          })
          .catch((err) => {
            onContinue(false)
          })
        break
    }
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View className="flex-1 bg-black/50  flex justify-center items-center px-5">
        <View className="bg-white px-3 py-5 w-full flex flex-col justify-center items-center rounded-lg gap-2">
          <LottieView
            loop
            autoPlay
            source={warning}
            style={{
              width: 100,
              height: 100,
            }}
          />

          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#B4BDC4',
            }}
          >
            Esta acción no se podrá revertir
          </Text>

          <View className="mt-2 flex flex-row items-center gap-2">
            <TouchableOpacity
              className="flex-1 py-2 bg-[#F5F9FF] rounded-lg border border-gray-200 flex flex-row items-center justify-center gap-2"
              onPress={onClose}
            >
              <Octicons name="x" size={18} />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 flex flex-row items-center gap-2 py-2 bg-[#741D1D] rounded-lg justify-center"
              onPress={handleContinue}
            >
              <Octicons name="trash" color={'white'} size={18} />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteQuestionModal
