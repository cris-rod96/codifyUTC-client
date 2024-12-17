import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import loading from 'assets/loading.json'
import { useLoading } from 'context/LoadingContext'

const Loading = () => {
  const { isVisible, message } = useLoading()

  if (!isVisible) return null

  return (
    <View className="flex-1 flex-col justify-center items-center bg-[#F5F9FF] absolute top-0 left-0 z-50 w-full h-screen">
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
