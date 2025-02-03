import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { useLoading } from 'context/LoadingContext'
import ByeModal from './ByeModal'
import { useDispatch, useSelector } from 'react-redux'
import { courseStudentsAPI } from '../../api/index.api'
import LottieView from 'lottie-react-native'
import confused from 'assets/confused.json'
import { Octicons } from '@expo/vector-icons'
import { deleteUserCourse } from 'redux/slices/student.slice'

const LeaveCourseModal = ({
  showLeaveCourseModal,
  toggleLeaveCourseModal,
  courseId,
  onContinue,
}) => {
  const { user } = useSelector((state) => state.user)
  const [showByeModal, setShowByeModal] = useState(false)
  const toggleByeModal = () => setShowByeModal((prev) => !prev)
  const dispatch = useDispatch()

  const leaveCourse = () => {
    courseStudentsAPI
      .leaveCourse({ course_id: courseId, user_id: user.id })
      .then((res) => {
        dispatch(deleteUserCourse())
        toggleByeModal()
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <Modal
      visible={showLeaveCourseModal}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleLeaveCourseModal}
    >
      <ByeModal
        isVisible={showByeModal}
        onClose={toggleByeModal}
        toggleLeaveCourseModal={toggleLeaveCourseModal}
      />
      <View className="flex-1 justify-center items-center  px-5 flex bg-[#F5F9FF] relative">
        <TouchableOpacity
          className="absolute top-5 right-5"
          onPress={toggleLeaveCourseModal}
        >
          <Octicons name="x-circle-fill" size={25} color={'#741D1D'} />
        </TouchableOpacity>
        <LottieView
          autoPlay
          loop
          source={confused}
          style={{
            width: 250,
            height: 250,
          }}
        />
        <Text
          style={{
            fontFamily: 'Jost_700Bold',
            fontSize: 18,
            color: '#202244',
            textAlign: 'center',
          }}
        >
          ¿Realmente deseas abandonar el curso?
        </Text>
        <Text
          style={{
            fontFamily: 'Mulish_600SemiBold',
            fontSize: 16,
            color: '#545454',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          Recuerda que te perderás contenido exclusivo y actividades que te
          ayudarán a mejorar el entendimiento de la programación
        </Text>

        <TouchableOpacity
          className="mt-10 bg-[#741D1D] w-full rounded-full py-4 flex flex-row items-center justify-center relative"
          onPress={leaveCourse}
        >
          <Text
            style={{
              fontFamily: 'Jost_600SemiBold',
              fontSize: 16,
              color: 'white',
              textAlign: 'center',
            }}
          >
            Continuar
          </Text>
          <Octicons
            name="chevron-right"
            size={21}
            color={'white'}
            className="absolute right-6"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default LeaveCourseModal
