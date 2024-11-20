import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const Welcome1 = () => {
  return (
    <View className="flex flex-col gap-3 relative h-full">
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
          Gamificación Interactiva
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            color: '#545454',
          }}
        >
          Aprende programación mientras superas retos y obtienes puntos
        </Text>
      </View>

      <View className="absolute bottom-10 flex flex-row items-center justify-between w-full">
        <View className="flex flex-row gap-3">
          <View className="w-3 h-3 rounded-full bg-[#741D1D]" />
          <View className="w-3 h-3 rounded-full bg-[#741D1D46]" />
          <View className="w-3 h-3 rounded-full bg-[#741D1D46]" />
        </View>

        <TouchableOpacity className="w-10 h-10 rounded-full bg-[#741D1D] flex items-center justify-center text-white">
          <Ionicons name="chevron-forward-sharp" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome1
