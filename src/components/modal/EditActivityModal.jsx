import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { activitiesAPI } from 'api/index.api'
import DatePicker from '@react-native-community/datetimepicker'
import { SelectStatusActivityModal } from 'components/modal/index.modals'
import { dateUtils } from '../../utils/index.utils'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../config/index.config'

const EditActivityModal = ({ visible, onClose, activity_id, onContinue }) => {
  const [activityId, setActivityId] = useState(null)
  const [currentActivity, setCurrentActivity] = useState({
    due_date: null,
    status: null,
  })
  const [showCalendar, setShowCalendar] = useState(false)
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    })
  }

  const [showSelectStatusModal, setShowSelectStatusModal] = useState(false)
  const toggleShowSelectStatusModal = () =>
    setShowSelectStatusModal((prev) => !prev)

  const handleChange = (name, value) => {
    setCurrentActivity((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDate = (e, selectedDate) => {
    const currentDate = selectedDate || currentActivity?.due_date
    toggleCalendar()
    const formatDate = dateUtils.formatDate(currentDate)
    handleChange('due_date', formatDate)
  }

  const saveEdit = () => {
    activitiesAPI
      .updateActivity(activityId, currentActivity)
      .then((res) => {
        showToast(
          'success',
          'Actividad actualizada',
          'Se ha actualizado la actividad'
        )

        onContinue()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (activityId) {
      activitiesAPI
        .getById(activityId)
        .then((res) => {
          const { activity } = res.data
          setCurrentActivity({
            due_date: activity.due_date,
            status: activity.status,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [activityId])

  useEffect(() => {
    if (visible) {
      setActivityId(activity_id)
    }
  }, [visible])
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <View className="flex-1 bg-[#F5F9FF]">
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
              Editar actividad
            </Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-[#741D1D] flex flex-row items-center justify-center"
              onPress={saveEdit}
            >
              <Ionicons name="save" color={'white'} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-col px-3 gap-3 py-5">
          {/* Fecha de Expiración */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 17,
                color: '#202244',
              }}
            >
              Disponible hasta
            </Text>
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-1 h-14 items-center justify-center bg-white border border-gray-200 rounded-lg">
                <Text>{currentActivity?.due_date}</Text>
              </View>

              <TouchableOpacity
                className="w-12 flex justify-center items-center"
                onPress={toggleCalendar}
              >
                <Octicons name="calendar" size={22} color={'#741D1D'} />
              </TouchableOpacity>
            </View>

            {showCalendar && (
              <DatePicker
                style={{ width: '100%' }}
                value={new Date(currentActivity?.due_date)}
                is24Hour={true}
                display="calendar"
                onChange={handleDate}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Jost_600SemiBold',
                fontSize: 17,
                color: '#202244',
              }}
            >
              Estado
            </Text>
            <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300 relative mb-5">
              <View className="w-14 flex flex-row items-center justify-center h-full ">
                <MaterialCommunityIcons
                  name="room-service"
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
                {currentActivity?.status || 'Selecciona el estado'}
              </Text>

              <TouchableOpacity
                className="absolute right-5"
                onPress={toggleShowSelectStatusModal}
              >
                <Octicons name="chevron-down" size={18} color={'#202244'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SelectStatusActivityModal
          visible={showSelectStatusModal}
          onClose={toggleShowSelectStatusModal}
          handleStatus={handleChange}
          valueStatus={currentActivity?.status}
        />

        <Toast config={toastConfig} position="bottom" />
      </View>
    </Modal>
  )
}

export default EditActivityModal
