import { Image, View } from 'react-native'

const StudentCard = () => {
  return (
    <View>
      <View className="flex flex-row items-center gap-3 py-5 border-b border-gray-300">
        <View className="w-16 h-16 rounded-full bg-red-400 relative overflow-hidden">
          <Image
            source={profile}
            className="absolute w-full h-full object-cover"
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 15,
              color: '#202244',
            }}
          >
            Cristhian Rodríguez
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              color: '#545454',
            }}
          >
            Desarrollo Web
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center gap-3 py-5 border-b border-gray-300">
        <View className="w-16 h-16 rounded-full bg-red-400 relative overflow-hidden">
          <Image
            source={profile}
            className="absolute w-full h-full object-cover"
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 15,
              color: '#202244',
            }}
          >
            Cristhian Rodríguez
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 11,
              color: '#545454',
            }}
          >
            cristhian.rodriguez1596@utc.edu.ec
          </Text>
        </View>
      </View>
    </View>
  )
}

export default StudentCard
