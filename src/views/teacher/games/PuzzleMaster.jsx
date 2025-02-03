import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import working from 'assets/working.json'
const PuzzleMaster = () => {
  const navigation = useNavigation()
  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <View className="w-full h-[50px] px-5 flex flex-row justify-between items-center bg-[#f5f9ff] border-b border-gray-200">
        <View className="flex flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('TeacherActivities')}
          >
            <Octicons name="arrow-left" size={21} color={'#202244'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 21,
              color: '#202244',
            }}
          >
            Puzzle Master
          </Text>
        </View>
      </View>

      <View className="flex-1 flex flex-col justify-center items-center px-5">
        <LottieView
          autoPlay
          loop
          source={working}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 18,
            color: '#202244',
            marginBottom: 10,
          }}
        >
          🚧 Módulo en Desarrollo 🚧
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_400Regular',
            fontSize: 15,
            color: '#888',
            textAlign: 'center',
          }}
        >
          Estamos trabajando arduamente para brindarte una mejor experiencia.
          Este módulo estará disponible en una próxima actualización con nuevas
          funcionalidades y mejoras. ¡Gracias por tu paciencia! 😊
        </Text>
      </View>
    </View>
  )
}

export default PuzzleMaster
