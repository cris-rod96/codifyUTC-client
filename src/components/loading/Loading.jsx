import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import loading from '../../../assets/loading.json'

const Loading = ({ message }) => {
  return (
    <View className="flex-1 flex-col justify-center items-center bg-[#F5F9FF]">
      <LottieView
        autoPlay
        loop
        source={loading}
        style={{ width: 100, height: 100 }}
      />
      <Text
        style={{
          fontFamily: 'Jost_600SemiBold',
          fontSize: 11,
          color: '#202244',
        }}
      >
        {message}
      </Text>
    </View>
  )
}

export default Loading
