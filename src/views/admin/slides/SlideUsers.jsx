import { Octicons } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import profile from 'assets/profile.png'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const SlideUsers = () => {
  const [filterUsers, setFilterUsers] = useState([])
  const { users } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.user)
  const navigation = useNavigation()

  const viewAllUsers = () => {
    navigation.navigate('Users')
  }
  // const users = [
  //   {
  //     id: 1,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: true,
  //     profile_picture: null,
  //   },
  //   {
  //     id: 2,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: false,
  //     profile_picture: null,
  //   },
  //   {
  //     id: 3,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: true,
  //     profile_picture: null,
  //   },
  //   {
  //     id: 4,
  //     full_name: 'Cristhian Rodríguez',
  //     isActive: false,
  //     profile_picture: null,
  //   },
  // ]

  const renderUser = ({ item }) => {
    return (
      <View className="flex flex-col w-[200px] h-auto bg-white mr-4 items-center py-5 rounded-xl border border-gray-200 gap-1 px-3">
        {/* Profile */}
        <View className="w-[100px] h-[100px] rounded-full relative overflow-hidden border border-gray-200">
          <Image
            source={
              item?.profile_picture ? { uri: item.profile_picture } : profile
            }
            className="absolute w-full h-full object-cover"
            resizeMode="cover"
          />
        </View>

        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 15,
            color: '#202244',
          }}
        >
          {item.full_name}
        </Text>

        {item.isActive ? (
          <View className="flex flex-row items-center justify-center py-2 bg-green-800  gap-2 rounded-full px-3">
            <Octicons name="check-circle-fill" size={12} color={'white'} />
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: 'white',
              }}
            >
              Verificado
            </Text>
          </View>
        ) : (
          <View className="flex flex-row items-center justify-center py-2 bg-red-800 gap-2 rounded-full px-3">
            <Octicons name="check-circle-fill" size={12} color={'white'} />
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 10,
                color: 'white',
              }}
            >
              No verificado
            </Text>
          </View>
        )}
      </View>
    )
  }

  useEffect(() => {
    const usersFilters = users.filter((usr) => usr.id !== user.id)
    setFilterUsers(usersFilters)
  }, [users])
  return (
    <View className="flex flex-col gap-3 w-full">
      <View className="flex flex-row items-center w-full justify-between ">
        <Text
          style={{
            fontFamily: 'Jost_600SemiBold',
            fontSize: 18,
            color: '#202244',
          }}
        >
          Nuevos usuarios
        </Text>

        {filterUsers.length > 0 && (
          <TouchableOpacity
            className="w-fit flex flex-row items-center gap-2"
            onPress={viewAllUsers}
          >
            <Text
              style={{
                fontFamily: 'Mulish_800ExtraBold',
                fontSize: 12,
                color: '#0961F5',
                textAlign: 'center',
              }}
            >
              Ver todos
            </Text>
            <Octicons name="chevron-right" size={16} color="#0961F5" />
          </TouchableOpacity>
        )}
      </View>
      {filterUsers && filterUsers.length > 0 ? (
        <FlatList
          data={filterUsers}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          initialNumToRender={1}
          windowSize={3}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: 254,
            offset: 254 * index,
          })}
          renderItem={renderUser}
        />
      ) : (
        <View className="w-full bg-white px-3 py-5 border border-dashed border-gray-300 flex flex-col items-center justify-center rounded-xl">
          <Text
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 13,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            No hay usuarios registrados
          </Text>
        </View>
      )}
    </View>
  )
}

export default SlideUsers
