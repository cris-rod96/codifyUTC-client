import { Ionicons } from '@expo/vector-icons'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const ActivationCode = () => {
  return (
    <View className="flex flex-col relative h-full px-5 w-full">
      <View className="flex flex-row my-7 items-center justify-center w-full">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 13,
            color: '#545454',
          }}
        >
          El código fue enviado a{' '}
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 13,
            color: '#741D1D',
          }}
        >
          example@utc.edu.ec
        </Text>
      </View>
      {/* Box Codes */}
      <View className="flex flex-row justify-between w-full gap-3">
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 22,
            color: '#505050',
          }}
        />
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 22,
            color: '#505050',
          }}
        />
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 22,
            color: '#505050',
          }}
        />
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className=" flex-1 h-20 rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 22,
            color: '#505050',
          }}
        />
      </View>

      <View className="flex flex-row my-7 items-center justify-center">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 14,
            color: '#545454',
          }}
        >
          Reenviando código en{' '}
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 17,
            color: '#741D1D',
          }}
        >
          59
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 12,
            color: '#545454',
          }}
        >
          s
        </Text>
      </View>

      <TouchableOpacity className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-5 rounded-full  w-full">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 15,
            color: '#FFFFFF',
          }}
        >
          Continuar
        </Text>

        <View className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-white absolute right-5">
          <Ionicons name="chevron-forward-sharp" size={20} color={'#741D1D'} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ActivationCode
