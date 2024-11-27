import React from 'react'
import { Modal, Text } from 'react-native'

const TestModal = ({ activity }) => {
  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
    >
      <Text>{activity}</Text>
    </Modal>
  )
}

export default TestModal
