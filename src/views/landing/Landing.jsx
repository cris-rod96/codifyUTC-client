import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import gmailLogo from '../../../assets/gmail.png'
import { useEffect } from 'react'
import { storageUtil } from '../../utils/index.utils'
const Landing = () => {
  return (
    <View className="flex flex-col gap-3 relative h-full">
      <View className="w-full h-[400] bg-red-400"></View>
      <TouchableOpacity className="flex flex-row gap-2 items-center justify-center my-5">
        <View className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-gray-400">
          <Image source={gmailLogo} className="absolute w-5 h-5 object-cover" />
        </View>

        <Text
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 15,
            color: '#545454',
          }}
        >
          Continuar con Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-4 rounded-full">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 15,
            color: '#FFFFFF',
          }}
        >
          Ingresar con mis credenciales
        </Text>

        <View className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-white">
          <Ionicons name="chevron-forward-sharp" size={20} color={'#741D1D'} />
        </View>
      </TouchableOpacity>

      <View className="absolute bottom-7 flex flex-row gap-2 items-center justify-center w-full">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 13,
          }}
        >
          ¿Aún no estas registrado?
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 13,
            color: '#741D1D',
            textDecorationLine: 'underline',
          }}
        >
          Registrarme
        </Text>
      </View>
    </View>
  )
}

export default Landing
