import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const Register = () => {
  return (
    <View className="flex flex-col gap-3 relative h-full">
      <View className="w-full h-[150] bg-red-400" />

      <View className="my-5">
        <Text style={{ fontFamily: 'Jost_600SemiBold', fontSize: 24 }}>
          ¡Comencemos!
        </Text>
        <Text style={{ fontFamily: 'Mulish_700Bold', fontSize: 14 }}>
          Necesitas crear una cuenta para continuar
        </Text>

        <View className="flex flex-col gap-3 my-5">
          <TextInput
            placeholder="example@utc.edu.ec"
            className="bg-[#FFFFFF] border border-[#E0E0E0] px-3 py-5 rounded-lg"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#BBB9B9',
            }}
          />
          <TextInput
            secureTextEntry
            placeholder="****************"
            className="bg-[#FFFFFF] border border-[#E0E0E0] px-3 py-5 rounded-lg"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#BBB9B9',
            }}
          />

          <TouchableOpacity className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-4 rounded-full relative">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 15,
                color: '#FFFFFF',
              }}
            >
              Registrarme
            </Text>

            <View className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-white absolute right-5">
              <Ionicons
                name="chevron-forward-sharp"
                size={20}
                color={'#741D1D'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute bottom-7 flex flex-row gap-2 items-center justify-center w-full">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 13,
          }}
        >
          Ya tengo una cuenta.
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 13,
            color: '#741D1D',
          }}
        >
          Iniciar sesión
        </Text>
      </View>
    </View>
  )
}

export default Register
