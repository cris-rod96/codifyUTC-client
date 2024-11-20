import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Login = () => {
  return (
    <View className="flex flex-col gap-5 relative h-full ">
      {/* Header */}
      <View className="w-full h-[150px] bg-red-400" />

      <View className="my-6">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 26, // Tamaño ligeramente más grande para destacar
          }}
        >
          ¡Iniciemos sesión!
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 15, // Tamaño ajustado para ser más legible
            color: '#7D7D7D',
          }}
        >
          Acceda a su cuenta para continuar
        </Text>

        {/* Inputs */}
        <View className="flex flex-col gap-4 my-6 relative">
          <TextInput
            placeholder="example@utc.edu.ec"
            className="bg-white border border-gray-300 px-4 py-4 rounded-lg"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 15, // Tamaño ajustado para el texto
              color: '#555555',
            }}
          />
          <TextInput
            secureTextEntry
            placeholder="****************"
            className="bg-white border border-gray-300 px-4 py-4 rounded-lg"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 15,
              color: '#555555',
            }}
          />

          {/* Forgot Password */}
          <View className="relative w-full">
            <Text
              style={{
                fontFamily: 'Mulish_800ExtraBold',
                fontSize: 14,
                color: '#741D1D', // Color destacado
              }}
              className="absolute right-0"
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity className="flex flex-row gap-2 items-center justify-center bg-[#741D1D] py-4 rounded-full relative">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 16, // Tamaño del texto aumentado para el botón
            color: '#FFFFFF',
          }}
        >
          Iniciar Sesión
        </Text>

        <View className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-white absolute right-5">
          <Ionicons name="chevron-forward-sharp" size={20} color={'#741D1D'} />
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View className="absolute bottom-7 flex flex-row gap-2 items-center justify-center w-full">
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 14, // Ajustado para que sea más consistente con el diseño general
          }}
        >
          ¿No tienes una cuenta?
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_800ExtraBold',
            fontSize: 14,
            color: '#741D1D', // Mantener consistencia de color
          }}
        >
          Regístrate
        </Text>
      </View>
    </View>
  )
}

export default Login
