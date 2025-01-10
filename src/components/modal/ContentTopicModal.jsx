import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const ContentTopicModal = ({
  showContentTopicModal,
  toggleContentTopicModal,
  currentTopic,
  currentTopicContent,
}) => {
  return (
    <Modal
      visible={showContentTopicModal}
      animationType="fade"
      transparent={true}
      onRequestClose={toggleContentTopicModal}
    >
      <View className="flex-1 bg-[#F5F9FF] relative">
        <TouchableOpacity
          className="absolute top-4 right-4"
          onPress={toggleContentTopicModal}
        >
          <Ionicons name="close-circle-sharp" size={30} color={'#741D1D'} />
        </TouchableOpacity>

        <View className="w-full mx-auto mt-14 pb-10">
          {/* Header */}
          <View className="flex flex-col px-5">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
                color: '#202244',
              }}
            >
              {currentTopic}
            </Text>
          </View>

          {/* Contenido */}

          <ScrollView className="px-5 " showsVerticalScrollIndicator={false}>
            <View className="flex flex-col gap-5 py-10 ">
              <Text
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 15,
                  color: '#545454',
                  lineHeight: 20,
                  textAlign: 'justify',
                }}
              >
                {currentTopicContent}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default ContentTopicModal
