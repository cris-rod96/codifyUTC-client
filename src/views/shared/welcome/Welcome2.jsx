import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const Welcome2 = () => {
  const navigation = useNavigation()
  return (
    <View className="h-screen flex-col gap-3 w-[90%] mx-auto relative  bg-[#F5F9FF] pt-[30px]">
      <View className="flex flex-col items-end">
        <TouchableOpacity className="w-auto">
          <Text
            className="text-end"
            style={{ fontFamily: 'Jost_600SemiBold', fontSize: 15 }}
          >
            Omitir
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full h-[400] bg-red-400"></View>
      <View className="flex flex-col gap-2">
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Jost_600SemiBold',
            fontSize: 24,
            color: '#202244',
          }}
        >
          Clases Personalizadas
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            color: '#545454',
          }}
        >
          Sigue las clases y prácticas creadas por tus docentes, con ejercicios
          ajustados a tus necesidades.
        </Text>
      </View>

      <View className="absolute bottom-8 flex flex-row items-center justify-between w-full px-3  ">
        <View className="flex flex-row gap-3">
          <View className="w-3 h-3 rounded-full bg-[#741D1D46]" />
          <View className="w-3 h-3 rounded-full bg-[#741D1D]" />
          <View className="w-3 h-3 rounded-full bg-[#741D1D46]" />
        </View>

        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-[#741D1D] flex items-center justify-center text-white"
          onPress={() => navigation.navigate('Welcome3')}
        >
          <Ionicons name="chevron-forward-sharp" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome2
