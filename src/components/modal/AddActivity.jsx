import { Modal, Text } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

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
