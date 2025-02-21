import { Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CustomToast from 'components/toast/Toast'
import { storageUtil } from '../../utils/index.utils'
import { adminApi } from 'api/index.api'

const RoleModal = ({ visible, onClose, userId, onRefresh }) => {
  const [toast, setToast] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState(null)

  const [valueSelected, setSelectedValue] = useState(null)

  const roles = [
    {
      value: 'Administrador',
      label: 'Administrador',
    },
    {
      value: 'Docente',
      label: 'Docente',
    },
    {
      value: 'Estudiante',
      label: 'Estudiante',
    },
  ]

  const handleClose = () => {
    onClose()
  }

  const handleSelect = (value) => {
    setSelectedValue(value)
  }

  const showToast = (typeToast, title, message) => {
    setToast(true)
    setTypeToast(typeToast)
    setTitleToast(title)
    setMessageToast(message)
  }

  const handleUpdateRole = () => {
    storageUtil
      .getSecureData('session_info')
      .then((res) => {
        const { token } = JSON.parse(res)

        adminApi
          .updateUserRole(userId, valueSelected, token)
          .then((res) => {
            showToast(
              'success',
              'Rol asignado',
              'Se asignó el rol al usuario correctamente'
            )

            setTimeout(() => {
              onRefresh()
            }, 2500)
          })
          .catch((err) => {
            console.log('AQUI: ', err)
          })
      })
      .catch((err) => {
        console.log('AQUI:', err)
      })
  }

  const renderRadioButton = ({ item }) => {
    const isSelected = item.value === valueSelected

    return (
      <Pressable
        className="flex flex-row items-center gap-3"
        onPress={() => handleSelect(item.value)}
      >
        {/* Contenedor del radio button */}
        <View
          className={`w-6 h-6 rounded-full border-2 ${
            isSelected ? 'border-[#741D1D]' : 'border-gray-400'
          } flex items-center justify-center transition-all duration-200`}
        >
          {/* Punto central si está seleccionado */}
          {isSelected && (
            <View className="w-3 h-3 rounded-full bg-[#741D1D]"></View>
          )}
        </View>

        {/* Texto de la opción */}
        <Text
          style={{
            fontFamily: 'Mulish_700Bold',
            fontSize: 15,
            color: isSelected ? '#741D1D' : '#202244',
            transition: 'color 0.2s',
          }}
        >
          {item.label}
        </Text>
      </Pressable>
    )
  }

  useEffect(() => {
    console.log('Hola:', userId)
  }, [])
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="w-full bg-white rounded-lg p-6">
          {/* Encabezado */}
          <View className="flex-row justify-between items-center mb-4">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 18,
                color: '#202244',
              }}
            >
              Seleccione el rol
            </Text>
            <Pressable onPress={handleClose}>
              <Octicons name="x" size={24} color={'#741D1D'} />
            </Pressable>
          </View>

          <View className="flex flex-col gap-2">
            <FlatList
              data={roles}
              renderItem={renderRadioButton}
              keyExtractor={(item) => item.value.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />

            <TouchableOpacity
              className="mt-2 px-4 py-3 bg-[#741D1D] rounded-lg"
              // onPress={onClose}
              onPress={handleUpdateRole}
            >
              <Text
                style={{
                  fontFamily: 'Mulish_700Bold',
                  fontSize: 15,
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {toast && (
        <CustomToast
          setToast={setToast}
          type={typeToast}
          title={titleToast}
          messageToast={messageToast}
        />
      )}
    </Modal>
  )
}

export default RoleModal
