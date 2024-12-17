import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Modal,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import Select from 'react-native-picker-select'
import { pickerImagesUtil } from 'utils/index.utils'

const ClassModal = ({ isVisible, toggleModal }) => {
  const [imageUri, setImageUri] = useState(null)

  const pickImage = async () => {
    const uri = await pickerImagesUtil.pickImageFromGalllery()
    if (uri) setImageUri(uri)
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <ScrollView className="pb-20">
        <View className="flex  bg-[#F5F9FF]  px-5 py-5 h-screen">
          {/* Header */}
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPressIn={toggleModal}>
              <Ionicons name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 21,
              }}
            >
              Agregar clase
            </Text>
          </View>

          <View className="mt-10 flex flex-col gap-3">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 16,
                color: '#202244',
              }}
            >
              Añade una imagen de portada
            </Text>
            <TouchableOpacity
              className="w-full h-[180px] bg-[#FFFEFE] flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-xl relative overflow-hidden"
              onPress={pickImage}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  className="w-full h-full absolute object-cover"
                />
              ) : (
                <>
                  <Ionicons name="cloud-upload" size={40} color={'#741D1D'} />
                  <Text
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 14,
                      color: '#545454',
                    }}
                  >
                    Presiona aquí para subir
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Formulario */}
            <View className="flex flex-col gap-3">
              <View className="mt-5 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm flex justify-center items-center">
                <Select
                  onValueChange={(value) => {}}
                  items={[
                    { label: 'Desarrollo Web', value: 'Desarrollo Web' },
                    { label: 'Desarrollo Movil', value: 'Desarrollo Movil' },
                    {
                      label: 'Desarrollo de Software',
                      value: 'Desarrollo de Software',
                    },
                    {
                      label: 'Desarrollo de Aplicaciones',
                      value: 'Desarrollo de Aplicaciones',
                    },
                    {
                      label: 'Desarrollo de Videojuegos',
                      value: 'Desarrollo de Videojuegos',
                    },
                  ]}
                  placeholder={{
                    label: 'Selecciona el curso',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  style={{
                    inputIOS: {
                      fontSize: 14,
                      fontFamily: 'Mulish_700Bold',
                      color: '#202244',
                    },
                    inputAndroid: {
                      fontSize: 14,
                      fontFamily: 'Mulish_700Bold',
                      color: '#000',
                    },
                    placeholder: {
                      fontSize: 12,
                      fontFamily: 'Mulish_700Bold',
                    },
                  }}
                />
              </View>

              <TextInput
                placeholder="Tema principal"
                className="px-4 h-[58px] rounded-lg bg-white border border-gray-300 shadow-sm"
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                }}
              />

              <View className="flex flex-col gap-3">
                <View className="flex flex-row justify-between">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 18,
                      color: '#202244',
                    }}
                  >
                    Contenido
                  </Text>
                  <TouchableOpacity className="flex flex-row gap-1 items-center">
                    <Text
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 14,
                        color: '#741D1D',
                      }}
                    >
                      Añadir Tema
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="w-full h-auto px-10 py-5 bg-[#FFFEFE] rounded-lg border border-gray-200">
                  <View className="flex items-center justify-center w-full h-auto p-5 bg-[#FFFEFE] rounded-lg border border-gray-200">
                    <Text
                      style={{
                        fontFamily: 'Mulish_400Regular',
                        fontSize: 14,
                        color: '#999595',
                      }}
                    >
                      Aún no hay temas añadidos. Usa el botón "Añadir Tema" para
                      empezar.
                    </Text>
                  </View>
                  {/* Cuando haya contenido */}
                  {/* <View className="flex flex-row justify-between items-center">
                      <Text
                        style={{
                          fontFamily: 'Mulish_800ExtraBold',
                          fontSize: 12,
                          color: '#999595',
                        }}
                      >
                        ¿Qué es una variable?
                      </Text>
                      <View className="flex flex-row gap-2 items-center">
                        <TouchableOpacity className="flex items-center justify-center">
                          <Ionicons name="reader" color={'#1BA81B'} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Ionicons
                            name="trash-sharp"
                            size={18}
                            color={'#741D1D'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View> */}
                </View>
              </View>

              <TouchableOpacity className="flex flex-row items-center justify-center bg-[#741D1D] py-4 mt-5 gap-2 relative rounded-full">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: '#FFFFFF',
                  }}
                >
                  Guardar
                </Text>
                <Ionicons
                  name="chevron-forward-circle-sharp"
                  className="absolute right-3"
                  size={24}
                  color={'#FFFFFF'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default ClassModal
