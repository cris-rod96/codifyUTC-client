import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import profileLogo from 'assets/profile.png'
import ecuFlag from 'assets/flag_ecuador.png'
import { Feather, Ionicons, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { toastConfig } from 'config/index.config'
import Select from 'react-native-picker-select'
import { useSetup } from 'hooks/index.hooks'
import { pickerImagesUtil } from 'utils/index.utils'
import EmailSentModal from '../../../components/modal/EmailSentModal'

const Setup = ({ route, navigation }) => {
  const { addRegisterData, handleChange, user, onSubmit, contactData } =
    useSetup()
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [imageUri, setImageUri] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => setShowModal((prev) => !prev)

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    })
  }

  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) {
      setImageUri(uri)
    }
  }

  const register = async () => {
    const { ok, message, title, toast } = await onSubmit(imageUri)
    showToast(toast, title, message)

    if (ok) {
      toggleShowModal()
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
      const { email, nick_name, password, role } = route.params
      addRegisterData(email, nick_name, password, role)
    }
  }, [route])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <EmailSentModal
        isVisible={showModal}
        toggleModal={toggleShowModal}
        user={contactData}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 py-5 bg-[#F5F9FF] flex-col gap-3">
            <View className="w-[90%] mx-auto flex flex-col justify-center items-center gap-3">
              {!keyboardVisible && (
                <TouchableOpacity
                  className="relative w-32 h-32 rounded-full border border-gray-300 mb-3"
                  onPress={pickImage}
                >
                  <Image
                    source={imageUri ? { uri: imageUri } : profileLogo}
                    className="absolute w-full h-full object-cover rounded-full"
                  />
                  <View className="absolute bottom-2 right-2 rounded-full bg-[#741D1D] w-10 h-10 flex items-center justify-center">
                    <Ionicons name="camera" size={24} color="white" />
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
                    onChangeText={(text) => handleChange('full_name', text)}
                    placeholder="Nombres completos"
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

                <View className="h-[58px] rounded-lg bg-white shadow-md shadow-gray-300 flex items-center">
                  <Select
                    className="w-full h-full"
                    onValueChange={(value) => handleChange('gender', value)}
                    items={[
                      { label: '♀️ Femenino', value: 'Femenino' },
                      { label: '♂️ Masculino', value: 'Masculino' },
                      { label: '⚧️ Otro', value: 'Otro' },
                    ]}
                    placeholder={{
                      label: 'Género',
                      value: null,
                      color: '#545454',
                    }}
                    style={{
                      inputAndroid: {
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 14,
                        color: '#505050',
                      },
                      placeholder: {
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 14,
                      },
                    }}
                  />
                </View>

                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                  <View className="w-14 flex flex-row items-center justify-center h-full ">
                    <Octicons name="shield-lock" size={20} color={'#545454'} />
                  </View>
                  <TextInput
                    autoComplete="off"
                    defaultValue={user.role}
                    className="flex-1 bg-white px-1 "
                    editable={false}
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#505050',
                    }}
                  />
                </View>

                <TouchableOpacity
                  className="flex items-center justify-center h-[60px] bg-[#741D1D] rounded-full shadow-md shadow-gray-300 mt-3"
                  onPress={register}
                >
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                      color: 'white',
                    }}
                  >
                    Continuar
                  </Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={22}
                    color="white"
                    className="absolute right-4"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast config={toastConfig} position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default Setup
