import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { useLoading } from 'context/LoadingContext'
import ByeModal from './ByeModal'
import { useSelector } from 'react-redux'
import { courseStudentsAPI } from '../../api/index.api'

const LeaveCourseModal = ({
  showLeaveCourseModal,
  toggleLeaveCourseModal,
  courseId,
}) => {
  const { user } = useSelector((state) => state.user)
  const [showByeModal, setShowByeModal] = useState(false)
  const { showLoading, hideLoading } = useLoading()
  const toggleByeModal = () => {
    showLoading('Abandonando curso. Espere un momento...')
    toggleLeaveCourseModal()
    courseStudentsAPI
      .leaveCourse({ course_id: courseId, user_id: user.id })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        hideLoading()
      })
    setShowByeModal((prev) => !prev)
  }

  return (
    <Modal
      visible={showLeaveCourseModal}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleLeaveCourseModal}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-5 flex ">
        <View className="bg-white border border-gray-200  p-6 w-full flex flex-col gap-3 items-center justify-center">
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: '#202244',
              textAlign: 'center',
            }}
          >
            ¿Deseas realmente abandonar el curso?
          </Text>

          <Text
            style={{
              fontFamily: 'Mulish_700Bold',
              fontSize: 14,
              color: '#7c7c7c',
              textAlign: 'center',
            }}
          >
            No podrás acceder al contenido exclusivo del curso.
          </Text>

          <View className="flex flex-row gap-2 items-center">
            <TouchableOpacity
              className="px-4 py-2 bg-gray-200 rounded-full"
              onPress={toggleLeaveCourseModal}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 14,
                  color: '#202244',
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 bg-[#741D1D] rounded-full"
              onPress={toggleByeModal}
            >
              <Text
                style={{
                  fontFamily: 'Jost_600SemiBold',
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                Abandonar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ByeModal showByeModal={showByeModal} toggleByeModal={toggleByeModal} />
    </Modal>
  )
}

export default LeaveCourseModal
