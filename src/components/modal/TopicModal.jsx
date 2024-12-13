import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  Switch,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast/toast.config'
import { topicsAPI } from '../../api/topic/topic.api'
import LoadingRegisterTopics from './LoadingRegisterTopcis'

const TopicModal = ({ showTopicModal, toggleTopicModal, ClassId }) => {
  const initialState = {
    title: '',
    content: '',
  }
  const [isMounted, setIsMounted] = useState(false)

  // Estados para los mensajes al registrar el contenido
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  // Método para cerrar el loading
  const toggleModalResults = () => setIsLoading((prev) => !prev)

  const [topic, setTopic] = useState(initialState)
  const [arrContent, setArrContent] = useState([])
  const [externalResource, setExternalResource] = useState(false)

  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom',
      bottomOffset: 20,
    })
  }

  const handleSubmit = async () => {
    if (arrContent.length === 0) {
      showToast(
        'error',
        'Contenido Obligatorio',
        'Todos los datos son obligatorios'
      )
      return
    }

    setIsLoading(true)
    setResults([])

    try {
      const res = await topicsAPI.create(arrContent)

      // Procesar la respuesta
      if (res.status === 201) {
        const { message, results } = res.data

        // Mostrar mensaje general de éxito
        showToast('success', 'Éxito', message)
        setResults(results)
        toggleTopicModal()
        // Iterar sobre los resultados para mostrar mensajes individuales
        // results.forEach((result) => {
        //   if (result.success) {
        //     console.log(`✅ Tema registrado: ${result.data.title}`)
        //   } else {
        //     console.warn(
        //       `⚠️ No se pudo registrar el tema: ${result.data.title}. Motivo: ${result.message}`
        //     )
        //   }
        // })
      } else {
        showToast('error', 'Error', res.data.message || 'Algo salió mal.')
      }
    } catch (err) {
      // Manejo de errores
      console.error('Error en la solicitud:', err.message)
      showToast(
        'error',
        'Error en la solicitud',
        'No se pudo registrar los temas. Intente de nuevo.'
      )
    } finally {
    }
  }

  const addTopic = () => {
    if (Object.values(topic).includes('')) {
      showToast(
        'error',
        'Contenido Obligatorio',
        'Todos los datos son obligatorios'
      )
    } else {
      arrContent.push({
        ...topic,
        ClassId,
      })
      setTopic(initialState)

      showToast(
        'success',
        'Contenido Agregado',
        'Agrega más contenido a tu clase'
      )
    }
  }

  const deleteTopic = (index) => {
    const newArr = arrContent.filter((_, i) => i !== index)
    setArrContent(newArr)
    showToast(
      'success',
      'Contenido Eliminado',
      'Contenido eliminado exitosamente'
    )
  }

  const handleChange = (name, value) => {
    setTopic({
      ...topic,
      [name]: value.trim(),
    })
  }

  useEffect(() => {
    if (showTopicModal) {
      setIsMounted(true)
    } else {
      setTimeout(() => setIsMounted(false), 300)
    }
  }, [showTopicModal])

  useEffect(() => {
    if (externalResource) {
      setTopic({
        ...topic,
        external_resource: '',
      })
    } else {
      delete topic.external_resource
    }
  }, [externalResource])
  return (
    <Modal
      visible={showTopicModal}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleTopicModal}
    >
      {isMounted && (
        <View className="flex-1 bg-[#F5F9FF] pt-5">
          {/* Header */}
          <View className="flex flex-row justify-between items-center px-3">
            <View className="flex flex-row gap-2 items-center">
              <TouchableOpacity onPress={toggleTopicModal}>
                <Ionicons name="arrow-back" size={26} color="#202244" />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 21,
                  color: '#202244',
                }}
              >
                Agregar contenido
              </Text>
            </View>

            {/* Botones */}
            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-[#741D1D] flex flex-row  items-center justify-center shadow-sm "
                onPress={handleSubmit}
              >
                <Ionicons name="save" color="white" size={18} />
              </TouchableOpacity>
              <TouchableOpacity className="flex flex-row  items-center justify-center w-10 h-10 rounded-full bg-[#383838]">
                <Ionicons name="reload" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nota */}
          <View className="mt-8 f=> {}lex flex-row items-center gap-2 px-3">
            <Text
              style={{
                fontFamily: 'Jost_700Bold',
                fontSize: 14,
                color: '#741D1D',
              }}
            >
              *Nota:
            </Text>
            <Text
              style={{
                fontFamily: 'Mulish_400Regular',
                fontSize: 12,
                color: '#202244',
              }}
            >
              Se agregará a la clase Variables
            </Text>
          </View>

          {/* Body */}
          {/* Formulario */}
          <ScrollView
            className="px-3 flex-1"
            showsVerticalScrollIndicator={false}
          >
            <View className="mt-5 flex flex-col gap-5 pb-5">
              {/* Input Label */}
              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 17,
                    color: '#202244',
                  }}
                >
                  Título
                </Text>
                <TextInput
                  className="bg-white px-3 py-2 rounded-md border border-gray-200 h-[50px]"
                  onChangeText={(value) => handleChange('title', value)}
                  defaultValue={topic.title}
                />
              </View>
              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 17,
                    color: '#202244',
                  }}
                >
                  Contenido
                </Text>
                <TextInput
                  multiline={true}
                  scrollEnabled={true}
                  className="bg-white px-3 py-2 rounded-md border border-gray-200 h-[180px]"
                  placeholder="Escribe o pega tu contenido aqui..."
                  textAlignVertical="top"
                  style={{
                    fontFamily: 'Mulish_700Bold',
                    fontSize: 12,
                    color: '#B4BDC4',
                  }}
                  onChangeText={(value) => handleChange('content', value)}
                  defaultValue={topic.content}
                />
              </View>
              <View className="flex flex-col gap-2">
                <View className="flex flex-row items-center justify-between">
                  <Text
                    style={{
                      fontFamily: 'Jost_600SemiBold',
                      fontSize: 17,
                      color: '#202244',
                    }}
                  >
                    Recurso Externo
                  </Text>

                  <Switch
                    value={externalResource}
                    onValueChange={() => {
                      setExternalResource((previousState) => !previousState)
                    }}
                    trackColor={{
                      false: '#767577',
                      true: '#741D1D',
                    }}
                    thumbColor={externalResource ? '#961e1e' : '#f4f3f4'}
                  />
                </View>

                {externalResource && (
                  <TextInput
                    style={{
                      fontFamily: 'Mulish_700Bold',
                      fontSize: 13,
                      color: '#B4BDC4',
                    }}
                    className="bg-white px-3 py-2 rounded-md border border-gray-200 h-[50px]"
                    placeholder="URL del recurso externo"
                    onChangeText={(value) =>
                      handleChange('external_resource', value)
                    }
                    defaultValue={topic.external_resource}
                  />
                )}
              </View>

              {/* Button de Agregar */}
              <TouchableOpacity
                className="w-full py-4 bg-[#741D1D] rounded-3xl flex flex-row items-center justify-center"
                onPress={addTopic}
              >
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  Agregar
                </Text>
              </TouchableOpacity>
              {/* Contenido agregado */}

              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: 'Jost_600SemiBold',
                    fontSize: 17,
                    color: '#202244',
                  }}
                >
                  Contenido agregado
                </Text>

                {arrContent.length > 0 ? (
                  <View className="w-full bg-white border border-[#E8F1FF] rounded-lg">
                    {arrContent.map((content, index) => (
                      <View className="flex flex-row items-center justify-between py-3 border-b border-[#E8F1FF] px-5">
                        <View className="flex flex-row items-center gap-2">
                          <View className="w-8 h-8 rounded-full bg-[#F5F9FF] flex justify-center items-center">
                            <Text
                              style={{
                                fontFamily: 'Mulish_700Bold',
                                fontSize: 12,
                                color: '#741D1D',
                              }}
                            >
                              0{index + 1}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'Jost_600SemiBold',
                              fontSize: 14,
                              color: '#202244',
                            }}
                          >
                            {content.title}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteTopic(index)}>
                          <Ionicons name="trash" size={20} color={'#741D1D'} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View className="bg-white px-5 py-3 border border-dashed rounded-md border-[#E8F1FF] h-[150px] flex justify-center items-center">
                    <Text
                      style={{
                        fontFamily: 'Mulish_700Bold',
                        fontSize: 13,
                        color: '#B4BDC4',
                        textAlign: 'center',
                      }}
                    >
                      Aqui se mostrará el contenido agregado...
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <Toast config={toastConfig} position="bottom" />
        </View>
      )}

      <LoadingRegisterTopics
        isLoading={isLoading}
        results={results}
        toggleModalResults={toggleModalResults}
      />
    </Modal>
  )
}

export default TopicModal
