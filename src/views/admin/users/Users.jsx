import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import emptyData from 'assets/no-data.json'
import profile from 'assets/profile.png'
import { adminApi } from 'api/index.api'

import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { RoleModal } from 'components/modal/index.modals'
import { useDispatch, useSelector } from 'react-redux'
import { storageUtil } from '../../../utils/index.utils'
import { saveUsers } from '../../../redux/slices/admin.slice'

const Users = () => {
  const { users } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [indexStatusSelected, setIndexStatusSelected] = useState(0)
  const [indexRolSelected, setIndexRolSelected] = useState(0)
  const [userId, setUserId] = useState(null)
  const filtersRoles = [
    'Todos',
    'Administrador',
    'Docente',
    'Estudiante',
    'Sin rol',
  ]
  const filterStatus = ['Todos', 'Verificado', 'Sin verificar']
  const toggleShowRoleModal = () => setShowRoleModal((prev) => !prev)
  const handleRoleModal = (user_id) => {
    setUserId(user_id)
    toggleShowRoleModal()
  }
  // const users = [
  //   {
  //     id: 1,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: true,
  //     profile_picture: null,
  //     email: 'crisrodam1996@gmail.com',
  //     role: 'Docente',
  //   },
  //   {
  //     id: 2,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: false,
  //     profile_picture: null,
  //     email: 'crisrodam1996@gmail.com',
  //     role: null,
  //   },
  //   {
  //     id: 3,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: true,
  //     profile_picture: null,
  //     email: 'crisrodam1996@gmail.com',
  //     role: null,
  //   },
  //   {
  //     id: 4,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: false,
  //     profile_picture: null,
  //     email: 'crisrodam1996@gmail.com',
  //     role: null,
  //   },
  // ]

  const [filterUsers, setFilterUsers] = useState([])

  const filterByStatus = (index) => {
    setIndexStatusSelected(index)
  }

  const filterByRole = (index) => {
    setIndexRolSelected(index)
  }

  const applyFilters = () => {
    let filtered = [...users]

    if (indexStatusSelected !== 0) {
      filtered = filtered.filter((user) =>
        indexStatusSelected === 1 ? user.isActive : !user.isActive
      )
    }

    if (indexRolSelected !== 0) {
      filtered = filtered.filter(
        (user) => user.role === filtersRoles[indexRolSelected]
      )
    }

    setFilterUsers(filtered)
  }

  const fetchUsers = () => {
    storageUtil.getSecureData('session_info').then((res) => {
      const { user, token } = JSON.parse(res)
      adminApi.getUsers(token).then((res) => {
        const { users } = res.data
        dispatch(saveUsers(users))
      })
    })
  }

  const onRefresh = () => {
    setShowRoleModal(false)
    setIndexRolSelected(0)
    setIndexStatusSelected(0)
    setFilterUsers(users)
    fetchUsers()
  }

  useEffect(() => {
    applyFilters()
  }, [indexRolSelected, indexStatusSelected, users])

  useEffect(() => {
    applyFilters()
  }, [])
  return (
    <View className="flex flex-col h-full w-full bg-[#F5F9FF] relative">
      <TouchableOpacity
        className="absolute bottom-4 right-2 w-12 h-12 bg-[#741D1D] rounded-full flex items-center justify-center z-50 border border-gray-200 shadow-lg shadow-gray-300"
        onPress={onRefresh}
      >
        <Octicons name="sync" size={20} color={'white'} />
      </TouchableOpacity>
      {filterUsers && filterUsers.length > 0 ? (
        <View className="flex-1 flex flex-col gap-1 px-3 py-5">
          <RoleModal
            visible={showRoleModal}
            onClose={toggleShowRoleModal}
            userId={userId}
            onRefresh={onRefresh}
          />
          <View className="flex flex-row items-center bg-white border border-gray-200 shadow-lg shadow-gray-300 h-[45px]">
            <View className="w-12 h-full flex items-center justify-center">
              <Octicons name="search" size={20} color={'#202244'} />
            </View>
            <TextInput
              placeholder="Buscar usuario"
              className="bg-transparent flex-1"
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 13,
                color: '#B4BDC4',
              }}
            />
          </View>

          <View className="mt-2 flex flex-col">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 14,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Filtrar por estado
            </Text>

            <FlatList
              data={filterStatus}
              horizontal
              showsVerticalScrollIndicator={false}
              pagingEnabled
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="px-5 py-1 rounded-full mr-3"
                  style={{
                    backgroundColor:
                      indexStatusSelected === index ? '#741D1D' : '#ccc',
                  }}
                  onPress={() => filterByStatus(index)}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 12,
                      color: indexStatusSelected === index ? '#fff' : '#202244',
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View className="mt-2 flex flex-col">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 14,
                color: '#202244',
                marginBottom: 10,
              }}
            >
              Filtrar por rol
            </Text>

            <FlatList
              data={filtersRoles}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="px-5 py-1 rounded-full mr-3"
                  style={{
                    backgroundColor:
                      indexRolSelected === index ? '#741D1D' : '#ccc',
                  }}
                  onPress={() => filterByRole(index)}
                >
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 12,
                      color: indexRolSelected === index ? '#fff' : '#202244',
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <ScrollView
            className="flex-1 mt-2"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: '#F5F9FF',
            }}
          >
            <View className="flex flex-col w-full">
              {filterUsers.map((usr, index) => (
                <View
                  key={index}
                  className="p-5 flex flex-col items-center justify-center  border border-gray-200 bg-white mb-5 rounded-lg relative"
                >
                  <View className="absolute top-3 right-5 px-3 py-1 rounded-full bg-[#440b0b]">
                    <Text
                      style={{
                        fontFamily: 'Mulish_600SemiBold',
                        fontSize: 10,
                        color: 'white',
                      }}
                    >
                      {usr?.role ? usr.role : 'Sin rol'}
                    </Text>
                  </View>
                  <View className="w-[100px] h-[100px] rounded-full bg-red-400 relative">
                    <Image
                      source={
                        usr.profile_picture
                          ? { uri: usr.profile_picture }
                          : profile
                      }
                      className="w-full h-full absolute object-cover"
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    className="mt-2"
                    style={{
                      fontFamily: 'Jost_700Bold',
                      fontSize: 16,
                      color: '#202244',
                    }}
                  >
                    {usr.full_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Mulish_600SemiBold',
                      fontSize: 12,
                      color: '#202244',
                    }}
                  >
                    {usr.email}
                  </Text>
                  {!usr?.isActive && (
                    <Text
                      className="py-2"
                      style={{
                        fontFamily: 'Mulish_400Regular',
                        fontSize: 12,
                        color: '#741D1D',
                        textAlign: 'center',
                      }}
                    >
                      * Usuario no verificado. No se puede cambiar o asignar un
                      rol.
                    </Text>
                  )}
                  <View className="flex flex-row items-center justify-between gap-2 mt-2">
                    {usr.id !== user.id && (
                      <TouchableOpacity
                        className="flex-1 flex flex-col justify-center items-center  py-2 rounded-xl"
                        disabled={!usr.isActive}
                        style={{
                          backgroundColor: usr.isActive ? '#000' : '#3D3D3D',
                        }}
                        onPress={() => handleRoleModal(usr.id)}
                      >
                        <Text
                          style={{
                            fontFamily: 'Jost_600SemiBold',
                            fontSize: 14,
                            color: 'white',
                          }}
                        >
                          Asignar rol
                        </Text>
                      </TouchableOpacity>
                    )}
                    {usr.id !== user.id && (
                      <TouchableOpacity className="flex-1 flex flex-col justify-center items-center bg-[#741D1D] py-2 rounded-xl">
                        <Text
                          style={{
                            fontFamily: 'Jost_600SemiBold',
                            fontSize: 14,
                            color: 'white',
                          }}
                        >
                          Eliminar
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center px-5">
          <LottieView
            autoPlay
            loop
            source={emptyData}
            style={{ width: 200, height: 200 }}
          />
          <Text
            style={{
              fontFamily: 'Jost_700Bold',
              fontSize: 18,
              color: '#202244',
              marginTop: 20,
            }}
          >
            Aún no hay usuarios
          </Text>
          <Text
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 14,
              color: '#545454',
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            Para actualizar la vista, haz click en el botón
          </Text>
        </View>
      )}
    </View>
  )
}

export default Users
