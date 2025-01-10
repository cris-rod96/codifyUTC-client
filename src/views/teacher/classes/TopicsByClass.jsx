import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  FlatList,
  Linking,
} from 'react-native'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { useLoading } from 'context/LoadingContext'
import { topicsAPI } from 'api/index.api'

const TopicsByClass = ({ class_name, id }) => {
  const { showLoading, hideLoading } = useLoading()
  const [isMounted, setIsMounted] = useState(false)
  const [topics, setTopics] = useState([])

  const renderTopic = ({ item }) => {
    const openExternalResource = () => {
      if (item.external_resource) {
        Linking.openURL(item.external_resource).catch((err) => {
          console.log('Error al abrir el enlace: ', err)
        })
      }
    }

    return (
      <View className="flex flex-col bg-white border-b border-gray-200 ">
        {/* Header */}
        <View className="w-full px-5 py-5 bg-[#741D1D] flex flex-row items-center justify-between">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
            }}
          >
            {item.title}
          </Text>

          <View className="flex flex-row gap-3">
            <TouchableOpacity>
              <Octicons name="pencil" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Octicons name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 py-3">
          <Text
            style={{
              fontFamily: 'Mulish_400Regular',
              fontSize: 14,
              color: '#505050',
              textAlign: 'justify',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
            cupiditate a saepe ratione qui, perspiciatis quidem consectetur
            cumque dolorem quas, earum provident corporis nam similique unde
            harum quasi ex? Alias. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Dolores voluptas quos officia magnam mollitia
            eligendi doloremque modi totam, iure atque, eum tenetur molestias
            adipisci cum veniam quo optio repudiandae nisi? Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Velit incidunt accusantium
            repellat quia sapiente ut autem minima dolorem error eius itaque, a
            rerum impedit ipsam aperiam vel sequi similique totam?
          </Text>

          {item.external_resource && (
            <TouchableOpacity
              className="mt-5 mb-2 w-full bg-[#F5F9FF] p-3 rounded-xl flex flex-row items-center justify-center gap-2 border border-[#741D1D]"
              onPress={openExternalResource}
            >
              <Octicons name="link-external" size={18} color="#741D1D" />
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 14,
                  color: '#741D1D',
                  textAlign: 'center',
                }}
              >
                Ver recurso
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  useEffect(() => {
    if (id == null) return
    // showLoading('Cargando contenido de la clase. Espere un momento...')
    topicsAPI
      .getByClass(id)
      .then((res) => {
        const { topics } = res.data
        setTopics(topics)
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        setIsMounted(true)
        hideLoading()
      })
  }, [id])

  return (
    <>
      <StatusBar backgroundColor={'#741D1D'} barStyle={'light-content'} />
      {isMounted &&
        (topics.length > 0 ? (
          <View className="flex flex-col">
            {/* <View className="w-full py-5 border-b border-gray-200 bg-gray-200">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Contenido
              </Text>
            </View> */}

            <FlatList
              data={topics}
              renderItem={renderTopic}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View className="flex-1 justify-center items-center px-5">
            <View className="bg-white border border-dashed border-gray-200 w-full px-3 py-5 rounded-lg flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 15,
                  color: '#202244',
                  textAlign: 'center',
                }}
              >
                Clase sin contenido
              </Text>
              <Text
                style={{
                  fontFamily: 'Mulish_400Regular',
                  fontSize: 12,
                  color: '#545454',
                  textAlign: 'center',
                }}
              >
                Agrega contenido a tus clases. Para hacerlas más interactivas
              </Text>
            </View>
          </View>
        ))}
    </>
  )
}

export default TopicsByClass
