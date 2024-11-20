import { Ionicons } from '@expo/vector-icons'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const RecoveryPassword = () => {
  return (
    <View className="flex flex-col relative h-full px-2 w-full">
      <View className="w-full h-[250px] bg-red-400" />

      <View className="flex my-5 gap-3 items-center">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 14,
            color: '#545454',
            textAlign: 'center',
          }}
        >
          Seleccione qué datos de contacto debemos utilizar para restablecer su
          contraseña
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

export default RecoveryPassword
