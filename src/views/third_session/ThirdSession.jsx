import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import GoogleIcon from '../../icons/google.png'
import GithubIcon from '../../icons/github.png'
import { Ionicons } from '@expo/vector-icons'

import * as Google from 'expo-auth-session/providers/google'
import { useState } from 'react'

const ThirdSession = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '579934817936-9v4k71010sa8c4qda8hroqeb5fsv1me4.apps.googleusercontent.com',
  })

  return (
    <SafeAreaView className="flex-1 bg-[#F5F9FF]">
      <StatusBar backgroundColor={'#F5F9FF'} barStyle={'dark-content'} />
      <View className="flex flex-col gap-10">
        <View className="w-[90%] mx-auto my-10 h-[250px]  flex justify-center items-center bg-[#F5F9FF]"></View>

        <View className="w-[75%] mx-auto flex justify-center">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 24,
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Bienvenido a Codify
          </Text>

          <View className="flex flex-col gap-5 items-center mt-10">
            <TouchableOpacity
              className="flex flex-row items-center gap-2"
              onPress={() => promptAsync()}
            >
              <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md shadow-gray-500">
                <Image source={GoogleIcon} className="w-6 h-6" />
              </View>

              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 15,
                }}
              >
                Continuar con Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row items-center gap-2">
              <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md shadow-gray-500">
                <Image source={GithubIcon} className="w-6 h-6" />
              </View>

              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 15,
                }}
              >
                Continuar con Github
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-10 flex flex-col gap-3">
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 14,
                textAlign: 'center',
                color: '#000000',
              }}
            >
              O inicia sesión con tus credenciales
            </Text>

            <TouchableOpacity className="relative w-full h-16 rounded-full bg-[#741D1D] flex items-center justify-center">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#FFFFFF',
                }}
              >
                Continuar
              </Text>
              <Ionicons
                name="chevron-forward"
                size={25}
                color="#FFFFFF"
                className="absolute right-5"
              />
            </TouchableOpacity>

            <View className="flex flex-row gap-2 justify-center mt-3">
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#545454',
                }}
              >
                ¿No tienes una cuenta?
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Mulish_800ExtraBold',
                    fontSize: 14,
                    color: '#741D1D',
                    textDecorationLine: 'underline',
                  }}
                >
                  Registrate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ThirdSession
