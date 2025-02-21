import { Text, TouchableOpacity, View } from 'react-native'
import { storageUtil } from '../../../utils/index.utils'
import { useNavigation } from '@react-navigation/native'

const Settings = () => {
  const navigation = useNavigation()
  const closeSession = async () => {
    try {
      await storageUtil.removeSecureData('session_info')
      navigation.navigate('Login')
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <View className="flex-1 flex flex-col justify-center items-center px-10">
      <TouchableOpacity
        className="w-full py-4 bg-[#741D1D] rounded-xl border border-[#741D1D] flex flex-row items-center justify-center"
        onPress={closeSession}
      >
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 16,
            color: 'white',
          }}
        >
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings
