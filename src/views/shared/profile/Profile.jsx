import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import profile from 'assets/profile.png'
import { Ionicons } from '@expo/vector-icons'
import { CommonActions, useNavigation } from '@react-navigation/native'
import Loading from 'components/loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'redux/slices/user.slice'
import { storageUtil } from '../../../utils/index.utils'
const Profile = () => {
  const { user } = useSelector((state) => state.user)
  const navigation = useNavigation()

  const closeSession = () => {
    storageUtil
      .removeSecureData('session_info')
      .then((res) => {
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  return !user ? (
    <Loading message={'Espere por favor'} />
  ) : (
    <View className="flex flex-col items-center justify-center h-full w-full bg-[#F5F9FF]">
      <View
        className="w-5/6 h-[500px] relative bg-white rounded-xl border border-gray-200 shadow"
        style={{ overflow: 'visible' }}
      >
        <View className="w-32 h-32 rounded-full bg-red-400 -top-16 absolute left-[96px] border-2 border-[#741D1D]">
          <Image
            source={
              user.profile_picture ? { uri: user.profile_picture } : profile
            }
            className="w-full h-full object-contain absolute rounded-full"
          />

          <TouchableOpacity className="absolute w-10 h-10 rounded-lg bg-[#741D1D] bottom-2 -right-1 flex items-center justify-center z-10">
            <Ionicons name="image" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <View className="top-20 flex flex-col justify-center items-center">
          <View>
            <Text
              className="text-center"
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 20,
                color: '#202244',
              }}
            >
              {user?.full_name}
            </Text>

            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: '#545454',
              }}
            >
              {user?.email}
            </Text>
          </View>

          <View className="px-5 mt-10 flex gap-8">
            <TouchableOpacity
              className="flex flex-row justify-between items-center w-full"
              onPress={() => navigation.navigate('EditProfile')}
            >
              <View className="flex flex-row gap-2 items-center">
                <Ionicons name="person-outline" size={22} color={'#202244'} />
                <Text
                  style={{
                    color: '#202244',
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 15,
                  }}
                >
                  Editar perfil
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#202244'} />
            </TouchableOpacity>

            {user.role === 'Docente' && (
              <TouchableOpacity className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row gap-2 items-center">
                  <Ionicons name="trash-outline" size={22} color={'#202244'} />
                  <Text
                    style={{
                      color: '#202244',
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 15,
                    }}
                  >
                    Papelera
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={'#202244'} />
              </TouchableOpacity>
            )}

            <TouchableOpacity className="flex flex-row justify-between items-center w-full">
              <View className="flex flex-row gap-2 items-center">
                <Ionicons name="headset-outline" size={22} color={'#202244'} />
                <Text
                  style={{
                    color: '#202244',
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 15,
                  }}
                >
                  Soporte Técnico
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#202244'} />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row justify-between items-center w-full">
              <View className="flex flex-row gap-2 items-center">
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color={'#202244'}
                />
                <Text
                  style={{
                    color: '#202244',
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 15,
                  }}
                >
                  Cambiar contraseña
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#202244'} />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row justify-between items-center w-full">
              <View className="flex flex-row gap-2 items-center">
                <Ionicons
                  name="person-remove-outline"
                  size={22}
                  color={'#202244'}
                />
                <Text
                  style={{
                    color: '#202244',
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 15,
                  }}
                >
                  Eliminar cuenta
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#202244'} />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row justify-between items-center w-full"
              onPressIn={closeSession}
            >
              <View className="flex flex-row gap-2 items-center">
                <Ionicons name="exit-outline" size={22} color={'#E00E0E'} />
                <Text
                  style={{
                    color: '#E00E0E',
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 15,
                  }}
                >
                  Cerrar sesión
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#E00E0E'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Profile
