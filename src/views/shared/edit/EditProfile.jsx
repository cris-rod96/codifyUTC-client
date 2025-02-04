import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { pickerImagesUtil, storageUtil } from 'utils/index.utils'
import { usersAPI } from 'api/index.api'

import profile from 'assets/profile.png'
import { saveUser } from '../../../redux/slices/user.slice'
import CustomToast from 'components/toast/Toast'

const EditProfile = () => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)
  const { user } = useSelector((state) => state.user)
  const [imageUri, setImageUri] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) {
      setImageUri(uri)
    }
  }

  const handleChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    const formData = new FormData()
    const { profile_picture, ...info } = data

    Object.keys(info).forEach((key) => {
      formData.append(key, info[key])
    })

    formData.append('profile_picture', {
      uri: profile_picture,
      name: `profile_picture_${user.nick_name.replace(/\s/g, '')}.jpg`,
      type: 'image/jpeg',
    })

    setLoading(true)
    usersAPI
      .updateInfo(user.id, formData)
      .then((res) => {
        setToast(true)
        setTypeToast('success')
        setTitleToast('Información actualizada')
        setMessageToast('Se actualizó la información del usuario')
        const { data: userData } = res.data
        dispatch(saveUser(userData))
      })
      .catch((err) => {
        setToast(true)
        setTypeToast('error')
        setTitleToast('Error al actualizar')
        setMessageToast('No se actualizó la información del usuario')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (imageUri) {
      setData((prev) => ({
        ...prev,
        profile_picture: imageUri,
      }))
    }
  }, [imageUri])

  useEffect(() => {
    if (user) {
      setData({
        full_name: user.full_name,
        phone: user.phone,
        profile_picture: user.profile_picture,
      })
    }
  }, [])
  return (
    <ScrollView
      className="flex-1 w-full bg-[#F5F9FF]"
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 bg-[#F5F9FF] flex flex-col py-5 px-5 items-center ">
        {/* Imagen */}
        <TouchableOpacity
          className="w-32 h-32 rounded-full bg-red-400  border-2 border-[#741D1D] relative mb-4"
          onPress={pickImage}
        >
          <Image
            source={
              data?.profile_picture ? { uri: data.profile_picture } : profile
            }
            className="w-full h-full object-contain absolute rounded-full"
            resizeMode="cover"
          />

          <View className="absolute bottom-2 right-2 rounded-full bg-[#741D1D] w-10 h-10 flex items-center justify-center">
            <Ionicons name="camera" size={24} color={'white'} />
          </View>
        </TouchableOpacity>

        {/* Formulario */}
        <View className="flex flex-col w-full gap-3 mb-5">
          <TextInput
            className="w-full bg-white border border-gray-200 rounded-lg h-[50px] px-5"
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 15,
              color: '#888',
            }}
            defaultValue={data?.full_name}
            onChangeText={(value) => handleChange('full_name', value)}
          />
          <View className="flex flex-col gap-2">
            <TextInput
              className="w-full bg-white border border-gray-200 rounded-lg h-[50px] px-5"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 15,
                color: '#888',
              }}
              defaultValue={user.email}
              editable={false}
            />
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#741D1D',
              }}
              className="px-3"
            >
              * Este campo no puede actualizarse
            </Text>
          </View>
          <TextInput
            className="w-full bg-white border border-gray-200 rounded-lg h-[50px] px-5"
            style={{
              fontFamily: 'Mulish_600SemiBold',
              fontSize: 15,
              color: '#888',
            }}
            defaultValue={data?.phone}
            onChangeText={(value) => handleChange('phone', value)}
          />
          <View className="flex flex-col gap-2">
            <TextInput
              className="w-full bg-white border border-gray-200 rounded-lg h-[50px] px-5"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 15,
                color: '#888',
              }}
              defaultValue={user.dni}
              editable={false}
            />
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#741D1D',
              }}
              className="px-3"
            >
              * Este campo no puede actualizarse
            </Text>
          </View>
          <View className="flex flex-col gap-2">
            <TextInput
              className="w-full bg-white border border-gray-200 rounded-lg h-[50px] px-5"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 15,
                color: '#888',
              }}
              defaultValue={user.gender}
              editable={false}
            />
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#741D1D',
              }}
              className="px-3"
            >
              * Este campo no puede actualizarse
            </Text>
          </View>

          <View className="flex flex-col gap-2">
            <TextInput
              className="w-full bg-white border border-gray-200 rounded-lg h-[50px] px-5"
              style={{
                fontFamily: 'Mulish_600SemiBold',
                fontSize: 15,
                color: '#888',
              }}
              defaultValue={user.role}
              editable={false}
            />
            <Text
              style={{
                fontFamily: 'Mulish_700Bold',
                fontSize: 12,
                color: '#741D1D',
              }}
              className="px-3"
            >
              * Este campo no puede actualizarse
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-full py-4 rounded-full  flex flex-row gap-2 items-center justify-center"
          style={{
            backgroundColor: loading ? '#888' : '#741D1D',
          }}
          disabled={loading}
          onPress={handleSubmit}
        >
          {loading ? (
            <>
              <ActivityIndicator size={'small'} color={'white'} />
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 16,
                  color: 'white',
                }}
              >
                Actualizando
              </Text>
            </>
          ) : (
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: 'white',
              }}
            >
              Actualizar
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {toast && (
        <CustomToast
          setToast={setToast}
          type={typeToast}
          title={titleToast}
          message={messageToast}
        />
      )}
    </ScrollView>
  )
}

export default EditProfile
