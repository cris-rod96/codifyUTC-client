import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import profileLogo from '../../../assets/profile.png'
import { Ionicons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'

const Setup = () => {
  return (
    <View className="flex flex-col relative h-full">
      {/* Foto de perfil */}
      <View className="relative w-[100px] h-[100px] rounded-full bg-red-300 mx-auto border-2 border-gray-300">
        <Image
          source={profileLogo}
          className="absolute w-full h-full object-cover"
        />
        <View className="w-8 h-8 rounded-full bg-[#741D1D] flex items-center justify-center absolute bottom-1 right-1 border-2 border-gray-300">
          <Ionicons name="camera-sharp" color={'white'} size={14} />
        </View>
      </View>

      {/* Formulario */}
      <View className="mt-10 flex flex-col gap-3 relative">
        {/* Inputs */}
        <TextInput
          placeholder="Nombre completo"
          className="px-3 h-[68px] rounded-lg bg-white border border-gray-300"
          style={{ fontFamily: 'Mulish_700Bold', fontSize: 14 }}
          name="full_name"
        />
        <TextInput
          placeholder="Nickname"
          className="px-3 h-[68px] rounded-lg bg-white border border-gray-300"
          style={{ fontFamily: 'Mulish_700Bold', fontSize: 14 }}
          name="nick_name"
        />
        <TextInput
          placeholder="Cédula"
          className="px-3 h-[68px] rounded-lg bg-white border border-gray-300"
          style={{ fontFamily: 'Mulish_700Bold', fontSize: 14 }}
          name="dni"
        />

        <TextInput
          placeholder="Teléfono"
          className="px-3 h-[68px] rounded-lg bg-white border border-gray-300"
          style={{ fontFamily: 'Mulish_700Bold', fontSize: 14 }}
          name="phone"
        />

        {/* Select */}
        <View className="h-[68px] rounded-lg bg-white border border-gray-300 flex justify-center items-center">
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              { label: 'Femenino', value: 'femenino' },
              { label: 'Masculino', value: 'masculino' },
              { label: 'Prefieron no decirlo', value: 'otro' },
            ]}
            placeholder={{
              label: 'Selecciona tu género',
              value: null,
              color: '#9EA0A4',
            }}
            style={{
              inputIOS: {
                fontSize: 14,
                fontFamily: 'Mulish_700Bold',
                color: '#000',
              },
              inputAndroid: {
                fontSize: 14,
                fontFamily: 'Mulish_700Bold',
                color: '#000',
              },

              placeholder: {
                fontSize: 12,
                fontFamily: 'Mulish_700Bold',
              },
            }}
          />
        </View>
      </View>
      <TouchableOpacity className="flex flex-row gap-2 items-center justify-center my-5 bg-[#741D1D] py-5 rounded-full absolute bottom-2 w-full">
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

export default Setup
