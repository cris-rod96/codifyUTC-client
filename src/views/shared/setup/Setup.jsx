import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import profileDefault from 'assets/profile.png'
import { pickerImagesUtil } from 'utils/index.utils'
import { useSetup } from 'hooks/index.hooks'
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons'
import { EmailSentModal, GenderModal } from 'components/modal/index.modals'
import { useNavigation } from '@react-navigation/native'
import CustomToast from 'components/toast/Toast'

const Setup = ({ route }) => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)

  const navigation = useNavigation()
  const [contactData, setContacData] = useState({
    email: '',
    full_name: '',
  })
  const { addRegisterData, handleChange, user, onSubmit } = useSetup()

  const [keyboardVisibe, setKeyboardVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUri, setImageUri] = useState(null)

  const [showGenderModal, setShowGenderModal] = useState(false)
  const toggleShowGenderModal = () => setShowGenderModal((prev) => !prev)

  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) {
      setImageUri(uri)
    }
  }

  const onChange = (key, value) => {
    setContacData((prev) => ({
      ...prev,
      [key]: value,
    }))

    handleChange(key, value)
  }

  const register = async () => {
    const { ok, message, title, toast } = await onSubmit(imageUri, setLoading)
    if (ok) {
      setToast(true)
      setTypeToast(toast)
      setTitleToast(title)
      setMessageToast(message)
      setImageUri(null)

      setTimeout(() => {
        navigation.navigate('ActivationCode', {
          email: contactData.email,
          full_name: contactData.full_name,
        })
      }, 2500)
    } else {
      setToast(true)
      setTypeToast(toast)
      setTitleToast(title)
      setMessageToast(message)
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  useEffect(() => {
    if (route.params) {
      const { email, nick_name, password } = route.params
      onChange('email', email)
      addRegisterData(email, nick_name, password)
    }
  }, [route.params])

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <GenderModal
        visible={showGenderModal}
        onClose={toggleShowGenderModal}
        handleChange={handleChange}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 py-5 bg-[#F5F9FF] flex-col gap-3">
          <View className="w-[90%] mx-auto flex flex-col justify-center items-center gap-3">
            {!keyboardVisibe && (
              <TouchableOpacity
                className="relative w-32 h-32 rounded-full border border-gray-300 mb-3"
                onPress={pickImage}
              >
                <Image
                  source={imageUri ? { uri: imageUri } : profileDefault}
                  className="absolute w-full h-full object-cover rounded-full"
                  resizeMode="cover"
                />
                <View className="absolute bottom-2 right-2 rounded-full bg-[#741D1D] w-10 h-10 flex items-center justify-center">
                  <Ionicons name="camera" size={24} color={'white'} />
                </View>
              </TouchableOpacity>
            )}

            {/* Formulario */}
            <View className="flex w-full gap-3">
              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                <View className="w-14 flex flex-row items-center justify-center h-full ">
                  <Octicons name="person" size={20} color={'#545454'} />
                </View>
                <TextInput
                  defaultValue={user.full_name}
                  autoCapitalize="none"
                  autoComplete="off"
                  onChangeText={(text) => onChange('full_name', text)}
                  placeholder="Nombre y Apellido"
                  className="flex-1 bg-white  px-1 "
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#505050',
                  }}
                />
              </View>

              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                <View className="w-14 flex flex-row items-center justify-center h-full ">
                  <Feather name="smartphone" size={20} color={'#545454'} />
                </View>
                <TextInput
                  autoComplete="off"
                  placeholder="Teléfono"
                  defaultValue={user.phone}
                  autoCapitalize="none"
                  keyboardType="phone-pad"
                  onChangeText={(text) => handleChange('phone', text)}
                  className="flex-1 bg-white px-1 "
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#505050',
                  }}
                />
              </View>

              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                <View className="w-14 flex flex-row items-center justify-center h-full ">
                  <Octicons name="id-badge" size={20} color={'#545454'} />
                </View>
                <TextInput
                  autoComplete="off"
                  defaultValue={user.dni}
                  autoCapitalize="none"
                  onChangeText={(text) => handleChange('dni', text)}
                  keyboardType="numeric"
                  placeholder="Cédula"
                  className="flex-1 bg-white  px-1 "
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#505050',
                  }}
                />
              </View>

              <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative">
                <View className="w-14 flex flex-row items-center justify-center h-full ">
                  <MaterialCommunityIcons
                    name="gender-male-female"
                    size={20}
                    color={'#545454'}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 14,
                    color: '#505050',
                  }}
                >
                  {user?.gender || 'Género'}
                </Text>

                <TouchableOpacity
                  className="absolute right-5"
                  onPress={toggleShowGenderModal}
                >
                  <Octicons name="chevron-down" size={18} color={'#202244'} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className={`"flex flex-row items-center gap-2 justify-center h-[60px] ${
                  loading ? 'bg-gray-400' : 'bg-[#741D1D]'
                } rounded-full shadow-md shadow-gray-300 mt-3"`}
                onPress={register}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ActivityIndicator size={'small'} color={'white'} />
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 18,
                        color: 'white',
                      }}
                    >
                      Registrando
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        fontFamily: 'Jost_600SemiBold',
                        fontSize: 18,
                        color: 'white',
                      }}
                    >
                      Continuar
                    </Text>
                    <Octicons
                      name="chevron-right"
                      size={21}
                      color="white"
                      className="absolute right-5"
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {toast && (
        <CustomToast
          setToast={setToast}
          type={typeToast}
          title={titleToast}
          message={messageToast}
        />
      )}
    </View>
  )
}

export default Setup
