import { Ionicons, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { topicsAPI } from 'api/index.api'
import Toast from 'react-native-toast-message'
import toastConfig from '../../config/toast/toast.config'
import { DeleteQuestionModal } from 'components/modal/index.modals'
const EditTopicModal = ({ visible, onClose, topic_id, onContinue }) => {
  const [topicId, setTopicId] = useState(null)
  const [currentTopic, setCurrentTopic] = useState(null)
  const [externalResourc, setExternalResource] = useState(false)
  const [showQuestionDelete, setShowQuestionDelete] = useState(false)
  const toggleShowQuestionDelete = () => setShowQuestionDelete((prev) => !prev)

  const existExternalResource = (external_resource) => {
    setExternalResource(external_resource !== null)
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    })
  }

  const handleChange = (name, value) => {
    setCurrentTopic((prev) => ({
      ...prev,
      [name]: value,
    }))

    console.log(currentTopic)
  }

  const afterDelete = (confirm) => {
    if (confirm) {
      showToast(
        'success',
        'Contenido eliminado',
        'Se ha eliminado el contenido con éxito'
      )
      setTimeout(() => {
        onContinue()
        onClose()
      }, 2500)
    } else {
      showToast(
        'error',
        'Error al eliminar',
        'No se eliminó el contenido. Intente de nuevo'
      )
    }
  }

  const saveEdit = () => {
    topicsAPI
      .update(topicId, currentTopic)
      .then((res) => {
        const { message } = res.data
        showToast('success', 'Contenido actualizado', message)
        onContinue()
      })
      .catch((err) => {
        showToast(
          'error',
          'Error al actualizar',
          'No se actualizó el contenido. Intente de nuevo'
        )
      })
  }

  useEffect(() => {
    if (currentTopic) {
      existExternalResource(currentTopic?.external_resource)
    }
  }, [currentTopic])

  useEffect(() => {
    if (topicId) {
      topicsAPI
        .getById(topicId)
        .then((res) => {
          const { topic } = res.data
          setCurrentTopic(topic)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [topicId])

  useEffect(() => {
    if (visible) {
      setTopicId(topic_id)
    }
  }, [visible])
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#F5F9FF]">
        {/* Header */}
        <View className="flex flex-row items-center justify-between px-3 border-b border-gray-200 py-5">
          <View className="flex flex-row gap-2 items-center">
            <TouchableOpacity onPress={onClose}>
              <Octicons name="arrow-left" size={21} color={'#202244'} />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 21,
                color: '#202244',
              }}
            >
              Editar contenido
            </Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-[#741D1D] flex flex-row items-center justify-center"
              onPress={saveEdit}
            >
              <Ionicons name="save" color={'white'} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center justify-center w-10 h-10 rounded-full bg-[#383838]"
              onPress={toggleShowQuestionDelete}
            >
              <Ionicons name="trash" size={18} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="px-3 flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          <View className="flex flex-col gap-3">
            {/* Titulo */}
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
                style={{
                  fontFamily: 'Mulish_600SemiBold',
                  fontSize: 14,
                  color: '#888',
                }}
                className="bg-white px-3 rounded-md border border-gray-200 h-[50px]"
                defaultValue={currentTopic?.title}
                onChangeText={(value) => handleChange('title', value)}
              />
            </View>

            {/* Contenido */}
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
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 14,
                  color: '#888',
                }}
                onChangeText={(value) => handleChange('content', value)}
                defaultValue={currentTopic?.content}
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
                  value={externalResourc}
                  onValueChange={() => {
                    setExternalResource((prev) => !prev)
                  }}
                  trackColor={{
                    false: '#787577',
                    true: '#741D1D',
                  }}
                  thumbColor={externalResourc ? '#961E1E' : '#F4F3F4'}
                />
              </View>

              {externalResourc && (
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
                  defaultValue={currentTopic.external_resource}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <DeleteQuestionModal
        title={'¿Realmente desea eliminar este contenido?'}
        isVisible={showQuestionDelete}
        onClose={toggleShowQuestionDelete}
        onContinue={afterDelete}
        model={'topics'}
        id={topicId}
      />
      <Toast config={toastConfig} position="bottom" />
    </Modal>
  )
}

export default EditTopicModal
