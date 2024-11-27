import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import profile from '../../../assets/profile.png'
import { Ionicons } from '@expo/vector-icons'
const EditProfile = () => {
  return (
    <ScrollView>
      <View className="flex flex-col gap-10 items-center justify- h-full w-full py-10 px-5">
        {/* Image profile */}
        <View className="relative w-36 h-36 rounded-full border border-gray-200">
          <Image
            source={profile}
            className="w-full h-full object-cover absolute"
          />
          <TouchableOpacity className="absolute bottom-2 -right-1 rounded-xl bg-[#741D1D] p-2">
            <Ionicons name="image" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View className="w-full flex flex-col gap-4">
          {/* Nombres completos */}
          <TextInput
            placeholder="Cristhian Rodriguez"
            className="bg-white rounded-lg px-4 py-5 border border-gray-200"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#505050',
            }}
          />

          {/* Nickname */}
          <TextInput
            placeholder="rodris"
            className="bg-white rounded-lg px-4 py-5 border border-gray-200"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#505050',
            }}
          />
          {/* Email */}
          <TextInput
            placeholder="crisrodam1996@gmail.com"
            className="bg-white rounded-lg px-4 py-5 border border-gray-200"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#505050',
            }}
          />

          {/* DNI */}
          <TextInput
            placeholder="0940501596"
            className="bg-white rounded-lg px-4 py-5 border border-gray-200"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#505050',
            }}
          />

          {/* Phone */}
          <TextInput
            placeholder="0981135286"
            className="bg-white rounded-lg px-4 py-5 border border-gray-200"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#505050',
            }}
          />

          {/* Género */}
          <TextInput
            placeholder="Masculino"
            className="bg-white rounded-lg px-4 py-5 border border-gray-200"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#505050',
            }}
          />

          {/* Role */}
          <TextInput
            placeholder="Estudiante"
            className="bg-white rounded-lg px-4 py-5 border border-gray-200"
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#505050',
            }}
          />

          {/* Submit */}
          <TouchableOpacity className="w-full flex flex-row items-center justify-center gap-2 bg-[#741D1D] px-4 py-5 rounded-3xl relative">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: 'white',
              }}
            >
              Actualizar
            </Text>
            <View className="absolute right-5 flex items-center justify-center bg-white w-7 h-7 rounded-full">
              <Ionicons
                name="chevron-forward-sharp"
                size={20}
                color={'#741D1D'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default EditProfile
