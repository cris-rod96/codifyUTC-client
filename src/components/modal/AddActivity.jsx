import { Modal, Text, View } from 'react-native'

const AddActivity = () => {
  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
    >
      <View>
        <Text>Hi world</Text>
      </View>
    </Modal>
  )
}

export default AddActivity
