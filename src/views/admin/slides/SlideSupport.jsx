import { Octicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

const SlideSupport = () => {
  return (
    <View className="flex flex-col gap-3 w-full">
      <View className="flex flex-row items-center w-full justify-between ">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: '#202244',
          }}
        >
          Soporte
        </Text>

        <TouchableOpacity
          className="w-fit flex flex-row items-center gap-2"
          // onPress={viewAllCourses}
        >
          <Text
            style={{
              fontFamily: 'Mulish_800ExtraBold',
              fontSize: 12,
              color: '#0961F5',
              textAlign: 'center',
            }}
          >
            Ver todo
          </Text>
          <Octicons name="chevron-right" size={16} color="#0961F5" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SlideSupport
