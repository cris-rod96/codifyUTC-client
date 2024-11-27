import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const Welcome3 = () => {
  const navigation = useNavigation()
  return (
    <View className="flex flex-col gap-3 relative h-full px-5 py-10">
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
          Evaluaciones Divertidas
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 14,
            color: '#545454',
          }}
        >
          Responde preguntas rápidas y actividades interactivas para poner a
          prueba tu conocimiento
        </Text>
      </View>

      <View className="absolute bottom-10 flex flex-row items-center justify-between w-full left-5">
        <View className="flex flex-row gap-3">
          <View className="w-3 h-3 rounded-full bg-[#741D1D46]" />
          <View className="w-3 h-3 rounded-full bg-[#741D1D46]" />
          <View className="w-3 h-3 rounded-full bg-[#741D1D]" />
        </View>

        <TouchableOpacity
          className="w-40 h-10 rounded-full bg-[#741D1D] flex flex-row items-center justify-center text-white relative"
          onPress={() => navigation.navigate('Login')}
        >
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              color: 'white',
            }}
          >
            Empezar
          </Text>
          <Ionicons
            name="chevron-forward-sharp"
            size={22}
            color={'white'}
            className="absolute right-3"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome3
